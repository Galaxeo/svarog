import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { checkAnswer } from "@/openaiWeb";

export default function Statistics({
  userData
}: any) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={(day: any) => { console.log('selected day', day) }}
          // mess around with this tommorrow
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: "gray",
            selectedDayTextColor: colors.text,
          }}
        />
        <Text style={s.text}>Statistics</Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
    height: '85%',
    width: "100%"
  },
  input: {
    color: colors.text,
    height: 100,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    borderColor: colors.text,
    padding: 10,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.backgroundTransparent,
    zIndex: 2,
    elevation: 2,
  },
  calendar: {
    borderWidth: 1,
    borderColor: colors.text,
  }
});
