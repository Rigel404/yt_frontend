import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { addComments, fetchAllComments } from "../api/comment.api.js";
import Navbar from "./Navbar.jsx";
import { fetchAllvideos } from "../api/video.api.js";
import { addToWatchHistory } from "../api/user.api.js";
import VideoCard from "./VideoCard.jsx";
import PropTypes from "prop-types";

// Custom hook for fetching videos
const useVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetchAllvideos();
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return videos;
};

// Custom hook for fetching and managing comments
const useComments = (videoId) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetchAllComments(videoId);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }, [videoId]);

  const postComment = useCallback(
    async (content) => {
      try {
        await addComments(videoId, content);
        await fetchComments();
      } catch (error) {
        console.error("Failed to post comment:", error);
      }
    },
    [videoId, fetchComments]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, postComment };
};

const PlayVideo = () => {
  const { id } = useParams();
  const location = useLocation();
  const video = location.state?.video;
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const [content, setContent] = useState("");

  const videos = useVideos();
  const { comments, postComment } = useComments(id);

  const formatTime = useMemo(() => {
    return (seconds) => {
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
  }, []);

  const handleProgress = useCallback((state) => {
    setPlayedSeconds(state.playedSeconds);
  }, []);

  const handleDuration = useCallback((duration) => {
    setDuration(duration);
  }, []);

  const handleSeek = useCallback((e) => {
    const newTime = parseFloat(e.target.value);
    setPlayedSeconds(newTime);
    playerRef.current.seekTo(newTime);
  }, []);

  const handleAddComment = useCallback(async () => {
    if (content.trim()) {
      await postComment(content);
      setContent("");
    }
  }, [content, postComment]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  useEffect(() => {
    console.log("Adding to watch history");
    addToWatchHistory(id);
  }, []);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-xl mt-5 border">
        <div className="row border">
          <div className="col-8 border">
            <div style={{ width: "50%", margin: "0 auto" }}>
              <ReactPlayer
                ref={playerRef}
                playing
                url={video.videoFile}
                onProgress={handleProgress}
                onDuration={handleDuration}
                progressInterval={500}
                controls={false}
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
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment} className="mt-2 btn btn-primary">
              Add Comment
            </button>
            <div>
              {comments.length > 0 ? (
                <div className="container">
                  {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                  ))}
                </div>
              ) : (
                <p>No comments available</p>
              )}
            </div>
          </div>
          <div className="col-4 border">
            {videos.map((video) => (
              <div onClick={scrollToTop} className="col" key={video._id}>
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const CommentItem = ({ comment }) => (
  <div className="row gy-3 align-items-center mb-2">
    <div className="col-auto d-flex align-items-center">
      <img
        src={comment.userDetails?.avatar}
        alt="Avatar"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      />
    </div>
    <div className="col-10 d-flex flex-column justify-content-center">
      <h6>@{comment.userDetails?.username}</h6>
      <p>{comment.content}</p>
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userDetails: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string,
    }),
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlayVideo;
