import "./App.css";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const [date, setDate] = useState<Date[] | undefined>([]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1>Clare</h1>
        <p>不能再犹豫了...</p>
        {/* <Input />
        <Calendar mode="multiple" selected={date} onSelect={setDate} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
