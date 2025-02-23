import { Text, View, StyleSheet, Touchable } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
// Goal is to slowly increase the study endurance of people who are struggling
// Thinking that best way to do this is to increase duration on a week by week basis depending on their performance, perhaps 10% if good, 0% if ok, then take it back a little if they are struggling
// Turn on or off, and this will dynamically change if you have a goal you are trying to reach
// User input will determine whether or not to increase the time. After NotesInput, the person will then input how easy the session was for them, and then the duration will be adjusted accordingly
export default function DynamicTime({
  duration,
  setDuration,
  short,
  setShort,
  long,
  setLong,
  shortToLong,
  setShortToLong,
  setSettings,
  zen,
  setZen,
}: any) {
  return (
    <></>
  )
}

const styles = StyleSheet.create({
});
