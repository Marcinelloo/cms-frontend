import { getArticles } from "@/api/repositories/article";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ArticleTile from "./components/ArticleTile";
import LoadingContainer from "@/common/components/LoadingContainer";
import styled from "styled-components";
import Button from "@/common/components/buttons/Button";

const ArticlesWrapper = styled.div`
    display: flex;
    pagination: 30px;
    justify-content: space-evenly;
    margin-bottom: 20px;
`

const ShowMoreButton = styled.div`
width: 100px;
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  overflow: hidden;
  outline: none;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  height: 32px;
  padding: 0px 16px;
  color: rgb(174, 0, 0);
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  border: 1.5px solid rgb(216, 216, 216);
  border-radius: 22px;
  align-items: center;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`

function BlogMain() {
    const [pageNumber, setPageNumber] = useState(1);
    const [articles, setArticle] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const { isLoading } = useQuery({
        queryKey: ['articles', pageNumber],
        queryFn: () => getArticles(pageNumber),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: undefined,
        onSuccess: (result) => {
            console.log(result.data);
            setArticle(articles.concat(result.data.data));
            setShowMore(result.data.meta.pagination.pageCount === result.data.meta.pagination.pageSize);
        }
    });

    if (isLoading && articles.length === 0) {
        return <LoadingContainer />;
    } else if (articles.length > 0) {
        return <>
        <ArticlesWrapper>
            {articles.map(x => <ArticleTile key={x.id} article={x} />)}
        </ArticlesWrapper>
        {showMore && !isLoading && <div style={{display: "flex", justifyContent: "center"}}>
                <ShowMoreButton onClick={() => setPageNumber(pageNumber + 1)}>Więcej</ShowMoreButton>
            </div> 
        }
        </> 
    } else {
        <p>Nie ma jeszcze żadnych artykułów, zajrzyj ponownie później</p>
    }
}

export default BlogMain;