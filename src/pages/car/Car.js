import { getCar } from "@/api/repositories/car";
import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "@/common/context/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "@/common/components/Loading";
import Reservation from "@/pages/common/landing/components/Reservation";
import Contact from "@/pages/common/landing/components/Contact";

const PageContainer = styled.div`
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 75vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.div`
  max-width: 470px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  flex: 1;
  font-size: 1.5rem;
`;

const PaddingWrapper = styled.div`
  padding: 20px;
`;

const OpisHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const OpisText = styled.div`
  margin-bottom: 20px;
`;

const CarInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ListItem = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  width: calc(100% - 20px);
`;

const InfoName = styled.div`
  display: flex;
  max-width: calc(100% - 470px);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;

  white-space: nowrap;
`;

const InfoPrice = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ButtonSearch = styled.button`
  width: auto;
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  overflow: hidden;
  outline: none;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s ease 0s;
  user-select: none;
  cursor: pointer;
  min-width: 120px;
  height: 44px;
  padding: 0px 16px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  background-color: rgb(174, 0, 0);
  border: none;
  border-radius: 15px;
`;

const CustomLink = styled(Link)``;

const Car = () => {
  const [car, setCar] = useState({});
  const [reservation, setReservation] = useState();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const fetchCarMutation = useMutation({
    mutationFn: (value) => getCar(value),
    onSuccess: ({ data }) => {
      setCar(data.data);
    },
  });

  useEffect(() => {
    fetchCarMutation.mutate(id);
  }, []);

  return (
    <>
      {fetchCarMutation.isLoading && <Loading />}
      <PageContainer>
        <PaddingWrapper>
          <Wrapper>
            <Image>
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  car.attributes?.image.data.attributes?.url
                }
              />
            </Image>
            <InfoBox>
              <InfoName>
                {car.attributes?.brand +
                  " " +
                  car.attributes?.model +
                  " " +
                  car.attributes?.year}
              </InfoName>
              <InfoPrice>{car.attributes?.price} zł</InfoPrice>
              {user && (
                <ButtonSearch onClick={() => setReservation(() => id)}>
                  Zarezerwuj
                </ButtonSearch>
              )}
            </InfoBox>
          </Wrapper>
          <OpisHeader>Opis</OpisHeader>
          <OpisText>{car.attributes?.description}</OpisText>

          <CarInfoWrapper>
            <ListSection>
              <ListItem>
                <strong>Rok produkcji:</strong> {car.attributes?.year}
              </ListItem>
              <ListItem>
                <strong>Przebieg:</strong> {car.attributes?.przebieg + " km"}
              </ListItem>

              <ListItem>
                <strong>Marka:</strong> {car.attributes?.brand}
              </ListItem>
              <ListItem>
                <strong>Model:</strong> {car.attributes?.model}
              </ListItem>
            </ListSection>
            <ListSection>
              <ListItem>
                <strong>Pojemność silnika:</strong>{" "}
                {car.attributes?.engine_size + " l"}
              </ListItem>
              <ListItem>
                <strong>Rodzaj paliwa:</strong> {car.attributes?.fuel_type}
              </ListItem>
              <ListItem>
                <strong>Skrzynia biegów:</strong>{" "}
                {car.attributes?.automatic_stick_shift
                  ? "Automatyczna"
                  : "Manualna"}
              </ListItem>
              <ListItem>
                <strong>Kolor:</strong> {car.attributes?.color}
              </ListItem>
            </ListSection>
            <ListSection>
              <ListItem>
                <strong>Liczba miejsc:</strong> {car.attributes?.seats}
              </ListItem>
              <ListItem>
                <strong>Liczba drzwi:</strong> {car.attributes?.door_num}
              </ListItem>
              <ListItem>
                <strong>Pierwszy właściciel:</strong>{" "}
                {car.attributes?.first_owner ? "Tak" : "Nie"}
              </ListItem>
              <ListItem>
                <strong>Bezwypadkowy:</strong>{" "}
                {car.attributes?.bezwypadkowy ? "Tak" : "Nie"}
              </ListItem>
            </ListSection>
          </CarInfoWrapper>
        </PaddingWrapper>
      </PageContainer>
      <Contact />
      {reservation && (
        <Reservation data={reservation} setData={setReservation} />
      )}
    </>
  );
};

export default Car;
