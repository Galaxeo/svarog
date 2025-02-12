import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { questionType, sessionType, answerType } from "@/app/types";
import { MaterialIcons } from "@expo/vector-icons";

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

// Accordion component for selecting questions to review

function QuestionRow({
  questionObj,
  selection,
  setSelection,
  handleCurrentQuestion,
}: any
) {
  const [textColor, setTextColor] = useState("grey");
  // "Remembering" selection state
  useEffect(() => {
    if (questionObj.reviewed) {
      setTextColor("grey");
    } else {
      setTextColor(colors.text);
    }
  }, []);
  return (
    <TouchableOpacity
      key={questionObj.id}
      onPress={(e) => {
        e.stopPropagation();
        handleCurrentQuestion(questionObj);
      }}
      style={{ margin: 5 }}
    >
      <Text style={{ color: textColor }}>{questionObj.reviewed ? <MaterialIcons name="check" size={12} color={colors.lightGreen} /> : <></>}
        {questionObj.question}</Text>
    </TouchableOpacity>
  );
}

function SessionRow({
  session,
  questions,
  selection,
  setSelection, // is this scuffed to pass setquestions down through 2 million components
  handleCurrentQuestion,
  activeSession,
  setActiveSession,
}: any
) {
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

  function revealQuestions() {
    if (heightVal.value === 0) {
      runOnUI(() => {
        heightVal.value = withTiming(measure(listRef)!.height);
      })();
    }
    open.value = !open.value;
    if (open.value) {
      setActiveSession(session.id);
    }
  }
  useEffect(() => {
    if (activeSession != session.id && open.value) {
      revealQuestions();
    }
  })
  return (
    <TouchableOpacity
      style={styles.sessionRow}
      activeOpacity={0.6}
      onPress={() => {
        revealQuestions();
      }}
    >
      <View style={styles.sessionContent}>
        <Text style={styles.sessionInfo}>{session.date}</Text>
        <Text style={styles.sessionInfo}>{String((session.duration / 60).toFixed(1))}</Text>
        <Text style={styles.sessionInfo}>{session.topic}</Text>
      </View>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.questionRow}>
          {questions.map((question: any) => (
            <QuestionRow
              key={question.id}
              questionObj={question}
              selection={selection}
              setSelection={setSelection}
              handleCurrentQuestion={handleCurrentQuestion}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function Accordion({
  sessions,
  questions,
  answers,
  selection,
  setSelection,
  handleCurrentQuestion
}: any) {
  const [activeSession, setActiveSession] = useState();
  function getQuestions(session_id: number) {
    if (questions === undefined) { return }
    return questions.filter(
      (question: questionType) => question.session_id === session_id
    );
  }
  // This function probably won't have to use until we want to show previous answers (i.e. in statistics)
  // function getAnswers(question_id: number) {
  //   return answers.filter(
  //     (answer: answerType) => answer.question_id === question_id
  //   );
  // }
  function createSessionRows(sessions: sessionType[]) {
    const sessionsArr = [];
    for (let i in sessions) {
      const session = sessions[i];
      sessionsArr.push({ session, questions: getQuestions(session.id) });
    }
    return sessionsArr.map(({ session, questions }) => (
      <SessionRow
        setSelection={setSelection}
        handleCurrentQuestion={handleCurrentQuestion}
        key={session.id}
        session={session}
        questions={questions}
        selection={selection}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
      />
    ));
  }
  return <View style={styles.accordion}>{createSessionRows(sessions)}</View>;
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
    backgroundColor: colors.backgroundTransparent,
    borderRadius: 10,
    gap: 5,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
    width: "auto",
    margin: 5,
    overflow: "hidden",
  },
  sessionContent: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  questionRow: {
    position: "absolute",
    padding: 10,
  },
  sessionInfo: {
    color: colors.text,
    textOverflow: "ellipsis",
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 'auto',
    maxWidth: "80%",
  }
});
