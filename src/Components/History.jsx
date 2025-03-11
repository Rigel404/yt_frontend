import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spin from "./Spin";
import { watchHistory } from "../api/user.api";
import VideoCard from "./VideoCard";
export default function History() {
  const [loading, setLoading] = useState(true);
  const [historVideos, setHistorVideos] = useState([]);

  const getWatchHistory = async () => {
    try {
      const res = await watchHistory();
      setHistorVideos(res.data);
      console.log(res);
    } catch (error) {
      console.error("Failed to fetch watch History:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWatchHistory();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spin />
      ) : (
        <>
          <div>
            {historVideos?.length > 0 ? (
              <div className="container border">
                <h3 className="text-center mt-3">Watch History</h3>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                  {historVideos.map((video) => (
                    <div className="col" key={video._id}>
                      <VideoCard video={video} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1 className="text-center mt-5">No videos to show</h1>
            )}
          </div>
        </>
      )}
    </>
  );
}
