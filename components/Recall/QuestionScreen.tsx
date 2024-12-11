import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { s, colors } from "@/app/styles";
import Accordion from "./Accordion";

// Screen for selecting questions

export default function QuestionScreen({
  sessions,
  questions,
  answers,
  setRecall,
  animatedStyle,
  selection,
  setSelection,
  handleQuestionSubmit,
  fadeIn,
  fadeOut,
}: {
  sessions: any;
  questions: any;
  answers: any;
  setRecall: any;
  animatedStyle: any;
  selection: any;
  setSelection: any;
  handleQuestionSubmit: any;
  fadeIn: any;
  fadeOut: any;
}) {
  useEffect(() => {
    fadeIn();
  }, []);
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={s.text}>What are we reviewing today?</Text>
      {selection.map((question: any, i: any) => (
        <Text key={i} style={s.text}>
          {question.question}
        </Text>
      ))}
      <Accordion
        sessions={sessions}
        questions={questions}
        answers={answers}
        selection={selection}
        setSelection={setSelection}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-forward"
            onPress={handleQuestionSubmit}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons
            name="close"
            onPress={() => {
              setRecall(false);
            }}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "85%",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
  input: {
    color: colors.text,
    height: 80,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
});
