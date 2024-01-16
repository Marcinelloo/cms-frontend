import { findAllReviews, findUserReview } from "@/api/repositories/review";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import store from "@/api/store";
import Button from "@/common/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import LoadingContainer from "@/common/components/LoadingContainer";

const ListWrapper = styled.div`
  text-align: center;
  height: 100%;
`;

const ListHeaderWrapper = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ReviewsWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ReviewWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  min-width: 300px;
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
  margin-bottom: 40px;
  &:hover {
    transform: scale(1.1);
  }
`;

const Reviews = () => {
  const navigate = useNavigate();
  const user = store.getUser();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState();
  const [showMore, setShowMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const { mutate: userReviewMutate } =
    useMutation({
      mutationFn: () => findUserReview(),
      onSuccess: ({ data }) => {
        setUserReview(data.data[0]);
      },
    });

  const { isLoading, mutate } = useMutation({
    mutationFn: () => findAllReviews(pageNumber),
    onSuccess: ({ data }) => {
      setReviews(reviews.concat(data.data));
      setShowMore(data.meta.pagination.pageCount > data.meta.pagination.page);
    },
  });
  useEffect(() => {
    mutate();
  }, [mutate, pageNumber]);

  useEffect(() => {
    userReviewMutate();
  }, []);

  if (isLoading && reviews.length === 0) {
    return <LoadingContainer />;
  } else {
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
        {userReview && user && (
          <>
            <ReviewsWrapper>
              <h3 style={{ marginBottom: "20px" }}>Twoja opinia</h3>
              <ReviewWrapper>
                <UsernameWrapper>
                  👤 {userReview.attributes.user.data.attributes.username}
                </UsernameWrapper>
                <RatingWrapper>{userReview.attributes.Rating}★</RatingWrapper>
                <RatingWrapper></RatingWrapper>
                <TitleWrapper>{userReview.attributes.Title}</TitleWrapper>
                <DescriptionWrapper>
                  {userReview.attributes.Description}
                </DescriptionWrapper>
              </ReviewWrapper>
            </ReviewsWrapper>
          </>
        )}
        <ReviewsWrapper>
          {reviews.length > 0 ? (
            <div>
              {user && userReview && (
                <h3 style={{ marginBottom: "20px" }}>Opinie innych</h3>
              )}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {reviews.map(({ attributes, id }) => (
                  <ReviewWrapper key={id}>
                    <UsernameWrapper>
                      👤 {attributes.user.data.attributes.username}
                    </UsernameWrapper>
                    <RatingWrapper>{attributes.Rating}★</RatingWrapper>
                    <RatingWrapper></RatingWrapper>
                    <TitleWrapper>{attributes.Title}</TitleWrapper>
                    <DescriptionWrapper>
                      {attributes.Description}
                    </DescriptionWrapper>
                  </ReviewWrapper>
                ))}
              </div>
              {showMore && !isLoading && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ShowMoreButton onClick={() => setPageNumber(pageNumber + 1)}>
                    Więcej
                  </ShowMoreButton>
                </div>
              )}
            </div>
          ) : (
            <h4>Brak ocen naszego komisu</h4>
          )}
        </ReviewsWrapper>
      </ListWrapper>
    );
  }
};

export default Reviews;
