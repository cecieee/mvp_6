import React from "react";
import { toast } from "react-toastify";
import { FiClock } from "react-icons/fi";
import GridBackground from "../components/GridBackground.jsx";

export default function Task() {
  const handleTasksComingSoon = () => {
    toast(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FiClock size={20} />
        <span>Tasks will be available soon!</span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
        style: {
          background: "linear-gradient(135deg, #7152DE 0%, #4B3791 100%)",
          color: "white",
          borderRadius: "12px",
          fontSize: window.innerWidth < 640 ? "14px" : "16px",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: "500",
          boxShadow: "0 10px 30px rgba(113, 82, 222, 0.3)",
          border: "none",
          margin: window.innerWidth < 640 ? "0 16px" : "0 24px",
          maxWidth: window.innerWidth < 640 ? "calc(100vw - 32px)" : "400px",
          width: "100%",
        },
        progressClassName: "white-progress",
        icon: false,
      }
    );
  };

  return (
    <section className="pb-17.5 bg-white relative overflow-hidden py-20">
      <GridBackground opacity={0.3} zIndex={0} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 px-2 sm:px-0"
          style={{
            fontFamily: "Hypik, system-ui, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          EXPLORE TASKS
        </h2>
        <p
          className="text-xl md:text-2xl mb-8 text-[#4B3791] font-semibold"
          style={{ fontFamily: "JerseyM54, sans-serif" }}
        >
          Tasks will be available soon - Stay tuned!
        </p>

        <button
          onClick={handleTasksComingSoon}
          className="group px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
        >
          <span className="relative z-10">Coming Soon</span>
          <FiClock className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
}
