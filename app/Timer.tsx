import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";

import { s, colors } from "@/app/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import NotesInput from "@/components/NotesInput";
import Recall from "@/components/Recall/Recall";
// test data
import {
  dummyAnswers,
  dummyQuestions,
  dummySessions,
} from "@/components/dummy";

interface TimerProps {
  duration: number;
  short: number;
  long: number;
  shortToLong: number;
  setSettings: (settings: boolean) => void;
}

export default function Timer({
  duration = 0.1,
  short = 0.2,
  long = 30,
  shortToLong = 2,
  setSettings,
}: TimerProps) {
  const [time, setTime] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isNotesInput, setIsNotesInput] = useState(false);
  const [isRecall, setIsRecall] = useState(true); // change to false when done testing
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
    setIsNotesInput(true);
    setIsFinished(true);
    setIsBreak(false);
    setTime(duration * 60);
    completedSessions.current = 0;
  }

  return (
    <View style={styles.timerCont}>
      {/* BIG TODO: Style this whole section */}
      {isNotesInput && <NotesInput setIsNotesInput={setIsNotesInput} />}
      {/* <NotesInput handleNotesInput={handleNotesInput} /> */}
      {isRecall && (
        <Recall
          sessions={dummySessions}
          questions={dummyQuestions}
          answers={dummyAnswers}
          setRecall={setIsRecall}
        />
      )}
      {/* <Recall /> */}
      <Text style={{ color: colors.text }}>
        {isBreak ? "Break" : "Work"} Time
      </Text>
      <Text style={{ color: colors.text }}>
        {completedSessions.current} completed sessions
      </Text>
      <Text style={styles.clock} onPress={pausePlayTimer}>
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={pausePlayTimer}>
          <MaterialIcons
            name={isActive ? "pause" : "play-arrow"}
            size={48}
            color={colors.text}
          />
        </Pressable>
        <Pressable onPress={resetTimer}>
          <MaterialIcons name="replay" size={48} color={colors.text} />
        </Pressable>
        <Pressable onPress={finishSession}>
          <MaterialIcons name="stop" size={48} color={colors.text} />
        </Pressable>
        <Pressable onPress={() => setSettings(true)}>
          <MaterialIcons name="settings" size={48} color={colors.text} />
        </Pressable>
        <Pressable onPress={() => setIsRecall(true)}>
          <MaterialIcons name="assignment" size={48} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 0,
    width: "100%",
    height: "auto",
    zIndex: 1,
    elevation: 1,
  },
  button: {
    color: colors.background,
    padding: 10,
    borderRadius: 10,
  },
  clock: {
    color: colors.text,
    fontSize: 90,
  },
});
