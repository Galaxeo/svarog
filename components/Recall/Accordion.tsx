import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
  const toggleColor = () => {
    setTextColor(textColor === "grey" ? "aqua" : "grey");
  };
  // "Remembering" selection state
  useEffect(() => {
    if (questionObj.reviewed) {
      setTextColor("grey");
    } else {
      setTextColor(colors.text);
    }
  }, []);
  function handleSetQuestions(questionObj: any) {
    // add question to setSelection array, remove if already in array
    // if (selection.includes(questionObj)) {
    //   setSelection(selection.filter((q) => q !== questionObj));
    // } else {
    //   setSelection([...selection, questionObj]);
    // }
    handleCurrentQuestion(questionObj);
  }
  return (
    <TouchableOpacity
      key={questionObj.id}
      onPress={(e) => {
        e.stopPropagation();
        toggleColor();
        handleSetQuestions(questionObj);
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
  }
  return (
    <TouchableOpacity
      style={styles.sessionRow}
      activeOpacity={0.6}
      onPress={() => {
        revealQuestions();
      }}
    >
      <View style={styles.sessionContent}>
        <Text style={s.text}>{session.date}</Text>
        <Text style={s.text}>{String((session.duration / 60).toFixed(1))}</Text>
        <Text style={s.text}>{session.topic}</Text>
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
  function getQuestions(session_id: number) {
    if (questions === undefined) { return }
    return questions.filter(
      (question: questionType) => question.session_id === session_id
    );
  }
  // This function probably won't have to use until we want to show previous answers (i.e. in statistics)
  function getAnswers(question_id: number) {
    return answers.filter(
      (answer: answerType) => answer.question_id === question_id
    );
  }
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
      />
    ));
  }
  return <View>{createSessionRows(sessions)}</View>;
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
