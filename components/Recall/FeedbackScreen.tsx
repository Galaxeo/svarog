import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";

export default function FeedbackScreen(
  {
    userAnswers,
    questions,
    setRecall,
    userFeedback,
  }: any
) {
  // Screen to allow people to input how easy the question was
  // If it was wrong: set interval back to 1
  // Right has three levels: hard, good, and easy. Will update interval as necessary
  const [dummy, setDummy] = useState<any>("");
  // TODO: NEED TO ADD THE SETRECALL TO FALSE
  function displayQuestions() {
    if (dummy == "") {
      return <ActivityIndicator size="large" color={colors.text} />;
    }
    setRecall(false);
  }

  return <ActivityIndicator size="large" color={colors.text} />;
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 20,
  },
});
