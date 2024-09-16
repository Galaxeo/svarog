import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";
import { Toaster } from "./components/ui/sonner";
// import images from images folder
import beachStones from "../public/images/beach stones.jpg"; 
import beachWalkway from "../public/images/beach walkway.jpg";
import cityDaytime from "../public/images/city daytime.jpg";
import cityEvening from "../public/images/city evening.jpg";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Calendar className="" mode="multiple" selected={date} onSelect={setDate} /> */}
        <Timer duration={50} breakTime={10}></Timer>
      </ThemeProvider>
      <img className="studyBg" src={cityEvening} alt="beach stones" />
    </>
  );
}

export default App;
