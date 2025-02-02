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
import checkAnswer from "@/openai";
export default function Review({
  questionObj,
  setState
}: any) {
  const [answer, setAnswer] = useState("");
  async function handleAnswerSubmit(answer: any) {

    // Putting this up here makes the UI more responsive
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    const prompt =
      "Question: " + questionObj.question + ", Answer: " + answer;
    // TODO: REENABLE after testing feedback screen
    // const correctStatus = await checkAnswer(prompt);
    const correctStatus = "C|Ð|test feedback";
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

    // const { data, error } = await supabase
    //   .from("answers")
    //   .insert([{ user_id: id, answers: userAnswers }]);
    return correctStatus;
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={s.text}>{questionObj.question}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAnswer(text)}
          multiline
          numberOfLines={8}
        />
      </View>
      <View style={s.buttonRow}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" color={colors.text} size={18} onPress={() => setState("question")}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="arrow-forward" color={colors.text} size={18} onPress={() => handleAnswerSubmit(answer)}></MaterialIcons>
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 'auto',
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
  },
  input: {
    color: colors.text,
    height: 100,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
});
