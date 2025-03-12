import { Text, View, StyleSheet, Touchable } from "react-native";
import { useState, useEffect, useRef } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { s, colors } from "@/app/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, TouchableOpacity } from "react-native";
import NotesInput from "@/components/NotesInput";
import Recall from "@/components/Recall/Recall";
import Settings from "@/components/PomodoroSettings";
import Statistics from "@/components/Statistics";
import DynamicAssist from "@/components/DynamicAssist";
import { supabase } from "@/supabase";
import { useAudioPlayer } from 'expo-audio'

const notificationSound = require("@/assets/notification.mp3");

export default function FreeTimer() {
  return (
    <View>
    </View>
  )
}
