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
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
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
    //     }
    //   ]);
    // } else {
    //   alert("Error submitting answer");
    // }

    // const { data, error } = await supabase
    //   .from("answers")
    //   .insert([{ user_id: id, answers: userAnswers }]);
    setGrade(correctStatus.split("|")[0]);
    setFeedback(correctStatus.split("|")[2]);
    return correctStatus;
  }
  async function handleFeedbackSubmit(comfort: string) {
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={s.text}>{questionObj.question}</Text>
        {!feedback ?
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAnswer(text)}
            multiline
            numberOfLines={8}
          /> :
          <>
            <View style={[s.buttonRow, { gap: 15 }]}>
              {grade == "C" && <MaterialIcons size={18} color={"aqua"} name={"check"} />}
              {grade == "H" && <MaterialIcons size={18} color={"yellow"} name={"question-mark"} />}
              {grade == "I" && <MaterialIcons size={18} color={colors.coralRed} name={"close"} />}
              <Text style={s.text}>{feedback}</Text>
            </View>
            <Text style={s.text}>Difficulty:</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={() => { handleFeedbackSubmit('hard') }}>
                <Text style={{ color: colors.coralRed, fontSize: 48 }}>😓</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleFeedbackSubmit('good') }}>
                <Text style={{ color: "yellow", fontSize: 48 }}>😐</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleFeedbackSubmit('easy') }}>
                <Text style={{ color: "aqua", fontSize: 48 }}>😄</Text>
              </TouchableOpacity>
            </View>
          </>}
      </View>
      {!feedback ?
        <View style={s.buttonRow}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" color={colors.text} size={18} onPress={() => setState("question")}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="arrow-forward" color={colors.text} size={18} onPress={() => handleAnswerSubmit(answer)}></MaterialIcons>
          </TouchableOpacity>
        </View> :
        <View style={s.buttonRow}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-forward" color={colors.text} size={18} onPress={() => setState("question")}></MaterialIcons>
          </TouchableOpacity>
        </View>
      }
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
    width: "80%"
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
