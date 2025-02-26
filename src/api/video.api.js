import axios from "axios";

import { BASE_URL } from "../constants/api.constants";

export const fetchAllvideos = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/videos/get-all-videos`, // Replace with the appropriate endpoint for checking login status
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const uploadVideo = async (title, description, videoFile, thumbnail) => {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (videoFile) formData.append("videoFile", videoFile); // Append file
    if (thumbnail) formData.append("thumbnail", thumbnail); // Append file

    // Send the form data using Axios
    const res = await axios.post(`${BASE_URL}/videos/upload-video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Indicate the request body is form-data
      },
      withCredentials: true, // Send cookies with the request
    });
    return res;
  } catch (err) {
    console.error("Error during signup:", err);
    throw err;
  }
};
