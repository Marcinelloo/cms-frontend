import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "cars";

export const findAllCars = async () => {
  return await API.get(`${GROUP_DEFAULT_URL}?populate=image`);
};

export const getCar = async (id) => {
  return await API.get(`${GROUP_DEFAULT_URL}/${id}?populate=image`);
};

export const findUserAllCars = async () => {
  const user = store.getUser();

  return await API.get(
    `${GROUP_DEFAULT_URL}?filters[user][id][$eq]=${user.id}&populate=image`
  );
};


export const findCarsByParameter = async ({ brand, model, fuelType, year, mileage, minPrice, maxPrice }) => {
  let queryParams = `${GROUP_DEFAULT_URL}?populate=image`;

  const filters = [];

  if (brand) {
    filters.push(`filters[brand][$eq]=${brand}`);
  }

  if (model) {
    filters.push(`filters[model][$eq]=${model}`);
  }

  if (fuelType) {
    filters.push(`filters[fuel_type][$eq]=${fuelType}`);
  }

  if (year) {
    filters.push(`filters[year][$eq]=${year}`);
  }

  if (mileage) {
    if (mileage > 300000) {
      filters.push(`filters[przebieg][$gt]=${mileage}`);
    } else {
      filters.push(`filters[przebieg][$lt]=${mileage}`);
    }
  }

  if (minPrice) {
    filters.push(`filters[price][$gt]=${minPrice}`);
  }

  if (maxPrice) {
    filters.push(`filters[price][$lt]=${maxPrice}`);
  }

  if (filters.length > 0) {
    queryParams += '&' + filters.join('&');
  }

  return await API.get(queryParams);
};


export const updateCar = async (values) => {
  return await API.put(`${GROUP_DEFAULT_URL}/${values.id}`, { data: values });
};

export const createCar = async (values) => {
  return await API.post(`${GROUP_DEFAULT_URL}/${values.id}`, { data: values });
};
