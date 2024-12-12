import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { s, colors } from "@/app/styles";
import { Button } from "@rneui/themed";
import generateText from "@/openai";
import { ChatCompletion } from "openai/resources";
function DisplayNotes({ setPage }: { setPage: any }) {
  return (
    <>
      <Text style={s.text}>Notes</Text>
      <MaterialIcons
        onPress={() => setPage(0)}
        name="edit"
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
  completedSessions: number;
}) {
  const [prompt, setPrompt] = useState("");
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
          <Text style={s.text}>
            Copy-paste your notes or input what topic you studied
          </Text>
          <TextInput
            style={styles.input}
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
            multiline
            numberOfLines={8}
          />
          <Text style={s.text}>{response}</Text>
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
          <DisplayNotes setPage={setPage} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    color: colors.text,
    height: 40,
    margin: 12,
    width: "80%",
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
