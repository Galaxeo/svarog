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
  setNotesInput,
  totalTime,
}: {
  topic: string;
  response: string;
  setPage: any;
  setNotesInput: any;
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
    sessionId: string,
    question: string,
  ) {
    const { data, error } = await supabase.from("questions").insert([
      {
        session_id: sessionId,
        user_id: userId,
        question: question,
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
  async function handleNotesSubmit(response: string) {
    // save to database
    setNotesInput(false);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    const sessionData = await sessionSubmitHelper(id);
    const sessionId = sessionData?.id;
    const questions = Array.from(response.split("|Ð|"));
    if (sessionId != null) {
      questions.forEach(async (question) => (await questionSubmitHelper(id, sessionId, question.trim())));
    }
  }
  function displayResponse(str: string) {
    if (str === "") {
      return (
        <ActivityIndicator size="small" color={colors.text} />
      )
    } else {
      // Response string has questions separated by comma
      const questions = Array.from(str.split("|Ð|"));
      return questions.map((question) => (
        <Text style={[s.text, styles.question]}>{question.trim()}</Text>
      ))
    }
  }
  return (
    <>
      {/* TODO: Change studied message styling for IOS/Androd*/}
      <View style={styles.studiedMessageCont}>
        <Text style={[s.text, styles.studiedMessage]}>
          You studied {topic} for {totalTime / 60} minutes!
        </Text>
        <Text style={[s.text, styles.studiedMessage]}>Here are the questions we have for you next time:
        </Text>
      </View>
      {/* <Text style={s.text}>{response}</Text> */}
      {/* TODO: Think about possibly allowing for more than one input*/}
      <View style={styles.questionContainer}>
        {displayResponse(response)}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <MaterialIcons
          onPress={() => setPage(0)}
          name="edit"
          size={24}
          color={colors.text}
        />
        <MaterialIcons
          onPress={() => { handleNotesSubmit(response) }}
          name="check"
          size={24}
          color={colors.text}
        />
      </View>
    </>
  );
}

export default function NotesInput({
  setNotesInput,
  totalTime,
}: {
  setNotesInput: any;
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
  //   // setNotesInput(false);
  //   setPage(1);
  // }
  const handleGenerateText = async () => {
    if (topicName === "") {
      alert("Please enter a topic name!");
      return;
    }
    else if (prompt === "") {
      alert("Please enter some notes!");
      return;
    }
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
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity>
              <MaterialIcons
                onPress={handleGenerateText}
                name="check"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => setNotesInput(false)}
                name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {page === 1 && (
        <View style={styles.container}>
          <DisplayNotes
            topic={topicName}
            response={response}
            setPage={setPage}
            setNotesInput={setNotesInput}
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
    // Is this best way to do this?
    width: Platform.OS === "web" ? "20%" : "50%",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    padding: 10,
  },
  input: {
    color: colors.text,
    height: "30%",
    margin: 12,
    width: Platform.OS === "web" ? "50%" : "70%",
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    margin: 10,
    overflow: 'hidden',
    width: Platform.OS === "web" ? "50%" : "80%",
  },
  question: {
  },
  studiedMessageCont: {
    width: Platform.OS === "web" ? "50%" : "80%",
  },
  studiedMessage: {
    textAlign: 'center',
  },
});
