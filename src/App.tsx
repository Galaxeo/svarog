import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { Link, Route, Switch } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import { Session, createClient } from "@supabase/supabase-js";
import Timer from "./components/Timer";
import Settings from "./Settings";
import key from "./key.json";
// import images from images folder
import beachStones from "/images/beach stones.jpg";
import beachWalkway from "/images/beach walkway.jpg";
import cityDaytime from "/images/city daytime.jpg";
import cityEvening from "/images/city evening.jpg";

const supabase = createClient(key.supabaseUrl, key.supabaseKey);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    })
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
    return () => subscription.unsubscribe();
  }, [])
    
  const images = { beachStones, beachWalkway, cityDaytime, cityEvening }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Calendar className="" mode="multiple" selected={date} onSelect={setDate} /> */}
        { session ? (
          <>
        <Timer duration={50} breakTime={10}></Timer>
        <Settings></Settings>
          </>
        ): (
          <h1>NO SESSION</h1>
        )}
        {/* <LoginForm /> */}
      </ThemeProvider>
      <img className="studyBg" src={cityEvening} alt="beach stones" />
    </>
  );
}

export default App;
