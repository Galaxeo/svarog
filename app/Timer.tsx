import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";

import { s, colors } from "./styles";
import { supabase } from "../supabase";
import { Button } from "@rneui/themed";

interface TimerProps {
  duration: number;
  short: number;
  long: number;
  shortToLong: number;
  setSettings: (settings: boolean) => void;
}

export default function Timer({
  duration = 5,
  short = 5,
  long = 30,
  shortToLong = 4,
  setSettings,
}: TimerProps) {
  const [time, setTime] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
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
            // TODO: Test what we want to happen when shortToLong is changed
            // Thinking should just continue as if shortToLong was set like that the whole time
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
  // Reset timer as reset current phase or whole session?
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
    // TODO: need to add an alert here or something
    setIsFinished(true);
  }

  return (
    <View>
      {/* BIG TODO: Style this whole section */}
      <Text style={{ color: colors.text }}>
        {isBreak ? "Break" : "Work"} Time
      </Text>
      <Text style={{ color: colors.text }}>
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </Text>
      <Button onPress={startTimer}>Start</Button>
      <Button onPress={pausePlayTimer}>Pause/Play</Button>
      <Button onPress={resetTimer}>Reset</Button>
      <Button onPress={finishSession}>Finish Session</Button>
      <Button onPress={() => setSettings(true)}>Settings</Button>
      {isFinished && <Text>Session finished!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});
