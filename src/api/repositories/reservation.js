import API from "../api";
const GROUP_DEFAULT_URL = "reservations";

export const createReservation = async (values) => {
  return await API.post(`${GROUP_DEFAULT_URL}`, {
    data: {
      ...values,
    },
  });
};

export const findUserReservations = async (values) => {
  return await API.get(
    `${GROUP_DEFAULT_URL}?filters[user][id][$eq]=${values}&populate=car`
  );
};
