// import React from "react";
import { useEffect, useRef, useState } from "react";
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

interface TimerProps {
  duration: number;
  short: number;
  long: number;
  shortToLong: number;
  setSettings: (settings: boolean) => void;
}

function Timer({ duration = 25, short = 5, long = 30, shortToLong = 4, setSettings }: TimerProps) {
  /**
   * Pomodoro Timer Details
   * Functions: start, pause, reset
   * Duration is in minutes, will convert to seconds for timer
   * After duration, set break time, then after break time, set duration again
   */

  // duration in minutes
  const [time, setTime] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false); const [isBreak, setIsBreak] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const completedSessions = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setTime(duration * 60);
  }, [duration]);
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
            if (!isBreak) {
              completedSessions.current += 1;
            }
            if (completedSessions.current % shortToLong === 0) {
              setTime(long * 60);
            } else {
              setTime(short * 60);
            }
            setIsBreak(!isBreak);
            return duration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }
  function resetTimer() {
    clearInterval(intervalRef.current!);
    setTime(duration * 60);
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
      duration: 3000,
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
    <>
      <Toaster position="top-right" />
      <div className="timerCont">
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
        {isFinished && <RecallForm setIsFinished={setIsFinished} />}
      </div></>
  );
}
export default Timer;
