import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";

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
    return answers.map((answer: any, index: number) => (
      <View key={index}>
        <Text style={{ color: colors.text }}>{answer.answer}</Text>
      </View>
    ));
  }

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
      {answers && showAnswers()}
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
