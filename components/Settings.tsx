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
        {/* <MaterialIcons style={{ color: colors.text }} name="settings" size={48} /> */}
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Duration</Text>
          <View style={styles.settingInputs}>
            {/*TODO: Create style classes for duration buttons ALSO it may be a good idea to just do modals for settings instead of overlay.*/}
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(duration - 5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(duration - 1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={duration.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(duration + 1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(duration + 5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(short - 5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setDuration(short - 1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={short.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShort(short + 1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShort(short + 5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Long Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setLong(long - 5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setLong(long - 1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={long.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { setLong(long + 1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setLong(long + 5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}># of sessions before long break</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShortToLong(shortToLong - 5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShortToLong(shortToLong - 1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={shortToLong.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShortToLong(shortToLong + 1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { setShortToLong(shortToLong + 5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
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
    justifyContent: 'center',
    margin: 5,
  },
  settingInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    textAlign: 'center',
  },
  settingTextInput: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 36,
    width: 100,
  },
  settingTitle: {
    color: colors.text,
    width: "100%",
    fontSize: 16,
    textAlign: 'center',
  },
  settingDecrement: {
    color: '#FF746C',
    fontSize: 36,
  },
  settingIncrement: {
    color: 'aqua',
    fontSize: 36,
  },
  settingButton: {
    width: 50,
  }
});
