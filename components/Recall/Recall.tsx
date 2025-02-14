import { supabase } from "@/supabase";
import {
  Platform,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import Accordion from "./Accordion";
import Review from "./Review";
import { checkAnswer } from "@/openai";

import { dummyAnswers, dummyQuestions, dummySessions } from "../dummy";

export default function Recall({
  setRecall,
  allSessions,
  setSessions,
  questions,
  setQuestions,
  answers,
}: any) {
  const [selection, setSelection] = useState([]);
  const [state, setState] = useState("question");
  // Consider moving userdata outside of recall component
  const [currentQuestion, setCurrentQuestion] = useState<any>({});
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [userFeedback, setUserFeedback] = useState<any>({});
  const flatListRef = useRef<FlatList>(null);
  const fadeInOpacity = useSharedValue(1);

  const sessionIds = questions.map((question: any) => question.session_id);
  const sessions = allSessions.filter((session: any) => sessionIds.includes(session.id));

  const fadeIn = () => {
    fadeInOpacity.value = withTiming(1, {
      duration: 100,
      easing: Easing.linear,
    });
  };
  const fadeOut = () => {
    fadeInOpacity.value = withTiming(0, {
      duration: 100,
      easing: Easing.linear,
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInOpacity.value,
    };
  });
  // The selection of questions to review
  function handleQuestionSubmit() {
    if (selection.length === 0) {
      alert("Please select a question to review.");
    } else {
      fadeOut();
      setTimeout(() => setState("recalling"), 200);
    }
  }
  function handleCurrentQuestion(question: any) {
    if (question.reviewed) {
      alert("Already done!");
      return;
    }
    setState("recalling")
    setCurrentQuestion(question)
  }
  return (
    <View style={styles.background}>
      {/* TODO: REWORK COMPLETELY! One question at a time (inbox style). In the future, figure out how to */}
      {/* Step 1: Rework question screen (set selection)*/}
      {state === "question" && questions != undefined ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={s.text}>What are we reviewing today?</Text>
          {/* TODO: Create filler for what happens with no questions (empty questions)*/}
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
            handleCurrentQuestion={handleCurrentQuestion}
          />
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={0.5}>
              <MaterialIcons
                name="arrow-forward"
                onPress={handleQuestionSubmit}
                size={48}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <MaterialIcons
                name="close"
                onPress={() => {
                  setRecall(false);
                }}
                size={48}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
      {state === "recalling" ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          <Review questionObj={currentQuestion} setState={setState} setSessions={setSessions} setQuestions={setQuestions} />
          {/* This is where question would go one by one*/}
        </Animated.View >
      ) : null}
    </View >
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
  flatList: {
    flexGrow: 0.5,
  }
});
