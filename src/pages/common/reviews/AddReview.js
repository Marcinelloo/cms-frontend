import { createReview } from "@/api/repositories/review";
import store from "@/api/store";
import { useContext, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";

const PageContainer = styled.div`
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 75vh;
`;

const Heading = styled.h2`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
`;

const AddReview = () => {
  const navigate = useNavigate();
  const { handleMessage } = useContext(MessageContext);
  const user = store.getUser();
  const ratingRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleAddReviewMutation = useMutation({
    mutationFn: (value) => createReview(value),
    onSuccess: () => {
      handleMessage("Dodano opinię!", MESSAGE_TYPES.CORRECT);
      navigate("/reviews");
    },
    onError: () => {
      handleMessage("Wystąpił błąd!", MESSAGE_TYPES.ERROR);
    },
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    const payload = {};
    payload.Rating = ratingRef.current.value;
    payload.Title = titleRef.current.value;
    payload.Description = descriptionRef.current.value;

    handleAddReviewMutation.mutate(payload);
  };

  return (
    <PageContainer>
      <Heading>Dodaj opinię o naszym komisie</Heading>
      <Form onSubmit={handleAddReview}>
        <FormGroup>
          <Label>Ocena</Label>
          <Input
            ref={ratingRef}
            type="number"
            min={1}
            max={10}
            step={1}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Tytuł</Label>
          <Input type="text" ref={titleRef} required />
        </FormGroup>
        <FormGroup>
          <Label>Opis</Label>
          <Input type="text" ref={descriptionRef} />
        </FormGroup>
        <Button type="submit">Dodaj</Button>
      </Form>
    </PageContainer>
  );
};

export default AddReview;
