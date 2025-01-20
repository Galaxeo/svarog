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

import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";


// TODO: Sync settings with user data (supabase)
// TODO: Fix values for lengths to change along with buttons and text input

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
  // Functions to handle changing settings
  function durationChange(diff: number) {
    // maybe warning if duration is too high?
    if (duration + diff <= 0) {
      if (duration == 1) {
        alert("Sessions cannot be shorter than 1 minute!");
      }
      setDuration(1);
      return;
    } else {
      setDuration(duration + diff);
    }
  }
  function shortBreakChange(diff: number) {
    if (short + diff <= 0) {
      if (short == 1) {
        alert("Breaks cannot be shorter than 1 minute!")
      }
      setShort(1);
      return;
    } else {
      setShort(short + diff);
    }
  }
  function shortToLongChange(diff: number) {
    if (shortToLong + diff <= 1) {
      if (shortToLong == 2) {
        alert("Cannot have less than 2 sessions before long break!")
      }
      setShortToLong(2);
      return;
    } else {
      setShortToLong(shortToLong + diff);
    }
  }
  function longBreakChange(diff: number) {
    if (long + diff <= 0) {
      if (long == 1) {
        alert("Breaks cannot be shorter than 1 minute")
      } setLong(1);
      return;
    } else {
      if ((long + diff) <= short) {
        alert("Keep your long breaks longer than your short breaks!")
        return;
      }
      setLong(long + diff);
    }
  }

  async function handleBack() {
    // save settings and go back
    setSettings(false);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const update = await supabase.from("settings").upsert({ id: user?.id, duration: duration, short: short, long: long, shortToLong: shortToLong });
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: colors.text, fontSize: 36 }}>Settings</Text>
        {/* <MaterialIcons style={{ color: colors.text }} name="settings" size={48} /> */}
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Session Length</Text>
          <View style={styles.settingInputs}>
            {/*TODO: Create style classes for duration buttons ALSO it may be a good idea to just do modals for settings instead of overlay.*/}
            <TouchableOpacity style={styles.settingButton} onPress={() => { durationChange(-5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { durationChange(-1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={duration.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { durationChange(1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { durationChange(5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortBreakChange(-5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortBreakChange(-1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={short.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortBreakChange(1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortBreakChange(5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}># of sessions before long break</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortToLongChange(-5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortToLongChange(-1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={shortToLong.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortToLongChange(1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { shortToLongChange(5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Long Break Length</Text>
          <View style={styles.settingInputs}>
            <TouchableOpacity style={styles.settingButton} onPress={() => { longBreakChange(-5) }}>
              <Text style={styles.settingDecrement}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { longBreakChange(-1) }}>
              <Text style={styles.settingDecrement}>-1</Text>
            </TouchableOpacity>
            <TextInput
              defaultValue={long.toString()}
              style={styles.settingTextInput}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.settingButton} onPress={() => { longBreakChange(1) }}>
              <Text style={styles.settingIncrement}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={() => { longBreakChange(5) }}>
              <Text style={styles.settingIncrement}>+5</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity>
            <MaterialIcons
              onPress={() => {
                handleBack();
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
    color: colors.coralRed,
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
