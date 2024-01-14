import API from "../api";

const GROUP_DEFAULT_URL = "articles";

/**
 * 
 * @param {number} pageNumber 
 */
export function getArticles(pageNumber) {
    return API.get(`${GROUP_DEFAULT_URL}?sort=publishedAt:desc&pagination[page]=${pageNumber}&populate=Main_Image`);
}

/**
 * 
 * @param {number} id 
 */
export function getArticleById(id) {
    return API.get(`${GROUP_DEFAULT_URL}/${id}?populate=Main_Image`);
}