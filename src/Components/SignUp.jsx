import React, { useState, useEffect } from "react";
import { signUp } from "../api/user.api.js";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { id, files, value } = e.target;

    switch (id) {
      case "name":
        setName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "avatar":
        if (files && files[0]) {
          setAvatar(files[0]);
          console.log("Selected Profile Picture:", files[0]);
        }
        break;
      case "coverImage":
        if (files && files[0]) {
          setCoverImage(files[0]);
          console.log(files, 'files');
          console.log("Selected Background Image:", files[0]);
        }
        break;
      default:
        break;
    }
  };




  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(avatar, coverImage, name, password,);
    console.log('Signing up');
    signUp(name, userName, email, password, avatar, coverImage);
    navigate('/home')
  };

  return (
    <>

      <div className="container mt-5  ">
        <div className="row justify-content-center  ">
          <div className="col-10 col-md-5 border border-2 p-5 customCard">
            <h3 className="text-center text-secondary">Sign Up</h3>
            <form onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <span style={{ color: 'red' }}> *</span>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleOnChange}
                  id="name"
                />
              </div> <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <span style={{ color: 'red' }}> *</span>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleOnChange}
                  id="userName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <span style={{ color: 'red' }}> *</span>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleOnChange}
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <span style={{ color: 'red' }}> *</span>
                <input
                  type="password"
                  onChange={handleOnChange}
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Profile Picture
                </label>
                <span style={{ color: 'red' }}> *</span>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChange}
                  id="avatar"
                  accept="image/*"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="coverImage" className="form-label">
                  Background Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChange}
                  id="coverImage"
                  accept="image/*"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <p className="mt-5">Already Have an account <Link to={`/`} className=" ms-2 btn btn-primary">Login</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
