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
  duration: number;
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
        <Text style={{ color: colors.text, fontSize: 36 }}>Settings</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Duration</Text>
          <View style={styles.settingInputs}>
            {/*TODO: Create style classes for duration buttons*/}
            <TouchableOpacity onPress={() => { setDuration(duration - 5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(duration - 1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            {/*TODO: Figure out what to do with direct text input, maybe premium option?*/}
            <TextInput
              defaultValue={duration.toString()}
              style={s.text}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => { setDuration(duration + 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(duration + 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Short Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity onPress={() => { setShort(short - 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShort(short - 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={short.toString()}
              style={s.text}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => { setShort(short + 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShort(short + 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Long Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity onPress={() => { setLong(long - 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setLong(long - 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={long.toString()}
              style={s.text}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => { setLong(long + 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setLong(long + 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}> # of sessions before long break</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity onPress={() => { setShortToLong(shortToLong - 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShortToLong(shortToLong - 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={shortToLong.toString()}
              style={s.text}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => { setShortToLong(shortToLong + 1) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShortToLong(shortToLong + 5) }}>
              <Text style={{ color: colors.text, fontSize: 18 }}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    width: 50,
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
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    margin: 5,
  },
  settingInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 16,
  },
  settingDecrement: {
    color: colors.text,
    fontSize: 18,
  }
});
