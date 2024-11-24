import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../app/styles";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import { dummyAnswers, dummyQuestions, dummySessions } from "./dummy";

function SessionRow({ date, duration, topic }) {
  return (
    <View style={styles.sessionRow}>
      <Text style={s.text}>{date}</Text>
      <Text style={s.text}>{duration}</Text>
      <Text style={s.text}>{topic}</Text>
    </View>
  );
}

export default function Accordion() {
  return (
    <View style={styles.container}>
      {dummySessions.map((session) => (
        <SessionRow {...session} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "70%",
    height: "70%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
