import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { s, colors } from "./styles";
import { supabase } from "../supabase";
import { Button } from "@rneui/themed";
import Timer from "./Timer";
import Recall from "@/components/NotesInput";

export default function Index() {
  // const dummyData = {
  //   date: "2024-11-22",
  //   duration: 60,
  //   id: "id",
  //   topic: "Computers",
  //   user_id: "user_id",
  // };
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  async function signOut() {
    await supabase.auth.signOut();
  }
  async function testFunction() {
    // test supabase database
    // TODO: This requires perms, need to figure out how to allow regular users to see a certain table but not have complete access to the rest of the database. security concerns here.
    const { data, error } = await supabase.from("sessions").select();
    if (error) {
      console.log("error", error);
    }
    if (data) {
      console.log("data", data);
    }
  }
  return (
    <GestureHandlerRootView>
      {!session && (
        <View style={s.container}>
          <Auth />
        </View>
      )}
      {session && (
        <View style={s.container}>
          {/* <Text style={{ color: colors.text }}>Welcome to Supabase</Text>
          <Button onPress={signOut}>Sign Out</Button> */}
          <Timer></Timer>
        </View>
      )}
    </GestureHandlerRootView>
  );
}
