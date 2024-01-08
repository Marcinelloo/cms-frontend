import { findAllReviews } from "@/api/repositories/review";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import store from "@/api/store";
import Button from "@/common/components/buttons/Button";
import { useNavigate } from "react-router-dom";

const ListWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ListHeaderWrapper = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ReviewsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ReviewWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const UsernameWrapper = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const RatingWrapper = styled.div`
  color: #ffd700; /* Kolor oceny - przykładowy kolor złoty dla gwiazdek */
  font-size: 25px;
  margin-bottom: 12px;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const DescriptionWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;

const Reviews = () => {
  const navigate = useNavigate();
  const user = store.getUser();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState();
  const fetchAllReviews = useMutation({
    mutationFn: () => findAllReviews(),
    onSuccess: ({ data }) => {
      console.log(data);
      setReviews(data.data);
      setUserReview(
        data.data.find((review) => review.attributes.user.data.id == user.id)
      );
    },
  });
  useEffect(() => {
    fetchAllReviews.mutate();
  }, []);
  console.log(userReview);
  console.log(user);
  return (
    <ListWrapper>
      <ListHeaderWrapper>Opinie o naszym komisie</ListHeaderWrapper>
      {userReview === undefined && user && (
        <Button
          type={"add"}
          text={"Dodaj opinię"}
          handler={() => navigate("./add-review")}
          style={{ marginBottom: "20px" }}
        />
      )}
      <ReviewsWrapper>
        {reviews.length > 0 ? (
          reviews.map(({ attributes, id }) => (
            <ReviewWrapper key={id}>
              <UsernameWrapper>
                {attributes.user.data.attributes.username}
              </UsernameWrapper>
              <RatingWrapper>{attributes.Rating}★</RatingWrapper>
              <RatingWrapper></RatingWrapper>
              <TitleWrapper>{attributes.Title}</TitleWrapper>
              <DescriptionWrapper>{attributes.Description}</DescriptionWrapper>
            </ReviewWrapper>
          ))
        ) : (
          <h4>Brak ocen naszego komisu</h4>
        )}
      </ReviewsWrapper>
    </ListWrapper>
  );
};

export default Reviews;
