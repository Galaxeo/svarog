import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";

import { s, colors } from "@/app/styles";
import generateText from "@/openai";

export default function Settings({
  duration,
  setDuration,
  short,
  setShort,
  long,
  setLong,
  shortToLong,
  setShortToLong,
  setSettings,
}: {
  duration: string;
  setDuration: any;
  short: number;
  setShort: any;
  long: number;
  setLong: any;
  shortToLong: number;
  setShortToLong: any;
  setSettings: any;
}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: colors.text, fontSize: 24 }}>Settings</Text>
        <TextInput
          defaultValue={duration.toString()}
          style={styles.input}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity>
            <MaterialIcons
              onPress={() => {
                setSettings(false);
              }}
              name="arrow-back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // TODO: Change for settings page
  input: {
    color: colors.text,
    height: 20,
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
});
