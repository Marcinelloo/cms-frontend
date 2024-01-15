import axios from "axios";
import store from "./store";
import { refreshAccessToken } from "./repositories/auth";

const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  "Access-Control-Allow-Headers": "Content-Type",
  Accept: "application/json",
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = store.getToken();
  config.headers["Authorization"] =
    "Bearer " + process.env.REACT_APP_TOKEN_STRAPI;


  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    // if (error?.response?.status === 401) {
    //   store.logOut();
    //   window.location = "/login";
    // }
    //
    // if (error?.response?.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const { access_token, refresh_token } = await refreshAccessToken();
    //   store.setTokens(access_token, refresh_token);
    //
    //   API.defaults.headers["Authorization"] = "Bearer " + access_token;
    //   return API(originalRequest);
    // }

    throw new Error(error);
  }
);

export default API;
