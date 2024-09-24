// import React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecallForm from "./RecallForm";
import {
  faPlay,
  faPause,
  faRotateForward,
  faEllipsis,
  faStop,
  faCheck,
  faCog,
  faEdit,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";

function Timer({ duration = 25, breakTime = 5, setSettings} : {duration: number, breakTime: number, setSettings: (settings: boolean) => void}) {
  /**
   * Pomodoro Timer Details
   * Functions: start, pause, reset
   * Duration is in minutes, will convert to seconds for timer
   * After duration, set break time, then after break time, set duration again
   */

  // duration in minutes
  const converted = duration * 60;
  const [time, setTime] = useState(converted);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const completedSessions = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  function startTimer() {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
            console.log("Time's up!");
            // set break time
            setTime(breakTime * 60);
            setIsBreak(!isBreak);
            if (!isBreak) {
              completedSessions.current += 1;
            }
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
  function finishSession() {
    toast("Completed session", {
      description: new Date().toLocaleTimeString(),
      duration: 50000000,
      action: { label: "Undo", onClick: () => console.log("Undo") },
    });
    setIsFinished(true);
    // call to server to save session
  }
  function cancelSession() {
    // undo the save action for the session, will be used onClick of toast undo
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="timerCont">
      <Toaster position="top-right" />
      <h1 className="header">{isBreak ? "Break Time" : "Work Time"}</h1>
      <h1>Completed Sessions:{completedSessions.current}</h1>
      <h1 className="timerClock" onClick={pausePlayTimer}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <div className="timerButtons">
        <Button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRotateForward} />
        </Button>
        <Button onClick={pausePlayTimer}>
          {isActive ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </Button>
        <Button
          // variant="outline"
          onClick={() =>
            finishSession()
          }
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button onClick={() => setSettings(true)}>
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </div>
      {isFinished && <RecallForm setIsFinished={setIsFinished}/>}
    </div>
  );
}
export default Timer;
