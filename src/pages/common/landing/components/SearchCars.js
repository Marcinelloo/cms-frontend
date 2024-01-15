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

const PriceRangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 260px;
  color: white;
`;

const SearchCars = () => {
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const [data, setData] = useState([]);
  const [reservation, setReservation] = useState();

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

  // const searchCarsMutation = useMutation({
  //   mutationFn: () => findAllCars(),
  //   onSuccess: ({ data }) => {
  //     console.log("CARS", data);
  //     const dataArray = data.data;
  //     const uniqueBrands = Array.from(new Set(dataArray.map(car => car.attributes.brand)));
  //     const uniqueYears = Array.from(new Set(dataArray.map(car => car.attributes.year)));
  //     const uniqueFuelTypes = Array.from(new Set(dataArray.map(car => car.attributes.fuel_type)));

  //     setBrandOptions(uniqueBrands.map(brand => ({ label: brand, value: brand })));
  //     setYearOptions(uniqueYears.map(year => ({ label: year, value: year })));
  //     setFuelOptions(uniqueFuelTypes.map(fuelT => ({ label: fuelT, value: fuelT })));

  //     setData(dataArray);
  //   }
  // });

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
      {reservation && (
        <Reservation data={reservation} setData={setReservation} />
      )}
    </>
  );
};

export default SearchCars;
