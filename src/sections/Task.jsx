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
    <section className="pb-17.5 bg-white relative overflow-hidden">
      {/* Particle dots matching Hero theme */}
      {Array.from({ length: 15 }).map((_, i) => {
        const baseX =
          (((i * 7 + 10) % 100) / 100) *
          (typeof window !== "undefined" ? window.innerWidth : 1200);
        const baseY =
          (((i * 11 + 15) % 100) / 100) *
          (typeof window !== "undefined" ? window.innerHeight : 800);
        const scale = 1 + (i % 3) * 0.2;
        const glowIntensity = 12 + (i % 5) * 8;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full transition-all duration-200 ease-out animate-pulse"
            style={{
              left: `${baseX}px`,
              top: `${baseY}px`,
              animationDelay: `${i * 0.12}s`,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${glowIntensity}px #7152DE`,
              background: "#7152DE",
              filter: `blur(${(i % 4) * 0.4}px)`,
            }}
          />
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const baseTop =
          (((i * 13 + 20) % 90) / 100) *
          (typeof window !== "undefined" ? window.innerHeight : 800);
        const baseLeft =
          (((i * 17 + 25) % 90) / 100) *
          (typeof window !== "undefined" ? window.innerWidth : 1200);
        const scale = 1 + (i % 4) * 0.15;
        const rotation = (i % 6) * 15;
        return (
          <div
            key={`floating-${i}`}
            className="absolute w-3 h-3 rounded-full animate-ping transition-all duration-200 ease-out"
            style={{
              top: `${baseTop}px`,
              left: `${baseLeft}px`,
              animationDelay: `${i * 0.18}s`,
              animationDuration: `${2.5 + i * 0.15}s`,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              opacity: 0.5,
              background: "#4B3791",
              boxShadow: "0 0 20px #4B3791",
            }}
          />
        );
      })}

      {/* Matrix lines */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-[#7152DE] to-transparent animate-pulse transition-all duration-500 ease-out"
            style={{
              left: `${i * 5 + 2}%`,
              height: "100%",
              animationDuration: `${4 + i * 0.2}s`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.03,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center md:mt-[15vw] lg:mt-0 relative z-10">
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
