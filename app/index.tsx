import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { s, colors } from "./styles";
import { supabase } from "../supabase";
import { Button } from "@rneui/themed";
import Timer from "./Timer";
import Recall from "@/components/Recall";

export default function Index() {
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
  return (
    <GestureHandlerRootView>
      <View style={s.container}>
        {!session && <Auth />}
        {session && (
          <View>
            {/* <Text style={{ color: colors.text }}>Welcome to Supabase</Text>
          <Button onPress={signOut}>Sign Out</Button> */}
            <Timer></Timer>
            <Recall></Recall>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
