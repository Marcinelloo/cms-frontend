import { getArticleById } from "@/api/repositories/article";
import LoadingContainer from "@/common/components/LoadingContainer";
import Button from "@/common/components/buttons/Button";
import { UserContext } from "@/common/context/userContext";
import { getIdFromUrl } from "@/common/functions/articleLink";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AddComment from "./components/AddComment";
import moment from "moment";
import { deleteComment } from "@/api/repositories/comment";
import Loading from "@/common/components/Loading";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";

const baseUrl = process.env.REACT_APP_IMAGE_URL;

const BlogArticleContainer = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: none;
    margin-right: none;
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const CommentUserInfo = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentUsername = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const CommentCreatedAt = styled.span`
  color: #888;
`;

const CommentDescription = styled.div`
  line-height: 1.4;
`;

function BlogArticle() {
  const { articleLink } = useParams();
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState([]);

  const { handleAddMessage } = useContext(MessageContext);

  const { isLoading, mutate } = useMutation({
    mutationFn: getArticleById,
    onSuccess: (data) => {
      setData(data.data.data);
      setComments(data?.data?.data?.attributes?.comments?.data);
      document.title = data.data.data.attributes.Title;
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (value) => deleteComment(value),
    onSuccess: (data) => {
      mutate(getIdFromUrl(articleLink));
      handleAddMessage("Usunieto!", MESSAGE_TYPES.CORRECT);
    },
    onError: () => {
      handleAddMessage("Sth went wrong", MESSAGE_TYPES.WRONG);
    },
  });

  const handleDelete = (id) => {
    const paylod = {};
    paylod.id = id;

    deleteCommentMutation.mutate(paylod);
  };

  useEffect(() => {
    if (!addComment) {
      mutate(getIdFromUrl(articleLink));
    }
  }, [articleLink, mutate, addComment]);

  if (isLoading || data === null) {
    return <LoadingContainer />;
  }

  return (
    <>
      {deleteCommentMutation.isLoading && <Loading />}
      <BlogArticleContainer>
        <article>
          <span>{new Date(data.attributes.publishedAt).toLocaleString()}</span>
          <h1
            style={{
              fontSize: "2.5em",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {data.attributes.Title}
          </h1>
          <img
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
            src={`${baseUrl}${data.attributes.Main_Image.data.attributes.url}`}
            alt={data.attributes.Main_Image.data.attributes.alternativeText}
          />
          <div
            style={{ marginTop: "20px", marginBottom: "20px" }}
            className="normal-imgs"
          >
            <Markdown>{data.attributes.Content}</Markdown>
          </div>
        </article>
        {user && (
          <Button
            type="add"
            text={"Dodaj komentarz"}
            style={{ width: "200px" }}
            handler={() => setAddComment(true)}
          />
        )}
        {comments?.map((comment) => (
          <CommentContainer key={comment.id}>
            <CommentUserInfo>
              <CommentUsername>
                Autor: {comment.attributes.user.data.attributes.username}
              </CommentUsername>
              <CommentCreatedAt>
                {moment(comment.attributes.createdAt).format(
                  "DD/MM/YYYY HH:mm"
                )}
                {user?.id === comment.attributes.user.data.id && (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </span>
                )}
              </CommentCreatedAt>
            </CommentUserInfo>
            <CommentDescription>
              Komentarz: {comment.attributes.description}
            </CommentDescription>
          </CommentContainer>
        ))}
      </BlogArticleContainer>
      {addComment && <AddComment setClose={setAddComment} blogId={data.id} />}
    </>
  );
}

export default BlogArticle;
