import { findUserAllCarsPopulated } from "@/api/repositories/myCar";
import LoadingContainer from "@/common/components/LoadingContainer";
import PopUp from "@/common/components/PopUp";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/common/context/userContext";
import { useNavigate } from "react-router-dom";
import Reservation from "../../common/landing/components/Reservation";
import styled from "styled-components";
import UserCardEdit from "./components/UserCardEdit";
import { AddToMyCars, RemoveFromMyCars } from "./components/Actions";

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

const ButtonWrapper = styled.div`
  display: flex;
  min-width: 800px;
  align-items: center;
  gap: 20px;
  justify-content: right;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 600px;
`;

const ClearFilter = styled.div`
  margin: 0px;
  transition: color 0.3s ease 0s;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  color: rgb(255, 255, 255);
  font-family: Montserrat, "DejaVu Sans", Verdana, sans-serif;
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;
`;

const CarResultWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin: 40px;

  transition: color 0.3s ease 0s;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0px;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.2rem;
`;

const CarsWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px;
  background-color: #f6f6f6;
`;

const CarElement = styled.div`
  width: 300px;
  border: 1px dashed lightgray;
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
  position: relative;
  gap: 5px;
`;

const UserCars = () => {
  const [userCars, setUserCars] = useState([]);
  const [car, setCar] = useState();

  const navigate = useNavigate();
  const [reservation, setReservation] = useState();


  const fetchUserCarsMutation = useMutation({
    mutationFn: () => findUserAllCarsPopulated(),
    onSuccess: ({ data }) => {
      setUserCars([...data.data]);
      console.log({ data })
    },
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!fetchUserCarsMutation.isError) {
      fetchUserCarsMutation.mutate();
    }
  }, []);

  return (
    <>
      <CarResultWrapper>
        Znaleziono {userCars.length} samochodów użytkownika
      </CarResultWrapper>
      <CarsWrapper>
        {userCars.length > 0 ? (
          userCars.map(({ attributes: { car }, id }) => (
            <CarElement>
              <ImageWrapper>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    car.data.attributes.image.data.attributes.url
                  }
                  alt={car.data.attributes.image.data.attributes.alternativeText}
                />
              </ImageWrapper>
              <CarInfoWrapper>
                <RemoveFromMyCars id={id} onRemoved={fetchUserCarsMutation.mutate} />
                <div>Cena: {car.data.attributes.price} zł</div>
                <div>Kolor: {car.data.attributes.color}</div>
                <div>Opis: {car.data.attributes.description}</div>
                <div>Marka: {car.data.attributes.brand}</div>
                <div>Model: {car.data.attributes.model}</div>
              </CarInfoWrapper>
              <ButtonWrapper
                style={{
                  minWidth: "60px",
                  margin: "10px",
                  justifyContent: "center",
                }}
              >
                <ButtonSearch onClick={() => navigate(`/car-info/${car.data.id}`)}>
                  Zobacz oferte
                </ButtonSearch>
                {user && (
                  <ButtonSearch onClick={() => setReservation(() => car.data.id)}>
                    Zarezerwuj
                  </ButtonSearch>
                )}
              </ButtonWrapper>
            </CarElement>
          ))
        ) : fetchUserCarsMutation.isLoading ? (
          <LoadingContainer />
        ) : (
          ""
        )}
      </CarsWrapper>
      {car && <UserCardEdit car={car} setCar={setCar} />}
      {reservation && (
        <Reservation data={reservation} setData={setReservation} />
      )}
    </>
  );
};

export default UserCars;
