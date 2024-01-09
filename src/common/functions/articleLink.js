/**
 * 
 * @param {string} title 
 * @param {number} id 
 */
export function createLinkForArticle(title, id) {
    const titleSplitted = title.split(' ');
    return `${titleSplitted.slice(0, 5).join('-')}-${id}`;
}

/**
 * 
 * @param {string} url 
 */
export function getIdFromUrl(url) {
    const urlSplitted = url.split('-');
    return Number.parseInt(urlSplitted[urlSplitted.length - 1]);
}