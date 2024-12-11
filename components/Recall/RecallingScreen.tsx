import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "../../app/styles";
import Accordion from "./Accordion";

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
  useEffect(() => {
    fadeIn();
  }, []);
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
