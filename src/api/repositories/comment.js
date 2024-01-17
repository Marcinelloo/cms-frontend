import API from "../api";

const COMMENT_DEFAULT_URL = "comments";

export const createComment = async (payload) => {
  return await API.post(COMMENT_DEFAULT_URL, { data: payload });
};

export const deleteComment = async (payload) => {
  return await API.delete(`${COMMENT_DEFAULT_URL}/${payload.id}`);
};
