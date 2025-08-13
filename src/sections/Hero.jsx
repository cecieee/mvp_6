import React from "react";

export default function Hero() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-white to-black flex justify-center items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-pink-400 opacity-25 rounded-full blur-2xl animate-pulse"></div>
      </div>
      <h1 className="relative text-4xl font-bold text-gray-900 z-10">Hero Section</h1>
    </div>
  );
}
