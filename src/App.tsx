import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";

function App() {
  // const [date, setDate] = useState<Date[] | undefined>([]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1 className="header">Clare</h1>
        <p>不能再犹豫了...</p>
        {/* <Calendar className="" mode="multiple" selected={date} onSelect={setDate} /> */}
        <Timer duration={50} breakTime={10}></Timer>
      </ThemeProvider>
    </>
  );
}

export default App;
