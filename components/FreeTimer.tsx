import { Text, View, StyleSheet, Touchable } from "react-native";
import { useState, useEffect, useRef } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { s, colors } from "@/app/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, TouchableOpacity } from "react-native";
import NotesInput from "@/components/NotesInput";
import Recall from "@/components/Recall/Recall";
import Settings from "@/components/PomodoroSettings";
import Statistics from "@/components/Statistics";
import DynamicAssist from "@/components/DynamicAssist";
import { useAudioPlayer } from 'expo-audio'

const notificationSound = require("@/assets/notification.mp3");

export default function FreeTimer() {
  const [isActive, setActive] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef(0);
  const breakRef = useRef<NodeJS.Timeout | null>(null);
  const breakStartRef = useRef(0);
  // Overall time keeper
  function startStopwatch() {
    startRef.current = Date.now() - time * 1000;
    timerRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startRef.current) / 1000));
    });
    setActive(true);
  }
  function pauseStopwatch() {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setActive(false);
  }
  function resetStopwatch() {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setTime(0);
    setActive(false);
    resetBreak();
  }

  // Break time keeper 
  function startBreak() {
    breakStartRef.current = Date.now() - time * 1000;
    breakRef.current = setInterval(() => {
      setBreakTime(Math.floor((Date.now() - breakStartRef.current) / 1000));
    });
    setBreak(true);
  };
  function pauseBreak() {
    clearInterval(breakRef.current as NodeJS.Timeout);
    setBreak(false);
  };
  function resetBreak() {
    clearInterval(breakRef.current as NodeJS.Timeout);
    setBreakTime(0);
    setBreak(false);
  }

  // Other functions
  function formatTime() {
    // format the time to be displayed in minutes and seconds

  }
  const baseProps = { activeStrokeWidth: 10, inActiveStrokeWidth: 10, activeStrokeColor: colors.text, inActiveStrokeColor: colors.darkGray2, showProgressValue: false, maxValue: 60 };
  // TODO: Setup break to be toggled on/off while running regular time, and format time to be displayed well
  return (
    <View>
      <CircularProgressBase {...baseProps} value={Math.floor(time / 60)} radius={100}>
        <CircularProgressBase {...baseProps} value={time} radius={90}>
        </CircularProgressBase>
      </CircularProgressBase>
      <Text style={s.text}>{Math.floor(time / 60)}:{time % 60}</Text>
      {isActive ? (
        <TouchableOpacity onPress={pauseStopwatch}>
          <Text style={s.text}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startStopwatch}>
          <Text style={s.text}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
