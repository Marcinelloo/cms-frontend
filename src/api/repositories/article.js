import API from "../api";

const GROUP_DEFAULT_URL = "articles";

/**
 * 
 * @param {number} pageNumber 
 */
export function getArticles(pageNumber) {
    return API.get(`${GROUP_DEFAULT_URL}?sort=createdAt:desc&pagination[page]=${pageNumber}&populate=Main_Image`);
}