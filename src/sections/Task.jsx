import React from "react";
import { useNavigate } from "react-router-dom";

export default function Task() {
  const navigate = useNavigate();

  const handleExploreTask = () => {
    navigate("/tasks");
  };

  return (
    <section className="py-17.5 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(0,0,0,0.08) 0px,
              rgba(0,0,0,0.08) 1.5px,
              transparent 1.5px,
              transparent 64px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.08) 0px,
              rgba(0,0,0,0.08) 1.5px,
              transparent 1.5px,
              transparent 64px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            fontFamily: "Frontline, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Explore Tasks
        </h2>
        <p 
          className="text-xl md:text-2xl mb-8 text-[#4B3791] font-semibold"
          style={{ fontFamily: "JerseyM54, sans-serif" }}
        >
          Discover exciting challenges and showcase your skills
        </p>
        
        <button 
          onClick={handleExploreTask}
          className="group px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <span className="relative z-10">View Tasks</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
