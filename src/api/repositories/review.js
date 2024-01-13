import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "reviews?populate=user";

export const findAllReviews = async (pageNumber) => {
  const user = store.getUser();
  if (user) {
    return await API.get(
      `${GROUP_DEFAULT_URL}&filters[user][id][$ne]=${user.id}&sort=Title&pagination[page]=${pageNumber}&pagination[pageSize]=1`
    );
  } else {
    return await API.get(
      `${GROUP_DEFAULT_URL}&sort=Title&pagination[page]=${pageNumber}&pagination[pageSize]=1`
    );
  }
};

export const findUserReview = async () => {
  const user = store.getUser();
  return await API.get(
    `${GROUP_DEFAULT_URL}&filters[user][id][$eq]=${user.id}`
  );
};

export const createReview = async (values) => {
  const user = store.getUser();
  const data = {
    ...values,
    user: user.id,
  };
  return await API.post(`${GROUP_DEFAULT_URL}`, { data: data });
};
