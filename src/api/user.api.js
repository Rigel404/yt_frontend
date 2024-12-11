import axios from "axios";

import { BASE_URL } from "../constants/api.constants";

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
    // console.log("User registered successfully:", res.data);
    // console.log("User registered tokens:", res.data.data);
    // return {
    //   accessToken: res.data.data.accessToken,
    //   refreshToken: res.data.data.refreshToken,
    // };

  } catch (err) {
    console.error("Error during signup:", err);
    throw err
  }
};

export const login = async (email, password) => {
  try {
    console.log('in api call', email, password);

    // Create the request payload as a JSON object
    const payload = {
      email: email,
      password: password,
    };

    // Send the JSON data using Axios
    const res = await axios.post(
      `${BASE_URL}/users/login`, // Adjust the URL if necessary (e.g., to /login)
      payload,
      {
        headers: {
          "Content-Type": "application/json", // Indicate the request body is JSON
        },
        withCredentials: true,  // Send cookies with the request
      }
    );

    // Handle the response (optional)
    console.log(res.data);

  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};


export const authenticateUser = async () => {
  try {
    console.log('in api call authenticate User');

    // Send the form data using Axios
    const res = await axios.get(
      `${BASE_URL}/users/get-user`, // Replace with the appropriate endpoint for checking login status
      {
        withCredentials: true,  // Ensures cookies are sent with the request
      }
    );

    return res.status == 200

  } catch (err) {
    console.error("Error during authentication:", err);
    throw err
  }
};