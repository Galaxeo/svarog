import { supabase } from "@/supabase";
import {
  Platform,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../app/styles";
import Accordion from "./Accordion";

// Screen for selecting questions to review
function QuestionScreen({
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
// Screen for recalling answers
function RecallingScreen({
  fadeIn,
  fadeOut,
  questionObj,
  userAnswers,
  handleUserAnswers,
}: {
  fadeIn: any;
  fadeOut: any;
  questionObj: any;
  userAnswers: any;
  handleUserAnswers: any;
}) {
  useEffect(() => {
    fadeIn();
  }, []);
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Text style={s.text}>{questionObj.question}?</Text>
      <TextInput
        defaultValue={userAnswers[questionObj.id]}
        style={styles.input}
        onChangeText={(text) => handleUserAnswers(questionObj, text)}
        multiline
        numberOfLines={8}
      />
    </View>
  );
}

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
    // const userID = supabase.auth.getUser()?.id;
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
    // Now we have the question ID and the answer, we can insert into the database
    for (let i in userAnswers) {
      // TODO: Test, this works
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
                    question={item}
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
