import axios from "axios";

import { BASE_URL } from "../constants/api.constants";

export const fetchAllComments = async (videoId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/comments/get-comments/${videoId}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const addComments = async (videoId, content) => {
  try {
    console.log("sending content", content);
    const res = await axios.post(
      `${BASE_URL}/comments/add-comment/${videoId}`,
      { content },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
