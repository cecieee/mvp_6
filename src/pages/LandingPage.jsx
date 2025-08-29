import React from "react";
import About from "../sections/About";
import Rules from "../sections/Rules";
import Hero from "../sections/Hero";
import Task from "../sections/Task";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Task />
      <Rules />
      <Footer />
    </>
  );
}
