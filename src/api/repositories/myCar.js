import store from "../store";
import API from "../api";
const GROUP_DEFAULT_URL = "my-cars?&populate[car][populate][0]=image";


export const addMyCar = (carId) => {
    const user = store.getUser();
    return API.post(`${GROUP_DEFAULT_URL}`, { data: { car: carId, user: user.id, followed: Date.now() } });
}

export const findUserAllCarsPopulated = async () => {
    const user = store.getUser();

    return await API.get(
        `${GROUP_DEFAULT_URL}&filters[user][id][$eq]=${user.id}&populate=image`
    );
};

/**
 * 
 * @param {number} carId 
 */
export const getByCarId = (carId) => {
    const user = store.getUser();
    return API.get(`my-cars?filters[car][id][$eq]=${carId}&filters[user][id][$eq]=${user.id}`);
}

export const findUserAllCars = () => {
    const user = store.getUser();
    return API.get(`my-cars?populate=car&filters[user][id][$eq]=${user.id}`);
}

export const removeFromMyCar = (id) => {
    return API.delete(`my-cars/${id}`);
}
