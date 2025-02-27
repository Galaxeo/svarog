// Prompt element allowing people to enter in goal and current durability
import { Text, View, StyleSheet, Touchable, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// TODO: Setup database for goals: keep track of current duration, goal duration, interval at which we should increase speed.

export default function DynamicAssist({
  interval,
  setInterval,
  setDuration,
  setShort
}: any) {

  const [comfort, setComfort] = useState("");
  const [pace, setPace] = useState("");
  const [goal, setGoal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [prelim, setPrelim] = useState(0);
  const [screen, setScreen] = useState(0);

  function settingsTextChange(setter: any, newValue: string) {
    if (newValue == "" || parseInt(newValue) <= 0) {
      setter(0);
    } else if (parseInt(newValue) > 999) {
      alert("Value cannot be greater than 999!");
      return;
    }
    else {
      setter(parseInt(newValue));
    }
  }

  function dynamicTimeIntro(pace: string) {
    // give an estimate of how long it will take to reach that goal
    if (pace == "fast") {
      setInterval(7);
    } else if (pace == "normal") {
      setInterval(5);
    } else if (pace == "slow") {
      setInterval(3);
    }
    // Supabase insert here
  }

  function dynamicTimeSetter({
    setDynamic,
    currentDuration,
    setCurrentDuration,
    setShort,
    goal,
    comfort,
  }: any) {

    // set a goal, after you set that goal, ask how it went. slowly bump up by interval until goal is reached, use 25/5 as a baseline for how much break to give.
    // Long breaks should be set by the user, default 20-25 is enough. We can create presets for pomodoro timer later for people who don't know what to use.
    if (currentDuration >= goal) {
      setDynamic(false);
      return;
    }
    // Need to change these intervals to be dynamic as well
    comfort == "easy" ? setCurrentDuration(currentDuration + 10) : comfort == "medium" ? setCurrentDuration(currentDuration + 5) : null;
    const shortBreak = Math.ceil(currentDuration / 5);
    setShort(shortBreak);
  }

  return (
    <View style={styles.container}>
      {screen == 0 ?
        <>
          <Text style={s.text}>
            Dynamic Timer Assistant
          </Text>
          <View style={styles.dtaPrompts}>
            <TextInput keyboardType="numeric" placeholder={'how long currently?'} placeholderTextColor={colors.darkGray3} style={styles.prompt} />
            <TextInput keyboardType="numeric" placeholder={'goal?'} placeholderTextColor={colors.darkGray3} style={styles.prompt} />
            <Text style={s.text}>On a {pace} pace, it will take {(goal - current) / interval} days to hit your goal!</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={() => { dynamicTimeIntro('slow') }}>
                <Text style={{ color: colors.coralRed, fontSize: 48 }}>😓</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { dynamicTimeIntro('normal') }}>
                <Text style={{ color: "yellow", fontSize: 48 }}>😐</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { dynamicTimeIntro('fast') }}>
                <Text style={{ color: "aqua", fontSize: 48 }}>😄</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => { setScreen(1) }}>
            <MaterialIcons name="arrow-forward" color={colors.text} size={32} />
          </TouchableOpacity>
        </>
        :
        <>
          <Text style={s.text}>
            Dynamic Timer Assistant
          </Text>
          <TouchableOpacity onPress={() => { setScreen(0) }}>
            <MaterialIcons name="arrow-back" color={colors.text} size={32} />
          </TouchableOpacity>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  prompt: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 18,
    width: 400,
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
  dtaPrompts: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 15,
  }
});
