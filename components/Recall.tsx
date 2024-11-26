import {
  FlatList,
  Text,
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
import { Pressable } from "react-native-gesture-handler";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../app/styles";
import { dummyAnswers, dummyQuestions, dummySessions } from "./dummy";
import Accordion from "./Accordion";

function RecallingExercise({
  fadeIn,
  fadeOut,
  question,
}: {
  fadeIn: any;
  fadeOut: any;
  question: string;
}) {
  useEffect(() => {
    fadeIn();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={s.text}>{question}?</Text>
    </View>
  );
}

export default function Recall({ setRecall }: { setRecall: any }) {
  const [selection, setSelection] = useState([]);
  const [state, setState] = useState("question");
  const { width } = useWindowDimensions();
  const fadeInOpacity = useSharedValue(1);
  const fadeIn = () => {
    fadeInOpacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.linear,
    });
  };
  const fadeOut = () => {
    fadeInOpacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInOpacity.value,
    };
  });
  function handleQuestionSubmit() {
    if (selection.length === 0) {
      alert("Please select a question to review.");
    } else {
      fadeOut();
      setTimeout(() => setState("recalling"), 200);
    }
  }
  return (
    // TODO: Dummy data in here and supabase for topics and questions to pop up, as well as answers
    <View style={styles.background}>
      {state === "question" ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={s.text}>What are we reviewing today?</Text>
          <Accordion
            sessions={dummySessions}
            questions={dummyQuestions}
            answers={dummyAnswers}
            selection={selection}
            setSelection={setSelection}
          />
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons
              name="arrow-forward"
              onPress={handleQuestionSubmit}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          {selection.map((question, i) => (
            // TODO: Next screens for answers
            <Text key={i} style={s.text}>
              {question}
            </Text>
          ))}
        </Animated.View>
      ) : null}
      {state === "recalling" ? (
        <Animated.View style={[styles.container, animatedStyle]}>
          <FlatList
            data={selection}
            renderItem={({ item }) => (
              <RecallingExercise
                fadeIn={fadeIn}
                fadeOut={fadeOut}
                question={item}
              />
            )}
          />
          <Pressable
            onPress={() => {
              fadeIn();
              setState("question");
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
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
    width: "85%",
    height: "85%",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
});
