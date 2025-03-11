import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const [, , removeCookie] = useCookies(["refresh_token", "access_token"]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    console.log("Before logout:", document.cookie);
    removeCookie("refresh_token", {
      path: "/",
      secure: true,
      sameSite: "lax",
      httpOnly: false,
    });
    removeCookie("access_token", {
      path: "/",
      secure: true,
      sameSite: "lax",
      httpOnly: false,
    });

    console.log("After logout:", document.cookie);
  };

  useEffect(() => {
    console.log("Logging out");
    handleLogOut();
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return <>i am logout</>;
}
