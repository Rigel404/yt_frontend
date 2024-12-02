import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleLogIn = async (e) => {

  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="row justify-content-center ">
          <div className="col-10 col-md-5 border customCard border-2 p-5">
            <h3 className="text-center text-secondary">Log In</h3>
            <form onSubmit={handleLogIn}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleOnChange}
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleOnChange}
                  className="form-control"
                  id="password"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p className="mt-5">
              Don't have an Account
              <Link to={`/signup`} className=" ms-2 btn btn-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
