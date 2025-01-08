import { Text, View, StyleSheet, Touchable } from "react-native";
import { useState, useEffect, useRef } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { s, colors } from "@/app/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import { Platform, TouchableOpacity } from "react-native";
import NotesInput from "@/components/NotesInput";
import Recall from "@/components/Recall/Recall";
import Settings from "@/components/Settings";
import { supabase } from "@/supabase";

export default function Timer() {
  // Timer props
  const [duration, setDuration] = useState(50);
  const [short, setShort] = useState(10);
  const [long, setLong] = useState(30);
  const [shortToLong, setShortToLong] = useState(2);
  const [time, setTime] = useState(duration * 60);

  // Managing pages and timer state
  const [isActive, setActive] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isSettings, setSettings] = useState(false);
  const [isNotesInput, setNotesInput] = useState(false);
  const [isRecall, setRecall] = useState(false);

  // User Info
  const [totalTime, setTotalTime] = useState(0);
  const [sessions, setSessions] = useState<any>();
  const [questions, setQuestions] = useState<any>();
  const [answers, setAnswers] = useState();
  const completedSessions = useRef(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setTime(duration * 60);
  }, [duration]);
  // Obtain user data on initial render and when finished with session
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const sessions = await supabase.from("sessions").select("*").eq("user_id", user?.id);
      if (sessions.data) setSessions(sessions.data);
      const questions = await supabase.from("questions").select("*").eq("user_id", user?.id);
      if (questions.data) setQuestions(questions.data);
      // Possible to fetch answers here as well if we want later
      const settings = await supabase.from("settings").select("*").eq("id", user?.id);
      if (settings.data) {
        setDuration(settings.data[0].duration);
        setShort(settings.data[0].short);
        setLong(settings.data[0].long);
        setShortToLong(settings.data[0].shortToLong);
      } else {
        // initialize user settings
        const { data, error } = await supabase.from("settings").insert({ id: user?.id });
      }
    }

    fetchData().catch(console.error);
  }, [isFinished])
  function startTimer() {
    if (!isActive) {
      setActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current!);
            setActive(false);
            console.log("Time's up!");
            // add a sound here or something to alert

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
            setBreak(!isBreak);
            return duration;
          }
          if (!isBreak) {
            setTotalTime((prevTotalTime) => prevTotalTime + 1);
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
    setActive(false);
  }
  function pausePlayTimer() {
    if (isActive) {
      clearInterval(intervalRef.current!);
      setActive(false);
    } else {
      startTimer();
    }
  }
  function finishSession() {
    // Stop timer
    clearInterval(intervalRef.current!);
    setActive(false);

    setNotesInput(true);
    setFinished(true);
    setBreak(false);
    setTime(duration * 60);
    completedSessions.current = 0;
  }

  function activeRecall() {
    // 1. Check database for questions to pull up and put into recalling screens
    // How do we want to pick questions to review? Correctness v.s. schedule?
    // Create different repitition schedules for questions. Also will need to store in database
    // After doing research, may need to reconfigure answers/questions, questions will likely need to be updated with a value that determines "ease factor" based on user feedback on how much they know the question
    // This will then update the scheduling logic: if they get it wrong, the interval for recall gets reset to 1. If they get it right, then based on how easy it was, the interval for recall will increase.
    // Question: at what point do we stop asking questions? Perhaps give people this option to choose when they want questions to expire? After certain amount of times they got the question right? At some point though, if you get the question right over and over the interval will continue to increase to extremely long periods of time
    // After implementing basic scheduling, consider implementing with FSRS
    // 2. Pull up questions and answers in recalling screens, TODO: offer reasons behind grading of half-right answers
    // 3. Update database with new answers
  }

  // Use this to update settings
  const pan = Gesture.Pan().onUpdate((event) => {
    console.log(event.translationX, event.translationY);
  })

  return (
    <View style={styles.timerCont}>
      {isNotesInput && (
        <NotesInput totalTime={totalTime} setNotesInput={setNotesInput} />
      )}
      {/* <NotesInput handleNotesInput={handleNotesInput} /> */}
      {isRecall && (
        <Recall
          setRecall={setRecall}
          sessions={sessions}
          questions={questions}
          answers={answers}
        />
      )}
      {isSettings && (
        <Settings
          duration={duration}
          setDuration={setDuration}
          short={short}
          setShort={setShort}
          long={long}
          setLong={setLong}
          shortToLong={shortToLong}
          setShortToLong={setShortToLong}
          setSettings={setSettings}
        />
      )}
      {/* <Recall /> */}
      <Text style={[{ color: colors.text }, styles.header]}>
        {isBreak ? "Break" : "Work"} Time
      </Text>
      <Text style={{ color: colors.text }}>
        {completedSessions.current} completed sessions
      </Text>
      <TouchableOpacity style={styles.clockCont}>
        <GestureDetector gesture={pan}>
          <Text style={styles.clock} onPress={pausePlayTimer}>
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
            :{(time % 60).toString().padStart(2, "0")}
          </Text>
        </GestureDetector>
      </TouchableOpacity>
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
        <Pressable onPress={() => setRecall(true)}>
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
  clockCont: {
    outline: '1rem solid red',
  },
  clock: {
    margin: 50,
    color: colors.text,
    fontSize: 100,
  },
  header: {
    fontSize: 30,
  }
});
