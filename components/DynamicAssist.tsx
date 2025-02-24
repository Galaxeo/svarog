// Prompt element allowing people to enter in goal and current durability
import { Text, View, StyleSheet, Touchable, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import dynamicTimeSetter from "./dynamicTime";

export default function DynamicAssist({
  setDuration,
  setShort
}: any) {

  return (
    <View>
      <Text style={s.text}>
        Dynamic Timer Assistant
      </Text>
      <TextInput keyboardType="numeric" style={styles.prompt} />
    </View>
  )
}

const styles = StyleSheet.create({
  timerCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 0,
    width: "100%",
    height: "auto",
    zIndex: 1,
    elevation: 1,
  },
  button: {
    color: colors.background,
    padding: 10,
    borderRadius: 10,
  },
  clockCont: {
    outline: '1rem solid red',
  },
  clock: {
    margin: 50,
    fontSize: 100,
  },
  header: {
    fontSize: 30,
  },
  prompt: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 36,
    width: 100,
  },
});
