import { Text, View, StyleSheet, Touchable } from "react-native";
import { useState, useEffect, useRef } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { s, colors } from "@/app/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, TouchableOpacity } from "react-native";
import NotesInput from "@/components/NotesInput";
import Recall from "@/components/Recall/Recall";
import PomorodoTimer from "@/components/PomodoroTimer";
import FreeTimer from "@/components/FreeTimer";
import Statistics from "@/components/Statistics";
import DynamicAssist from "@/components/DynamicAssist";
import { supabase } from "@/supabase";
import { useAudioPlayer } from 'expo-audio'

export default function Timer() {
  const [timerType, setTimerType] = useState("pomodoro");
  return (<>
    {timerType === "pomodoro" && <PomorodoTimer />}
    {timerType === "free" && <FreeTimer />}
  </>)

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
}
);
