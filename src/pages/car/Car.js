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
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 150px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const CarInfoWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
      <CarInfoWrapper>
        <div>Cena: {car.attributes?.Price} zł</div>
        <div>Kolor: {car.attributes?.color}</div>
        <div>Opis: {car.attributes?.description}</div>
        <div>Marka: {car.attributes?.marka}</div>
      </CarInfoWrapper>
    </PageContainer>
  );
};

export default Car;
