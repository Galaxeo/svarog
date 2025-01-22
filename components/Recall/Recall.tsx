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
import { useState, useEffect } from "react";
import { s, colors } from "@/app/styles";
import QuestionScreen from "./QuestionScreen";
import RecallingScreen from "./RecallingScreen";
import FeedbackScreen from "./FeedbackScreen";
import { checkAnswer } from "@/openai";

import { dummyAnswers, dummyQuestions, dummySessions } from "../dummy";

export default function Recall({
  setRecall,
  sessions,
  questions,
  answers,
}: {
  setRecall: any;
  sessions: any;
  questions: any;
  answers: any;
}) {
  const [selection, setSelection] = useState([]);
  const [state, setState] = useState("question");
  // Consider moving userdata outside of recall component
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [userFeedback, setUserFeedback] = useState<any>({});
  const fadeInOpacity = useSharedValue(1);
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
  // Handling the change of user answers
  function handleUserAnswers(i: any, answer: string) {
    // change index of userAnswers to answer
    const temp: any = userAnswers;
    temp[JSON.stringify(i)] = answer;
    setUserAnswers(temp);
  }
  async function handleAnswerSubmit() {

    // Putting this up here makes the UI more responsive
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    for (let i in userAnswers) {
      const obj = JSON.parse(i);
      const prompt =
        "Question: " + obj.question + ", Answer: " + userAnswers[i];
      setState("feedback");
      // TODO: REENABLE after testing feedback screen
      // const correctStatus = await checkAnswer(prompt);
      const correctStatus = "C|Ð|aint that some bullsht";
      setUserFeedback((prev: any) => ({ ...prev, [i]: correctStatus }));
      // REENABLE WHEN DONE TESTING FEEDBACK SCREEN
      // if (["C", "I", "H"].includes(correctStatus[0])) {
      //   const { data, error } = await supabase.from("answers").insert([
      //     {
      //       question_id: obj.id,
      //       answer: userAnswers[i],
      //       status: correctStatus[0],
      //       user_id: id,
      //     },
      //   ]);
      // } else {
      //   alert("Error submitting answer");
      // }
    }

    // const { data, error } = await supabase
    //   .from("answers")
    //   .insert([{ user_id: id, answers: userAnswers }]);
  }
  return (
    <View style={styles.background}>
      {state === "question" && questions != undefined ? (
        <QuestionScreen
          sessions={sessions}
          questions={questions}
          answers={answers}
          setRecall={setRecall}
          animatedStyle={animatedStyle}
          selection={selection}
          setSelection={setSelection}
          handleQuestionSubmit={handleQuestionSubmit}
          fadeIn={fadeIn}
          fadeOut={fadeOut}
        />
      ) : null}
      {state === "recalling" ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          {Platform.OS === "web" && (
            <View>
              <FlatList
                data={selection}
                renderItem={({ item }) => (
                  <RecallingScreen
                    fadeIn={fadeIn}
                    questionObj={item}
                    userAnswers={userAnswers}
                    handleUserAnswers={handleUserAnswers}
                  />
                )}
                keyExtractor={(item, i) => i.toString()}
              />
            </View>
          )}
          {/* TODO: Better way to make sure that touch controls are more clear, or add actual buttons*/}
          {Platform.OS === "ios" && (
            <View style={styles.container}>
              <FlatList
                style={{ height: "20%" }}
                data={selection}
                horizontal
                pagingEnabled
                bounces={false}
                renderItem={({ item }) => (
                  <RecallingScreen
                    fadeIn={fadeIn}
                    questionObj={item}
                    userAnswers={userAnswers}
                    handleUserAnswers={handleUserAnswers}
                  />
                )}
                onViewableItemsChanged={(viewableItems) => {
                  if (viewableItems.changed[0].index !== null) {
                    setCurrentQuestion(viewableItems.changed[0].index);
                  }
                }}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              />
              <Text style={[s.text, { fontSize: 16 }]}>
                {currentQuestion + 1}/{selection.length}
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => {
                  fadeOut();
                  setTimeout(() => setState("question"), 200);
                }}
                name="arrow-back"
                size={48}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                onPress={handleAnswerSubmit}
                name="check"
                size={48}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
      {state === "feedback" && (
        <FeedbackScreen userAnswers={userAnswers} questions={selection} setRecall={setRecall} userFeedback={userFeedback} />
      )}
    </View>
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
