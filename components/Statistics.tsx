import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { s, colors } from "@/app/styles";
import { supabase } from "@/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { checkAnswer } from "@/openaiWeb";

function Statistics({
  userData
}: any) {
  return (
    <><Text></Text></>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 'auto',
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 2,
    width: "80%"
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
