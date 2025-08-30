import React from "react";
import About from "../sections/About";
import Rules from "../sections/Rules";
import Hero from "../sections/Hero";
import Task from "../sections/Task";
import Prizes from "../sections/Prizes";
import Footer from "../components/Footer";
import Leaderboard from "../sections/leaderboard";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Task />
      <Rules />
      <Prizes />
      <Leaderboard />
    </>
  );
}
