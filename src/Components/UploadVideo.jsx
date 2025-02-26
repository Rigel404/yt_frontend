import React from "react";
import { useState } from "react";
import { uploadVideo } from "../api/video.api";
import { Link, useNavigate } from "react-router-dom";
import Spin from "./Spin";
import Navbar from "./Navbar";
export default function UploadVideo() {
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { id, files, value } = e.target;
    switch (id) {
      case "title":
        setTile(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "videoFile":
        if (files && files[0]) {
          setVideoFile(files[0]);
          console.log("Selected video file:", files[0]);
        }
        break;
      case "thumbnail":
        if (files && files[0]) {
          setThumbnail(files[0]);
          console.log("Selected thumbnail img:", files[0]);
        }
        break;
      default:
        break;
    }
  };

  const uploadvideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("inside uploadvideo");
    console.log(title, description, videoFile, thumbnail);
    try {
      const res = await uploadVideo(title, description, videoFile, thumbnail);
      console.log(res);
      console.log("video uploaded successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Spin />
      ) : (
        <div className="container mt-5  ">
          <div className="row justify-content-center  ">
            <div className="col-10 col-md-5 border border-2 p-5 customCard">
              <h3 className="text-center text-secondary mb-3">
                Upload Your New Video
              </h3>
              <form onSubmit={uploadvideo}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Video Title
                  </label>
                  <span style={{ color: "red" }}> *</span>
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleOnChange}
                    id="title"
                  />
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Video Description
                  </label>
                  <span style={{ color: "red" }}> *</span>
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleOnChange}
                    id="description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="videoFile" className="form-label">
                    Choose Video
                  </label>
                  <span style={{ color: "red" }}> *</span>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleOnChange}
                    id="videoFile"
                    accept="video/*"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="thumbnail" className="form-label">
                    Thumbnail Image
                  </label>
                  <span style={{ color: "red" }}> *</span>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleOnChange}
                    id="thumbnail"
                    accept="image/*"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload Video
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
