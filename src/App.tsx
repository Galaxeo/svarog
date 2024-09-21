import "./App.css";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { useState } from "react";
import { Link, Route, Switch } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";
import Settings from "./Settings";
import LoginForm from "./components/LoginForm";
// import images from images folder
import beachStones from "/images/beach stones.jpg";
import beachWalkway from "/images/beach walkway.jpg";
import cityDaytime from "/images/city daytime.jpg";
import cityEvening from "/images/city evening.jpg";

function App() {
  const images = { beachStones, beachWalkway, cityDaytime, cityEvening }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Calendar className="" mode="multiple" selected={date} onSelect={setDate} /> */}
        <Timer duration={50} breakTime={10}></Timer>
        <Settings></Settings>
        {/* <LoginForm /> */}
      </ThemeProvider>
      <img className="studyBg" src={cityEvening} alt="beach stones" />
    </>
  );
}

export default App;
