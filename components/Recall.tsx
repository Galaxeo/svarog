import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../app/styles";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import { dummyAnswers, dummyQuestions, dummySessions } from "./dummy";
import Accordion from "./Accordion";

export default function Recall() {
  return (
    // TODO: Dummy data in here and supabase for topics and questions to pop up, as well as answers
    <View style={styles.container}>
      <Accordion
        sessions={dummySessions}
        questions={dummyQuestions}
        answers={dummyAnswers}
      />
      <Text style={s.text}>Recall</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "85%",
    height: "85%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
});
