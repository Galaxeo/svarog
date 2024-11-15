import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Auth from "@/components/login";
import { Session } from "@supabase/supabase-js";

import { s, colors } from "./styles";
import { supabase } from "../supabase";

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
  return (
    <View style={s.container}>
      {!session ? (
        <Auth />
      ) : (
        <Text style={{ color: colors.text }}>Welcome to Project Svarog</Text>
      )}
    </View>
  );
}
