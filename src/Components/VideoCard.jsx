import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export default function VideoCard({ video }) {

  const [user, setUser] = useState(video.userDetails)
  const duration = video.duration
  const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
  const seconds = String(duration % 60).padStart(2, '0');

  const time = `${hours}:${minutes}:${seconds}`;
  console.log(time); // Output: "02:17:54"
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="video-wrapper" style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
            <ReactPlayer
              className="react-player"
              url={video.videoFile}
              light={<img style={{ width: '100%', height: "240px" }} src={video.thumbnail} alt='Thumbnail' />}
              controls
              width="100%"
              height="100%" // Ensures it takes up the wrapper's height
            />
          </div>
          <div className='mt-1'>
            <img src={user.avatar} style={{ height: "40px", width: "40px", borderRadius: "50%" }} alt="" />
            <span className='ms-2'>{video.description}</span>
          </div>
          <p className="text-start">{user.username}</p>
          <p className="text-start">{video.views} Views</p>
        </div>
      </div>
    </>
  );
}
