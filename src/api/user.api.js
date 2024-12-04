import axios from "axios";

import { BASE_URL } from "../constants/api.constants";
import { useSetCookie } from "../utils/cookie.utils";
export const signUp = async (name, username, email, password, avatar, coverImage) => {
  try {
    console.log('in api call', name, username, email, password);

    // Create a FormData object
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar); // Append file
    if (coverImage) formData.append("coverImage", coverImage); // Append file

    // Send the form data using Axios
    const res = await axios.post(
      `${BASE_URL}/users/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Indicate the request body is form-data
        },
        withCredentials: true,  // Send cookies with the request
      }
    );

    // Handle the response
    console.log("User registered successfully:", res.data);
    console.log("User registered tokens:", res.data.data);
    return {
      accessToken: res.data.data.accessToken,
      refreshToken: res.data.data.refreshToken,
    };

  } catch (err) {
    console.error("Error during signup:", err);
    throw err
  }
};
