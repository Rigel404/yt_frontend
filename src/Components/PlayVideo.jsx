import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { addComments, fetchAllComments } from "../api/comment.api.js";

export default function PlayVideo() {
  const { id } = useParams();
  const location = useLocation();
  const video = location.state?.video; // Safely access video object
  const [playedSeconds, setPlayedSeconds] = useState(0); // Elapsed time in seconds
  const [duration, setDuration] = useState(0); // Total video duration in seconds
  const playerRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hrs > 0
      ? `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(
          2,
          "0"
        )}`
      : `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds); // Update elapsed time
  };

  const handleDuration = (duration) => {
    setDuration(duration); // Capture total duration
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value); // Get new time in seconds
    setPlayedSeconds(newTime);
    playerRef.current.seekTo(newTime); // Seek video to new time
  };

  const dispComments = async () => {
    try {
      const res = await fetchAllComments(id);
      setComments(res.data);

      console.log(comments.length);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispComments();
  }, []);

  if (!video) {
    return <div>Video not found</div>;
  }
  const addComment = async () => {
    console.log(content, id);
    try {
      const res = await addComments(id, content);
      await dispComments();
      setContent("");
      console.log("addComment response", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div style={{ width: "50%", margin: "0 auto" }}>
              <ReactPlayer
                ref={playerRef}
                playing
                url={video.videoFile}
                onProgress={handleProgress}
                onDuration={handleDuration}
                progressInterval={500} // Update progress every 500ms
                controls={false} // Disable default controls
                width="100%"
                height="400px"
              />
              <div style={{ marginTop: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>{formatTime(playedSeconds)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step="0.1"
                    value={playedSeconds}
                    onChange={handleSeek}
                    style={{
                      flex: 1,
                      margin: "0 10px",
                      appearance: "none",
                      background: "#ccc",
                      height: "5px",
                      borderRadius: "3px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  />
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <textarea
              className="form-control mt-3"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              name=""
              id=""
              value={content}
            >
              {content}
            </textarea>
            <button onClick={addComment} className="mt-2 btn btn-primary">
              Add Comment
            </button>
            <div>
              {comments.length > 0 ? (
                <div className="container">
                  {comments.map((comment) => (
                    <div
                      key={comment?._id}
                      className="row gy-3 align-items-center mb-2"
                    >
                      <div className="col-auto  d-flex align-items-center">
                        <img
                          src={comment?.userDetails?.avatar}
                          alt="Avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="col-10  d-flex flex-column justify-content-center">
                        <h6>@{comment?.userDetails?.username} </h6>
                        <p>{comment?.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No comments available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
