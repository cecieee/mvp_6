import React from "react";

export default function GradientButton({ children, className = "", ...props }) {
  return (
    <button
      className={`px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-500 bg-gradient-to-r from-[#1B1436] to-[#4B3791] hover:from-[#4B3791] hover:to-[#1B1436] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
