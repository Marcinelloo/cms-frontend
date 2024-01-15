import { getCar } from "@/api/repositories/car";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import store from "@/api/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/common/context/userContext";

const PageContainer = styled.div`
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 75vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OpisHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OpisText = styled.div`
  margin-bottom: 20px;
`;

const CarInfoWrapper = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%; /* Each column takes 50% of the width */
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const CustomLink = styled(Link)``;

const Car = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();

  const fetchCarMutation = useMutation({
    mutationFn: (value) => getCar(value),
    onSuccess: ({ data }) => {
      setCar(data.data);
    },
  });

  useEffect(() => {
    fetchCarMutation.mutate(id);
  }, []);

  return fetchCarMutation.isLoading ? (
    0
  ) : (
    <PageContainer>
      <ImageWrapper>
        <img
          src={
            process.env.REACT_APP_IMAGE_URL +
            car.attributes?.image.data.attributes?.url
          }
        />
      </ImageWrapper>
      <OpisHeader>Opis</OpisHeader>
      <OpisText>{car.attributes?.description}</OpisText>

      <CarInfoWrapper>
        <ListSection>
          <ListItem>
            <strong>Cena:</strong> {car.attributes?.price} zł
          </ListItem>
          <ListItem>
            <strong>Kolor:</strong> {car.attributes?.color}
          </ListItem>
          <ListItem>
            <strong>Marka:</strong> {car.attributes?.brand}
          </ListItem>
          <ListItem>
            <strong>Model:</strong> {car.attributes?.model}
          </ListItem>
          <ListItem>
            <strong>Rok produkcji:</strong> {car.attributes?.year}
          </ListItem>
          <ListItem>
            <strong>Pojemność silnika:</strong>{" "}
            {car.attributes?.engine_size + "l"}
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
        </ListSection>
        <ListSection>
          <ListItem>
            <strong>Liczba miejsc:</strong> {car.attributes?.seats}
          </ListItem>
          <ListItem>
            <strong>Liczba drzwi:</strong> {car.attributes?.door_num}
          </ListItem>
          <ListItem>
            <strong>Przebieg:</strong> {car.attributes?.przebieg + "km"}
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
    </PageContainer>
  );
};

export default Car;
