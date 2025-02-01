import {
  Text,
  TextInput,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";
export default function Review({
  questionObj,
  setState
}: any) {
  console.log(questionObj);
  return (
    <>
      <View>
        <Text style={s.text}>{questionObj.question}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="arrow-back" color={colors.text} size={18} onPress={() => setState("question")}></MaterialIcons>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
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
});
