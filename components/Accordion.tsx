import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../app/styles";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import { dummyAnswers, dummyQuestions, dummySessions } from "./dummy";
import { Button } from "@rneui/themed";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedRef,
  runOnUI,
  measure,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

type sessionType = {
  id: number;
  date: string;
  duration: number;
  topic: string;
};

type questionType = {
  id: number;
  session_id: number;
  user_id: string;
  question: string;
  answers: answerType[];
};

type answerType = {
  id: number;
  question_id: number;
  user_id: string;
  status: string;
  answer: string;
};

function SessionRow({
  session,
  questions,
}: {
  session: sessionType;
  questions: any[];
}) {
  const listRef = useAnimatedRef<Animated.View>();
  const heightVal = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightVal.value],
      Extrapolation.CLAMP
    ),
  }));
  return (
    <Pressable
      style={styles.sessionRow}
      onPress={() => {
        if (heightVal.value === 0) {
          runOnUI(() => {
            heightVal.value = withTiming(measure(listRef)!.height);
          })();
        }
        open.value = !open.value;
      }}
    >
      <View style={styles.sessionContent}>
        <Text style={s.text}>{session.date}</Text>
        <Text style={s.text}>{String(session.duration)}</Text>
        <Text style={s.text}>{session.topic}</Text>
      </View>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.questionRow}>
          {questions.map(({ question, answers }) => (
            <Text style={s.text}>{(question as any).question}</Text>
          ))}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export default function Accordion({ sessions, questions, answers }: any) {
  // need to match up sessions with questions and questions with answers
  function getQuestions(session_id: number) {
    return questions.filter(
      (question: questionType) => question.session_id === session_id
    );
  }
  function getAnswers(question_id: number) {
    return answers.filter(
      (answer: answerType) => answer.question_id === question_id
    );
  }
  function createSessionRows(sessions: sessionType[]) {
    // 1. Create array of sessions with questions and answers
    // 2. Map out the sessions into SessionRow components
    const sessionsArr = [];
    for (let i in sessions) {
      const session = sessions[i];
      const questionsArr = [];
      const questions = getQuestions(session.id);
      for (let j in questions) {
        const question = questions[j];
        const answers = getAnswers(question.id);
        questionsArr.push({ question, answers });
      }
      sessionsArr.push({ session, questions: questionsArr });
    }
    for (let i in sessionsArr) {
      console.log(sessionsArr[i].questions);
    }
    return sessionsArr.map(({ session, questions }) => (
      <SessionRow key={session.id} session={session} questions={questions} />
    ));
  }
  return (
    <View style={styles.container}>
      <Text style={s.text}>Sessions</Text>
      {createSessionRows(sessions)}
    </View>
  );
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
  sessionRow: {
    justifyContent: "space-between",
    borderRadius: 10,
    gap: 5,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
    margin: 5,
    overflow: "hidden",
  },
  sessionContent: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  questionRow: {
    position: "absolute",
    padding: 10,
  },
});
