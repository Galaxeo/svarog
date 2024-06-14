import "./App.css";
import { Input } from "@/components/ui/input";
import { Calendar } from "./components/ui/calendar";
import { useState } from "react";

function App() {
  const [date, setDate] = useState<Date[] | undefined>([]);
  return (
    <>
      <h1>Clare</h1>
      <p>不能再犹豫了...</p>
      <Input />
      <Calendar mode="multiple" selected={date} onSelect={setDate} />
    </>
  );
}

export default App;
