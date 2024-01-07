import API from "../api";
const GROUP_DEFAULT_URL = "user";

export const registerUser = async (payload) => {
  return await API.post(`/auth/local/register`, payload);
};

export const loginUser = async (payload) => {
  return await API.post(`/auth/local`, payload);
};
