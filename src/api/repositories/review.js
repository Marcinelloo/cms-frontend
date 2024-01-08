import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "reviews?populate=user";

export const findAllReviews = async () => {
  return await API.get(`${GROUP_DEFAULT_URL}`);
};

export const createReview = async (values) => {
  const user = store.getUser();
  const data = {
    ...values,
    user: user.id,
  };
  return await API.post(`${GROUP_DEFAULT_URL}`, { data: data });
};
