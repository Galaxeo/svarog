import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";

import { s, colors } from "@/app/styles";
import { Button } from "@rneui/themed";
import generateText from "@/openai";
import { ChatCompletion } from "openai/resources";

export default function NotesInput({
  setIsNotesInput,
}: {
  setIsNotesInput: any;
}) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  function handleGenerateText() {
    // dummy data to avoid API call limit
    const text = "This is a test";
    setResponse(text);
    setIsNotesInput(false);
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
    <View style={styles.container}>
      <Text style={s.text}>
        Copy-paste your notes or input what topic you studied
      </Text>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={(text) => setPrompt(text)}
      />
      <Button onPress={handleGenerateText}>Generate Text</Button>
      <Text style={s.text}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: colors.text,
    height: 40,
    margin: 12,
    borderWidth: 1,
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
