import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { supabase } from "@/supabase";
import { Platform } from "react-native";

import { s, colors } from "@/app/styles";
import generateText from "@/openai";

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
      alert("Error submitting sessions, not on our end!");
      console.error(error);
      return null;
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
      alert("Error submitting questions, not on our end!");
      console.error(error);
      return null;
    } else {
      return data;
    }
  }
  async function handleNotesSubmit() {
    // save to database
    setIsNotesInput(false);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    const sessionData = await sessionSubmitHelper(id);
    const sessionId = sessionData?.id;
    if (sessionId != null) {
      const questionData = await questionSubmitHelper(id, sessionId);
    }
  }
  function displayResponse(str: string) {
    if (str === "") {
      return (
        <ActivityIndicator size="large" color={colors.text} />
      )
    } else {
      // Response string has questions separated by comma
      const questions = Array.from(str.split(","));
      return questions.map((question) => (
        <Text style={[s.text, styles.question]}>{question}</Text>
      ))
    }
  }
  return (
    <>
      {/* TODO: Change studied message styling for IOS/Androd*/}
      <View>
        <Text style={s.text}>
          You studied {topic} for {totalTime / 60} minutes! Here are the questions we have for you next time:
        </Text>
      </View>
      {/* <Text style={s.text}>{response}</Text> */}
      {/* TODO: BlurView on Android testing */}
      <BlurView intensity={30} tint="systemUltraThinMaterialDark" style={styles.questionContainer}>
        {displayResponse(response)}
      </BlurView>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
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
      </View>
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
  // function handleGenerateText() {
  //   // dummy data to avoid API call limit
  //   const text = "This is a test";
  //   setResponse(text);
  //   // setIsNotesInput(false);
  //   setPage(1);
  // }
  // TODO: Have to figure out how to deal with multiple questions (submission in supabase and formatting the questions themselves)
  const handleGenerateText = async () => {
    try {
      setPage(1);
      const text = await generateText(prompt);
      setResponse(text);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {page === 0 && (
        <View style={styles.container}>
          {(Platform.OS === "ios" || Platform.OS === "android") && (
            <>
              <Text style={s.text}>Topic:</Text>
              <TextInput
                multiline
                editable
                style={styles.topicInputMobile}
                value={topicName}
                placeholder={"Enter topic name"}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setTopicName(text)}
              />
              <Text style={s.text}>Notes:</Text>
              <TextInput
                multiline
                editable
                style={styles.inputMobile}
                value={prompt}
                placeholder={"Copy-paste or enter here"}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setPrompt(text)}
              />
            </>
          )}
          {
            Platform.OS === 'web' && <>
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
            </>
          }
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
    borderRadius: 5,
    padding: 10,
  },
  input: {
    color: colors.text,
    height: "30%",
    margin: 12,
    width: "50%",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    padding: 10,
  },
  topicInputMobile: {
    color: colors.text,
    height: 40,
    margin: 12,
    width: "40%",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    padding: 10,
  },
  inputMobile: {
    color: colors.text,
    height: "30%",
    margin: 12,
    width: "70%",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
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
  questionContainer: {
    display: "flex",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    gap: 10,
    padding: 10,
    margin: 10,
    overflow: 'hidden',
  },
  question: {
  }
});
