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
import { dummyAnswers, dummyQuestions, dummySessions } from "./dummy";
import Accordion from "./Accordion";

function QuestionScreen({
  setRecall,
  animatedStyle,
  selection,
  setSelection,
  handleQuestionSubmit,
  fadeIn,
  fadeOut,
}: {
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
          {question}
        </Text>
      ))}
      <Accordion
        sessions={dummySessions}
        questions={dummyQuestions}
        answers={dummyAnswers}
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
function RecallingScreen({
  fadeIn,
  fadeOut,
  question,
  userAnswers,
  handleUserAnswers,
}: {
  fadeIn: any;
  fadeOut: any;
  question: string;
  userAnswers: any;
  handleUserAnswers: any;
}) {
  useEffect(() => {
    fadeIn();
  }, []);
  const { width } = useWindowDimensions();
  //  TODO: Implement page numbers for questions
  return (
    <View style={[styles.container, { width }]}>
      <Text style={s.text}>{question}?</Text>
      <TextInput
        defaultValue={userAnswers[question]}
        style={styles.input}
        onChangeText={(text) => handleUserAnswers(question, text)}
        multiline
        numberOfLines={8}
      />
    </View>
  );
}

export default function Recall({ setRecall }: { setRecall: any }) {
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
  function handleUserAnswers(i, answer) {
    // change index of userAnswers to answer
    const temp: any = userAnswers;
    temp[i] = answer;
    setUserAnswers(temp);
  }
  // TODO: Answer submission into the database, need to figure out how to format the userAnswers to insert into the database
  // Maybe parse through the arrays?
  async function handleAnswerSubmit() {
    // const userID = supabase.auth.getUser()?.id;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    // Below is untested, try submitting dummy data first
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
            <FlatList
              data={selection}
              renderItem={({ item }) => (
                <RecallingScreen
                  fadeIn={fadeIn}
                  fadeOut={fadeOut}
                  question={item}
                  userAnswers={userAnswers}
                  handleUserAnswers={handleUserAnswers}
                />
              )}
              keyExtractor={(item, i) => i.toString()}
            />
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
