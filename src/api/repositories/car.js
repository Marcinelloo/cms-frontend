import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "cars";

export const findAllCars = async () => {
  return await API.get(`${GROUP_DEFAULT_URL}?populate=image`);
};

export const findUserAllCars = async () => {
  const user = store.getUser();

  return await API.get(
    `${GROUP_DEFAULT_URL}?filters[user][id][$eq]=${user.id}&populate=image`
  );
};

export const updateCar = async (values) => {
  return await API.put(`${GROUP_DEFAULT_URL}/${values.id}`, { data: values });
};

export const createCar = async (values) => {
  return await API.post(`${GROUP_DEFAULT_URL}/${values.id}`, { data: values });
};
