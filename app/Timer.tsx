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
import Statistics from "@/components/Statistics";
import { supabase } from "@/supabase";
import { useAudioPlayer } from 'expo-audio'

const notificationSound = require("@/assets/notification.mp3");

export default function Timer() {

  const notiPlayer = useAudioPlayer(notificationSound);

  // Timer props
  const [duration, setDuration] = useState(.1);
  const [short, setShort] = useState(.05);
  const [long, setLong] = useState(10);
  const [shortToLong, setShortToLong] = useState(2);
  const [time, setTime] = useState(duration * 60);

  // Managing pages and timer state
  const [isActive, setActive] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isSettings, setSettings] = useState(false);
  const [isNotesInput, setNotesInput] = useState(false);
  const [isRecall, setRecall] = useState(false);
  const [isStatistics, setStatistics] = useState(false);
  // const [isRecall, setRecall] = useState(false);

  // User Info
  const [totalTime, setTotalTime] = useState(0);
  const [sessions, setSessions] = useState<any>();
  const [questions, setQuestions] = useState<any>();
  const [answers, setAnswers] = useState();
  const completedSessions = useRef(0);

  const [zenMode, setZenMode] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // TODO: Obtain questions that has a nextDate value equal to or prior to current date

  useEffect(() => {
    setTime(duration * 60);
  }, [duration]);
  // Obtain user data on initial render and when finished with session
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const now = new Date().toISOString();

      const questions = await supabase.from("questions").select("*").lte("next_date", now).eq("user_id", user?.id);
      if (questions.data) {
        setQuestions(questions.data);
        const sessions = await supabase.from("sessions").select("*").eq("user_id", user?.id);
        if (sessions.data) setSessions(sessions.data);
      }
      // Ensure that we only obtain sessions with questions due
      // Possible to fetch answers here as well if we want later
      const settings = await supabase.from("settings").select("*").eq("id", user?.id);
      if (settings.data) {
        setDuration(settings.data[0].duration);
        setShort(settings.data[0].short);
        setLong(settings.data[0].long);
        setShortToLong(settings.data[0].shortToLong);
      } else {
        // TODO: What to do if supabase not responding/server down?
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
            notiPlayer.seekTo(0);
            notiPlayer.play();
            console.log("Time's up!");
            // add a sound here or something to alert

            // set break time
            // Thinking should just continue as if shortToLong was set like that the whole time
            if (!isBreak) {
              completedSessions.current += 1;
            }
            const newTime = isBreak ? duration * 60 : completedSessions.current % shortToLong === 0 ? long * 60 : short * 60;

            setBreak((prevBreak) => !prevBreak);
            setTime(newTime);
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


  // Use this to update settings
  const pan = Gesture.Pan().onUpdate((event) => {
    console.log(event.translationX, event.translationY);
  })

  return (
    <View style={styles.timerCont}>
      {isNotesInput && (
        <NotesInput totalTime={totalTime} setNotesInput={setNotesInput} />
      )}
      {isRecall && (
        <Recall
          setRecall={setRecall}
          allSessions={sessions}
          setSessions={setSessions}
          questions={questions}
          setQuestions={setQuestions}
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
          zen={zenMode}
          setZen={setZenMode}
          setSettings={setSettings}
        />
      )}
      {isStatistics && (
        <Statistics sessions={sessions} />
      )
      }
      <Text style={[{ color: colors.text }, styles.header]}>
        {isBreak ? "Break" : "Work"} Time
      </Text>
      <Text style={{ color: colors.text }}>
        {completedSessions.current} completed sessions
      </Text>
      {zenMode ?
        <TouchableOpacity style={styles.clockCont}>
          <GestureDetector gesture={pan}>
            <Text style={[styles.clock, { color: isActive ? colors.text : 'gray' }]} onPress={pausePlayTimer}>
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}:XX
            </Text>
          </GestureDetector>
        </TouchableOpacity> :
        <TouchableOpacity style={styles.clockCont}>
          <GestureDetector gesture={pan}>
            <Text style={[styles.clock, { color: isActive ? colors.text : 'gray' }]} onPress={pausePlayTimer}>
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
            </Text>
          </GestureDetector>
        </TouchableOpacity>
      }
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={pausePlayTimer}>
          <MaterialIcons
            name={isActive ? "pause" : "play-arrow"}
            size={48}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer}>
          <MaterialIcons name="replay" size={48} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={finishSession}>
          <MaterialIcons name="stop" size={48} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSettings(true)}>
          <MaterialIcons name="settings" size={48} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRecall(true)}>
          <MaterialIcons name="assignment" size={48} color={colors.text} />
        </TouchableOpacity>
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
    fontSize: 100,
  },
  header: {
    fontSize: 30,
  }
});
