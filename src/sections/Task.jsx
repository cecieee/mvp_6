import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import GridBackground from "../components/GridBackground.jsx";

export default function Task() {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate("/tasks");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 0);
  };

  return (
    <section className="pb-17.5 bg-white relative overflow-hidden py-20">
      <GridBackground opacity={0.3} zIndex={0} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 px-2 sm:px-0"
          style={{
            fontFamily: "Frontline, system-ui, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          EXPLORE TASKS
        </h2>
        <p
          className="text-xl md:text-2xl mb-8 text-[#4B3791] font-semibold"
          style={{ fontFamily: "JerseyM54, sans-serif" }}>
          Discover exciting challenges and showcase your skills!
        </p>

        <button
          onClick={handleViewTasks}
          className="group px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer">
          <span className="relative z-10">View Tasks</span>
          <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
