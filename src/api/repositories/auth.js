import API from "../api";
import store from "../store";
const queryString = require("query-string");
const GROUP_DEFAULT_URL = "user";

export const login = async (payload) => {
  return await API.post(`${GROUP_DEFAULT_URL}/login`, payload);
};

export const refreshAccessToken = async () => {
  const refreshToken = store.getRefreshToken();

  return await API.post(`/refresh`, {
    refreshToken,
  });
};
