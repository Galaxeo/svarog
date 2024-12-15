import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { supabase } from "@/supabase";

import { s, colors } from "@/app/styles";
import { Button } from "@rneui/themed";
import generateText from "@/openai";
import { ChatCompletion } from "openai/resources";
function DisplayNotes({
  topic,
  response,
  setPage,
  setIsNotesInput,
  totalTime,
}: {
  topic: string;
  response: string;
  setPage: any;
  setIsNotesInput: any;
  totalTime: number;
}) {
  async function sessionSubmitHelper(userId: string | undefined) {
    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          user_id: userId,
          duration: totalTime,
          date: new Date(),
          topic: topic,
        },
      ])
      .select()
      .single();
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  }
  async function questionSubmitHelper(
    userId: string | undefined,
    sessionId: string
  ) {
    const { data, error } = await supabase.from("questions").insert([
      {
        session_id: sessionId,
        user_id: userId,
        question: response,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  }
  async function handleNotesSubmit() {
    // save to database
    // TODO: Perhaps want to think about saving topic w/ question?
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    const sessionData = await sessionSubmitHelper(id);
    const sessionId = sessionData?.id;
    const questionData = await questionSubmitHelper(id, sessionId);
    setIsNotesInput(false);
  }
  return (
    <>
      <Text style={s.text}>
        You studied {topic} for {totalTime}! Here are the questions we generated
        for you next time:
      </Text>
      <Text style={s.text}>{response}</Text>
      <MaterialIcons
        onPress={() => setPage(0)}
        name="edit"
        size={24}
        color={colors.text}
      />
      <MaterialIcons
        onPress={handleNotesSubmit}
        name="check"
        size={24}
        color={colors.text}
      />
    </>
  );
}

export default function NotesInput({
  setIsNotesInput,
  totalTime,
}: {
  setIsNotesInput: any;
  totalTime: number;
}) {
  const [prompt, setPrompt] = useState("");
  const [topicName, setTopicName] = useState("");
  const [response, setResponse] = useState("");
  const [page, setPage] = useState(0);
  function handleGenerateText() {
    // dummy data to avoid API call limit
    const text = "This is a test";
    setResponse(text);
    // setIsNotesInput(false);
    setPage(1);
  }
  //   const handleGenerateText = async () => {
  //     try {
  //       const text = await generateText(prompt);
  //       setResponse(text);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <>
      {page === 0 && (
        <View style={styles.container}>
          <Text style={s.text}>Topic:</Text>
          <TextInput
            multiline
            editable
            style={styles.topicInput}
            value={topicName}
            placeholder={"Enter topic name"}
            placeholderTextColor={"gray"}
            onChangeText={(text) => setTopicName(text)}
          />
          <Text style={s.text}>Notes:</Text>
          <TextInput
            multiline
            editable
            style={styles.input}
            value={prompt}
            placeholder={"Copy-paste or enter here"}
            placeholderTextColor={"gray"}
            onChangeText={(text) => setPrompt(text)}
          />
          <TouchableOpacity>
            <MaterialIcons
              onPress={handleGenerateText}
              name="check"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      )}
      {page === 1 && (
        <View style={styles.container}>
          <DisplayNotes
            topic={topicName}
            response={response}
            setPage={setPage}
            setIsNotesInput={setIsNotesInput}
            totalTime={totalTime}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topicInput: {
    color: colors.text,
    height: 40,
    margin: 12,
    width: "20%",
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
  input: {
    color: colors.text,
    height: "30%",
    margin: 12,
    width: "50%",
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
  topicInputIos: {
    color: colors.text,
    height: 40,
    margin: 12,
    width: "20%",
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
  inputIos: {
    color: colors.text,
    height: "30%",
    margin: 12,
    width: "50%",
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
});
