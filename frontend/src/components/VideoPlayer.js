import React, { useRef, useState } from "react";
import videoFile from "./anshuman.mp4";
import subtitles from "./srtSubtitles.srt";
import "./VideoPlayer.css";
import TimeTable from "./TimeTable";

function VideoPlayer({ stamps }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [showTimestampList, setShowTimestampList] = useState(false);

  const [currentLabel, setCurrentLabel] = useState("");
  const [hoveredPointerIndex, setHoveredPointerIndex] = useState(null);

  const timestamps = [{ time: 0, label: "Waiting For Users" }, ...stamps];

  const handleTimestampClick = (time, e) => {
    e.stopPropagation();
    videoRef.current.currentTime = time;
    videoRef.current.play();
    setCurrentTime(time);
  };

  const handleTimeUpdate = () => {
    if (!isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }

    const currentLabel = findCurrentLabel(videoRef.current.currentTime);
    setCurrentLabel(currentLabel);
  };

  const findCurrentLabel = (currentTime) => {
    for (let i = 0; i < timestamps.length - 1; i++) {
      const currentTimestamp = timestamps[i];
      const nextTimestamp = timestamps[i + 1];

      if (
        currentTime >= currentTimestamp.time &&
        currentTime < nextTimestamp.time
      ) {
        return currentTimestamp.label;
      }
    }

    return timestamps[timestamps.length - 1].label;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressPercentage = (clickX / progressBar.offsetWidth) * 100;
    const newTime = (progressPercentage / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setShowControls(true);
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setShowControls(false);
  };
  const toggleTimestampList = (e) => {
    e.stopPropagation();
    setShowTimestampList(!showTimestampList);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return (
    <div className="video-container">
      <div
        className="main-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={videoFile}
          controls={showControls}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src="./srtSubtitles.mp4"
          />
          {/* <a href="/srtSubtitles.srt">subtitles</a> */}
        </video>

        <div
          className={`progress-container ${
            showControls ? "" : "video-controls-hidden"
          }`}
          onClick={handleProgressClick}
        >
          <div className="current-label" onClick={toggleTimestampList}>
            {currentLabel}
          </div>
          <div
            className="progress-bar"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
          <div className="timestamps" onClick={toggleTimestampList}>
            {timestamps.map((timestamp, index) => (
              <div>
                <div
                  key={index}
                  className={`timestamp ${
                    hoveredPointerIndex === index ? "" : "hide"
                  }`}
                  style={{
                    left: `${(timestamp.time / duration) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                  onMouseEnter={() => setHoveredPointerIndex(index)}
                  onMouseLeave={() => setHoveredPointerIndex(null)}
                  onClick={(event) =>
                    handleTimestampClick(timestamp.time, event)
                  }
                >
                  {timestamp.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showTimestampList && (
        <div className="timestamps-container">
          <h1 className="Timestamps">Time Stamps</h1>
          <TimeTable
            timestamps={timestamps}
            handleTimestampClick={handleTimestampClick}
            formatTime={formatTime}
          />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
