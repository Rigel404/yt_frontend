import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { fetchAllvideos } from "../api/video.api";

export default function ShowAllVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const dispVideos = async () => {
      try {
        const res = await fetchAllvideos();
        setVideos(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    dispVideos();
  }, []);

  return (
    <>
      <div className="container border">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {videos.map((video) => (
            <div className="col" key={video._id}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
