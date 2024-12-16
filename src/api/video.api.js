import axios from "axios";

import { BASE_URL } from "../constants/api.constants";

export const fetchAllvideos = async () => {

  try {
    const res = await axios.get(
      `${BASE_URL}/videos/get-all-videos`, // Replace with the appropriate endpoint for checking login status
      {
        withCredentials: true,  // Ensures cookies are sent with the request
      }
    );
    return res.data
  } catch (error) {
    throw error;
  }

}