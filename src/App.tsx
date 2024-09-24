import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Session, createClient } from "@supabase/supabase-js";
import Timer from "./components/Timer";
import Settings from "./Settings";
import key from "./key.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import images from images folder
import beachStones from "/images/beach stones.jpg";
import beachWalkway from "/images/beach walkway.jpg";
import cityDaytime from "/images/city daytime.jpg";
import cityEvening from "/images/city evening.jpg";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const supabase = createClient(key.supabaseUrl, key.supabaseKey);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [settings, setSettings] = useState(false);
  // Need to pass supabase to the loginform component in settings
  
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
        <Timer duration={50} breakTime={10} setSettings={setSettings}></Timer>
        {settings ? (
        <Settings setSession={setSession} session={session} setSettings={setSettings}></Settings>
        ) : 
        (<></>) 
        }
      </ThemeProvider>
      <img className="studyBg" src={cityEvening} alt="beach stones" />
    </>
  );
}

export default App;
