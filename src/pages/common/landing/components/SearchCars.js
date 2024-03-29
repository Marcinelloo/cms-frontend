import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Background from "../images/las.jpg";
import SelectInput from "@/common/components/SelectInput";
import { useMutation } from "@tanstack/react-query";
import { findAllCars, findCarsByParameter } from "@/api/repositories/car";
import { useNavigate } from "react-router-dom";
import Loading from "@/common/components/Loading";
import LoadingContainer from "@/common/components/LoadingContainer";
import { UserContext } from "@/common/context/userContext";
import Reservation from "./Reservation";
import { brandsData } from "@/pages/user/cars/data/brands";
import { number } from "prop-types";
import Input from "@/common/components/Input";
import { yearData } from "@/pages/user/cars/data/years";
import { mileageRangeData } from "@/pages/user/cars/data/mileage";
import { fuelTypeData } from "@/pages/user/cars/data/fuelType";
import { findUserAllCars } from "@/api/repositories/myCar";
import { AddToMyCars, RemoveFromMyCars } from "@/pages/user/cars/components/Actions";

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

  @media (max-width: 600px) {
    max-width: 600px;
    min-width: 300px;
  }
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
  font-weight: bold;
`;

const CarResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
  gap: 10px;
  font-weight: 400;


  transition: color 0.3s ease 0s;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0px;
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

const PriceRangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 260px;
  color: white;
`;


const PageButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  gap: 10px;
  background-color: #f6f6f6;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;


const SearchCars = () => {
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const [data, setData] = useState([]);
  const [reservation, setReservation] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPriceFrom, setSelectedPriceFrom] = useState(null);
  const [selectedPriceTo, setSelectedPriceTo] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedMileage, setSelectedMileage] = useState(null);

  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [mileageOptions, setMileageOptions] = useState([]);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [myCars, setMyCars] = useState([])

  const getMyCarsMutation = useMutation({
    mutationFn: () => findUserAllCars(),
    onSuccess: ({ data }) => {
      console.log({ data })
      setMyCars(data.data)
    }
  });

  useEffect(() => {
    getMyCarsMutation.mutate()
  }, [])

  const searchCarsMutation = useMutation({
    mutationFn: () => findAllCars(),
    onSuccess: ({ data }) => {
      setData(data.data);
    },
  });

  const searchCarsMutationByParameter = useMutation({
    mutationFn: (brand, model, fuel_type, year, mileage, minPrice, maxPrice) =>
      findCarsByParameter(
        brand,
        model,
        fuel_type,
        year,
        mileage,
        minPrice,
        maxPrice
      ),
    onSuccess: ({ data }) => {
      setData(data.data);
      setCurrentPage(1);
    },
  });

  const handleSearch = () => {
    const brand = selectedBrand ? selectedBrand.value : null;
    const model = selectedModel ? selectedModel.value : null;
    const fuelType = selectedFuelType ? selectedFuelType.value : null;
    const year = selectedYear ? selectedYear.value : null;
    const mileage = selectedMileage
      ? parseInt(selectedMileage.value, 10)
      : null;
    const minPrice =
      minPriceRef?.current?.value && parseInt(minPriceRef.current.value);
    const maxPrice =
      maxPriceRef?.current?.value && parseInt(maxPriceRef.current.value);

    if (
      selectedBrand ||
      (selectedBrand && selectedModel) ||
      selectedFuelType ||
      selectedYear ||
      mileage ||
      minPrice ||
      maxPrice
    ) {
      searchCarsMutationByParameter.mutate({
        brand,
        model,
        fuelType,
        year,
        mileage,
        minPrice,
        maxPrice,
      });
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedCars = data.slice(startIndex, endIndex);


  const handleBrandsChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setModelOptions(() => {
      return brand.models;
    });
  };

  useEffect(() => {
    searchCarsMutation.mutate();
  }, []);

  const handleDelete = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedMileage(null);
    setSelectedFuelType(null);

    minPriceRef.current.value = null;
    maxPriceRef.current.value = null;
  };

  return (
    <>
      {searchCarsMutationByParameter.isLoading && <Loading />}
      <Wrapper>
        <SelectWrapper>
          <SelectInput
            placeholder="marka"
            options={brandsData}
            selected={selectedBrand}
            setSelected={handleBrandsChange}
          />
          <SelectInput
            placeholder="model"
            options={modelOptions}
            selected={selectedModel}
            setSelected={setSelectedModel}
          />
          <SelectInput
            placeholder="rok produkcji"
            options={yearData}
            selected={selectedYear}
            setSelected={setSelectedYear}
          />
          <PriceRangeWrapper>
            <div>
              <Input
                type="number"
                labelStyle={{ display: "none" }}
                placeholder="cena min"
                width="100px"
                inputRef={minPriceRef}
              />
            </div>
            <div>
              <Input
                type="number"
                labelStyle={{ display: "none" }}
                placeholder="cena max"
                width="100px"
                inputRef={maxPriceRef}
              />
            </div>
          </PriceRangeWrapper>
          <SelectInput
            placeholder="przebieg"
            options={mileageRangeData}
            selected={selectedMileage}
            setSelected={setSelectedMileage}
          />
          <SelectInput
            placeholder="rodzaj paliwa"
            options={fuelTypeData}
            selected={selectedFuelType}
            setSelected={setSelectedFuelType}
          />
        </SelectWrapper>
        <ButtonWrapper>
          <ClearFilter onClick={() => handleDelete()}>
            X wyczyść filtry
          </ClearFilter>
          <ButtonSearch onClick={handleSearch}>wyszukaj</ButtonSearch>
        </ButtonWrapper>
      </Wrapper>
      <CarResultWrapper>
        Liczba wyników: <b>{data.length}</b>
      </CarResultWrapper>
      <CarsWrapper>
        {displayedCars.length > 0 ? (
          displayedCars.map(({ attributes, id }) => (
            <CarElement key={id}>
              <ImageWrapper>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    attributes.image.data.attributes.url
                  }
                />
              </ImageWrapper>
              <CarInfoWrapper>
                {user && (
                  <>
                    {myCars.find((val) => val.attributes.car.data.id === id) ? (
                      <RemoveFromMyCars
                        id={myCars.find((val) => val.attributes.car.data.id === id).id}
                        onRemoved={() => getMyCarsMutation.mutate()}
                      />
                    ) : (
                      <AddToMyCars
                        carId={id}
                        onAdded={() => getMyCarsMutation.mutate()}
                      />
                    )}
                  </>
                )}
                <div>Cena: {attributes.price} zł</div>
                <div>Kolor: {attributes.color}</div>
                <div>Opis: {attributes.description}</div>
                <div>Marka: {attributes.brand}</div>
                <div>Model: {attributes.model}</div>
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
                {user && (
                  <ButtonSearch onClick={() => setReservation(() => id)}>
                    Zarezerwuj
                  </ButtonSearch>
                )}
              </ButtonWrapper>
            </CarElement>
          ))
        ) : searchCarsMutation.isLoading ? (
          <LoadingContainer />
        ) : (
          "Niestety nie znalezlismy zadnych samochodow"
        )}
      </CarsWrapper>
      <PageButtonsWrapper>
        {Array.from({ length: Math.ceil(data.length / resultsPerPage) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
      </PageButtonsWrapper>
      {reservation && (
        <Reservation data={reservation} setData={setReservation} />
      )}
    </>
  );
};

export default SearchCars;
