import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
      <Text style={s.text}>What are we reviewing today?</Text>
      <Accordion
        sessions={dummySessions}
        questions={dummyQuestions}
        answers={dummyAnswers}
      />
      <TouchableOpacity activeOpacity={0.5}>
        <MaterialIcons name="arrow-forward" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "85%",
    height: "85%",
    flex: 1,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTranslucent,
    zIndex: 2,
    elevation: 2,
  },
});
