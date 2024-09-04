import React from "react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateForward,
} from "@fortawesome/free-solid-svg-icons";

function Timer({ duration = 25 }) {
  // duration in minutes
  const converted = duration * 60;
  const [time, setTime] = useState(converted);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  function startTimer() {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
            return duration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }
  function resetTimer() {
    clearInterval(intervalRef.current!);
    setTime(converted);
    setIsActive(false);
  }
  function pausePlayTimer() {
    if (isActive) {
      clearInterval(intervalRef.current!);
      setIsActive(false);
    } else {
      startTimer();
    }
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div>
      <h1>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
      </h1>
      <div className="timerButtons">
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRotateForward} />
        </button>
        <button onClick={pausePlayTimer}>
          {isActive ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
      </div>
    </div>
  );
}
export default Timer;
