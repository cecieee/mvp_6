import React from "react";
import { useNavigate } from "react-router-dom";

export default function Task() {
  const navigate = useNavigate();

  const handleExploreTask = () => {
    navigate("/tasks");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <section className="pb-17.5 bg-white relative overflow-hidden py-20">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: "Hypik, system-ui, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          exPLORE TASKS
        </h2>
        <p
          className="text-xl md:text-2xl mb-8 text-[#4B3791] font-semibold"
          style={{ fontFamily: "JerseyM54, sans-serif" }}
        >
          Discover exciting challenges and showcase your skills
        </p>

        <button
          onClick={handleExploreTask}
          className="group px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
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
