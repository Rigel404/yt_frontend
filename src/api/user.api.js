

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

    // Send the form data
    console.log('url:::', formData);
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      body: formData,
    });

    // Handle the response
    if (res.ok) {
      console.log("User registered successfully:", await res.json());
    } else {
      const error = {
        status: res.status,
        message: await res.json(),
      };
      console.error("Registration failed:", error);
      throw error;
    }
  } catch (err) {
    console.error("Error during sign-up:", err);
    throw err;
  }
};
