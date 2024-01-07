import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "cars";

export const findAllCars = async () => {
  return await API.get(`${GROUP_DEFAULT_URL}?populate=image`);
};
