import { createComment } from "@/api/repositories/comment";
import { COLORS, COLOR_PALETTES } from "@/common/colors/colors";
import Loading from "@/common/components/Loading";
import PopUp from "@/common/components/PopUp";
import TextArea from "@/common/components/TextArea";
import Button from "@/common/components/buttons/Button";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";
import { UserContext } from "@/common/context/userContext";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useRef } from "react";

const AddComment = ({ setClose, blogId }) => {
  const { user } = useContext(UserContext);
  const commentRef = useRef();

  const { handleAddMessage } = useContext(MessageContext);

  const handleAddCommentMutation = useMutation({
    mutationFn: (data) => createComment(data),
    onSuccess: () => {
      setClose(() => null);
      handleAddMessage("Dodano komentarz", MESSAGE_TYPES.CORRECT);
    },
  });

  const handleAddComment = (e) => {
    e?.preventDefault();

    const payload = {};
    payload.description = commentRef.current.value;
    payload.user = user.id;
    payload.blog = blogId;

    handleAddCommentMutation.mutate(payload);
  };

  return (
    <>
      {handleAddCommentMutation.isLoading && <Loading />}
      <PopUp setShow={setClose}>
        <form
          onSubmit={handleAddComment}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <h3>Dodaj komentarz</h3>
          <TextArea
            required
            textareaRef={commentRef}
            placeholder={"Napisz komentarz.."}
            inputColor={COLOR_PALETTES.palette1.description}
            width={"350px"}
          />
          <Button
            type={"submit"}
            text={"Dodaj komentarz"}
            style={{ width: "300px", marginBottom: "-40px" }}
          />
        </form>
      </PopUp>
    </>
  );
};

export default AddComment;
