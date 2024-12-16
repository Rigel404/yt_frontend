import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../api/user.api.js"
import Spin from "./Spin.jsx";
import ShowAllVideos from "./ShowAllVideos.jsx";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const userLoggedIn = async () => {
      try {
        const res = await authenticateUser();
        setLoading(false);
      } catch (error) {

        setLoading(true)
        navigate('/login')
      }
    }

    userLoggedIn();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Spin />
        </>
      ) : (
        <>
            <Navbar />
            <h3>Welcome To Home</h3>
            <ShowAllVideos />
          </>
      )}
    </>
  );
}
