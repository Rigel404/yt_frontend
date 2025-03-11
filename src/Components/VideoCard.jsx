import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const [user, setUser] = useState(video.userDetails || video.owner);
  const duration = video.duration;
  const hours = String(Math.floor(duration / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, "0");
  const seconds = String(duration % 60).padStart(2, "0");
  const navigate = useNavigate();
  const time = `${hours}:${minutes}:${seconds}`;
  const playVideo = () => {
    console.log(video._id);
    navigate(`/watch/${video._id}`, { state: { video } });
  };
  // console.log(time); // Output: "02:17:54"
  useEffect(() => {
    console.log("first render");
  }, []);

  return (
    <>
      <div className="card" onClick={playVideo}>
        <div className="card-body">
          <div
            className="video-wrapper"
            style={{ width: "100%", height: "240px", overflow: "hidden" }}
          >
            <img
              style={{ width: "100%", height: "240px" }}
              src={video.thumbnail}
              alt="Thumbnail"
            />
          </div>
          <div className="mt-1">
            <img
              src={user.avatar}
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
              alt=""
            />
            <span className="ms-2">{video.description}</span>
          </div>
          <p className="text-start">{user.username}</p>
          <p className="text-start">{video.views} Views</p>
        </div>
      </div>
    </>
  );
}
