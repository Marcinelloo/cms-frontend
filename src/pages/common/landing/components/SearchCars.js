import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "../images/las.jpg";
import SelectInput from "@/common/components/SelectInput";
import { useMutation } from "@tanstack/react-query";
import { findAllCars } from "@/api/repositories/car";
import { useNavigate } from "react-router-dom";
import Loading from "@/common/components/Loading";
import LoadingContainer from "@/common/components/LoadingContainer";

const Wrapper = styled.div`
  height: 450px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: url(${Background}) center no-repeat;
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
  font-family: Montserrat, "DejaVu Sans", Verdana, sans‑serif;
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
  gap: 5px;
`;

const SearchCars = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const searchCarsMutation = useMutation({
    mutationFn: () => findAllCars(),
    onSuccess: ({ data }) => {
      setData(data.data);
    },
  });

  useEffect(() => {
    searchCarsMutation.mutate();
  }, []);

  const handleDelete = () => {};

  return (
    <>
      <Wrapper>
        <SelectWrapper>
          <SelectInput placeholder="marka" />
          <SelectInput placeholder="model" />
          <SelectInput placeholder="rok produkcji" />
          <SelectInput placeholder="cena" />
          <SelectInput placeholder="typ nadwozia" />
          <SelectInput placeholder="paliwo" />
          <SelectInput placeholder="rodzaj paliwa" />
        </SelectWrapper>
        <ButtonWrapper>
          <ClearFilter onClick={() => handleDelete()}>
            X wyczyść filtry
          </ClearFilter>
          <ButtonSearch>wyszukaj</ButtonSearch>
        </ButtonWrapper>
      </Wrapper>
      <CarResultWrapper>znaleźliśmy {data.length} samochodów</CarResultWrapper>
      <CarsWrapper>
        {data.length > 0 ? (
          data.map(({ attributes, id }) => (
            <CarElement>
              <ImageWrapper>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    attributes.image.data.attributes.url
                  }
                />
              </ImageWrapper>
              <CarInfoWrapper>
                <div>Cena: {attributes.Price} zł</div>
                <div>Kolor: {attributes.color}</div>
                <div>Opis: {attributes.description}</div>
                <div>Marka: {attributes.marka}</div>
                <div>Model: {attributes.Price}</div>
              </CarInfoWrapper>
              <ButtonWrapper
                style={{
                  minWidth: "60px",
                  margin: "10px",
                  justifyContent: "center",
                }}
              >
                <ButtonSearch onClick={() => navigate(`/car-info/${id}`)}>
                  Zobacz oferte
                </ButtonSearch>
              </ButtonWrapper>
            </CarElement>
          ))
        ) : searchCarsMutation.isLoading ? (
          <LoadingContainer />
        ) : (
          "Niestety nie znalezlismy zadnych samochodow"
        )}
      </CarsWrapper>
    </>
  );
};

export default SearchCars;
