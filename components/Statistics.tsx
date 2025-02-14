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
  sessions
}: any) {
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]);
  const [sessionInfo, setSessionInfo] = useState<any>();
  // Obtain all sessions and put them into calendar, displaying information about the topic they studied, how long they studied, and questions they answered and status of those answers 
  // Lots of optimization can be done here: reducing load during of re-renders would be something to think about 
  // Next step tomorrow: async or wait for this to be loaded befor rendering
  let markedDatesObj: any = {};
  sessions.map((session: any) => {
    markedDatesObj[session.date] = { marked: true, dotColor: colors.text }
  })
  markedDatesObj[selected] = { selected: true, selectedColor: colors.text }

  function handleSelected(date: string) {
    const obtainSessionInfo = sessions.filter((session: any) => session.date === date);
    setSessionInfo(obtainSessionInfo);
    setSelected(date);
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={(day: any) => { handleSelected(day.dateString) }}
          // Include all days that have sessions here.
          markedDates={markedDatesObj}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.text,
            selectedDayTextColor: colors.background,
            monthTextColor: colors.text,
            dayTextColor: colors.darkGray2,
            todayTextColor: colors.text,
            textDayFontSize: 20,
          }}
          hideExtraDays
        />
        <Text style={s.text}>Statistics</Text>
        <Text style={s.text}>{sessionInfo.data}</Text>
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
    height: 325,
    width: 300,
  }
});
