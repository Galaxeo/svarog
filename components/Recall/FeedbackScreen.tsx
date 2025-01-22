import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function FeedbackScreen(
  {
    userAnswers,
    questions,
    setRecall,
    userFeedback,
  }: any
) {
  // Screen to allow people to input how easy the question was
  // If it was wrong: set interval back to 1
  // Right has three levels: hard, good, and easy. Will update interval as necessary
  // Can use keyboard-double-arrow for icons
  const [dummy, setDummy] = useState<any>("");
  async function handleFeedbackSubmit(comfort: string) {
    console.log(comfort);
    // Get interval and change next date depending on comfort level
  }
  function displayQuestions() {
    const { width } = useWindowDimensions();
    if (Object.keys(userFeedback).length === 0) {
      return (
        <>
          <ActivityIndicator size="large" color={colors.text} />;
        </>)
    } else {
      // TODO: Add buttons, show if something was correct, add "your answer was"
      return (
        <>
          <FlatList
            style={{ height: "20%" }}
            data={Object.entries(userFeedback)}
            horizontal
            pagingEnabled
            bounces={false}
            keyExtractor={([key, value]) => key}
            renderItem={({ item: [key, value] }: { item: [string, any] }) => (
              <View style={[{ display: 'flex', flexDirection: "column", gap: 10, alignItems: 'center', justifyContent: "center" }, { width }]}>
                <Text style={styles.question} key={key}>{JSON.parse(key).question}</Text>
                <Text style={styles.answer}>{value.slice(4)}</Text>
                {value.charAt(0) == "C" && <MaterialIcons size={18} color={"aqua"} name={"check"} />}
                {value.charAt(0) == "H" && <MaterialIcons size={18} color={"yellow"} name={"question-mark"} />}
                {value.charAt(0) == "I" && <MaterialIcons size={18} color={colors.coralRed} name={"close"} />}
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => { handleFeedbackSubmit('easy') }}>
                    <MaterialIcons size={64} color={colors.coralRed} name={"square"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { handleFeedbackSubmit('good') }}>
                    <MaterialIcons size={64} color={"yellow"} name={"square"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { handleFeedbackSubmit('hard') }}>
                    <MaterialIcons size={64} color={"aqua"} name={"square"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
        </>
      )
    }
    // setRecall(false);
  }

  return (
    <>
      <View style={styles.overview}>
        {displayQuestions()}
        <TouchableOpacity activeOpacity={0.5}>
          {/*Think about replacing this with something else to not be same as incorrect*/}
          <MaterialIcons
            name="arrow-forward"
            onPress={() => {
              setRecall(false);
            }}
            size={48}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  overview: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
  },
  container: {
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
  question: {
    fontSize: 20,
    width: "90%",
    color: colors.text,
    textAlign: "center",
  },
  answer: {
    width: "90%",
    color: colors.text,
    textAlign: "center",
  }
});
