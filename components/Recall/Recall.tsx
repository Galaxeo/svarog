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

import { dummyAnswers, dummyQuestions, dummySessions } from "../dummy";

export default function Recall({
  setRecall,
}: {
  setRecall: any;
}) {
  const [selection, setSelection] = useState([]);
  const [state, setState] = useState("question");
  const [sessions, setSessions] = useState(dummySessions);
  const [questions, setQuestions] = useState(dummyQuestions);
  const [answers, setAnswers] = useState(dummyAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any>({});
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
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // TODO: fetch sessions, questions, and answers from supabase
      const { data } = await supabase.from("sessions").select("*").eq("user_id", user?.id);
      if (data) setSessions(data);
    }
  })
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
    temp[i.id] = answer;
    setUserAnswers(temp);
  }
  // TODO: Answer submission into the database, need to figure out how to format the userAnswers to insert into the database
  // Maybe parse through the arrays?
  async function handleAnswerSubmit() {
    /*
     * Answers table schema:
     * id
     * question_id
     * answer
     * status
     * user_id
     */

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    for (let i in userAnswers) {
      // TODO: Implement this later on when answer status is implemented
      const { data, error } = await supabase.from("answers").insert([
        {
          question_id: i,
          answer: userAnswers[i],
          status: "ungraded",
          user_id: id,
        },
      ]);
    }

    // const { data, error } = await supabase
    //   .from("answers")
    //   .insert([{ user_id: id, answers: userAnswers }]);
    setRecall(false);
  }
  return (
    // TODO: Dummy data in here and supabase for topics and questions to pop up, as well as answers
    <View style={styles.background}>
      {state === "question" ? (
        <QuestionScreen
          //  TODO: Replace dummy data with actual data, where to get data from? in the parent component or here
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
            <View style={styles.container}>
              <FlatList
                data={selection}
                renderItem={({ item }) => (
                  <RecallingScreen
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    questionObj={item}
                    userAnswers={userAnswers}
                    handleUserAnswers={handleUserAnswers}
                  />
                )}
                keyExtractor={(item, i) => i.toString()}
              />
            </View>
          )}
          {Platform.OS === "ios" && (
            <View style={styles.container}>
              <FlatList
                data={selection}
                horizontal
                pagingEnabled
                bounces={false}
                renderItem={({ item }) => (
                  <RecallingScreen
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
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
          <TouchableOpacity>
            <MaterialIcons
              onPress={() => {
                fadeOut();
                setTimeout(() => setState("question"), 200);
              }}
              name="arrow-back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              onPress={handleAnswerSubmit}
              name="check"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
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
