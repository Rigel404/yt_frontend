import axios from "axios";

import { BASE_URL } from "../constants/api.constants";

export const signUp = async (
  name,
  username,
  email,
  password,
  avatar,
  coverImage
) => {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar); // Append file
    if (coverImage) formData.append("coverImage", coverImage); // Append file

    // Send the form data using Axios
    const res = await axios.post(`${BASE_URL}/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Indicate the request body is form-data
      },
      withCredentials: true, // Send cookies with the request
    });
  } catch (err) {
    console.error("Error during signup:", err);
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    // Create the request payload as a JSON object
    const payload = {
      email: email,
      password: password,
    };

    // Send the JSON data using Axios
    const res = await axios.post(`${BASE_URL}/users/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Send cookies with the request
    });

    // Handle the response (optional)
    console.log(res.data);
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};

export const authenticateUser = async () => {
  try {
    // Send the form data using Axios
    const res = await axios.get(
      `${BASE_URL}/users/get-user`, // Replace with the appropriate endpoint for checking login status
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    return res.status == 200;
  } catch (err) {
    console.error("Error during authentication:", err);
    throw err;
  }
};

export const watchHistory = async () => {
  try {
    // Send the form data using Axios
    const res = await axios.get(
      `${BASE_URL}/users/history`, // Replace with the appropriate endpoint for fetching watch history
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.error("Error during fetching watch history:", err);
    throw err;
  }
};

export const addToWatchHistory = async (videoId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/users/history/${videoId}`,
      { videoId },
      {
        withCredentials: true,
      }
    );
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.error("Error during fetching watch history:", err);
    throw err;
  }
};
