import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {
      if ('a' != 'a') {
        setLoggedIn(true);
        navigate('/')
      } else {
        navigate('/login')
      }
    }, 3000)

  }, [loggedIn]); // Dependency array to control when the effect runs

  return (
    <>
      {loggedIn ? (
        <>
          <Navbar />
          <h3>Welcome To Home</h3>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
