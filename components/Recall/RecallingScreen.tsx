import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";

export default function RecallingScreen({
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
  const [answers, setAnswers] = useState<any>();
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    fadeIn();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // We want to fetch the answers for each question
      const dbAnswers = await supabase.from("answers").select("*").eq("user_id", user?.id).eq("question_id", questionObj.id);
      setAnswers(dbAnswers.data);
    }
    fetchData().catch(console.error);
  }, [])

  // Now need a place to show answers
  function showAnswers() {
    // TODO: Add button that shows previous answers
    setShowing(!showing);
    if (!answers || answers.length === 0) {
      setShowing(false);
      alert("No answers found for this question");
    }
  }

  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <View style={{ display: 'flex', flexDirection: "row", gap: 10, alignItems: 'center', justifyContent: "center" }}>
        <Text style={s.text}>{questionObj.question}?</Text>
        <TouchableOpacity>
          {/* Consider changing the icons here to something that makes more sense? */}
          <MaterialIcons name={showing ? "keyboard-double-arrow-up" : "question-answer"} color={colors.text} size={18} onPress={showAnswers}></MaterialIcons>
        </TouchableOpacity>
      </View>
      {showing && answers && answers.length > 0 && answers.map((answer: any, index: number) => (
        <View key={index} style={{ display: 'flex', flexDirection: "row", gap: 5, alignItems: 'center', justifyContent: "center", maxWidth: "90%" }}>
          {answer.status == "Y" ? <MaterialIcons size={18} color={"aqua"} name={"check"} /> : <MaterialIcons size={18} color={colors.coralRed} name={"close"} />}
          <Text style={{ color: colors.text }}>{answer.answer}</Text>
        </View>))}
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
