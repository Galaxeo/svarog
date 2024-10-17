import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Session, createClient } from "@supabase/supabase-js";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
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
  const [duration, setDuration] = useState(25);
  const [shortBreak, setShort] = useState(5);
  const [longBreak, setLong] = useState(20);
  const [shortToLong, setShortToLong] = useState(4)
  const settingsProps = {
    session,
    setSession,
    setSettings,
    duration,
    setDuration,
    shortBreak,
    setShort,
    longBreak,
    setLong,
    shortToLong,
    setShortToLong
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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
        {/* <Timer duration={duration} short={shortBreak} long={longBreak} shortToLong={shortToLong} setSettings={setSettings}></Timer> */}
        <Timer duration={.05} short={.1} long={longBreak} shortToLong={shortToLong} setSettings={setSettings}></Timer>
        {settings ? (
          <Settings {...settingsProps}></Settings>
        ) :
          (<></>)
        }
      </ThemeProvider>
      <img className="studyBg" src={cityEvening} alt="beach stones" />
    </>
  );
}

export default App;
