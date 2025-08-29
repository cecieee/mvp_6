import React from "react";
import RulesCard from "../components/RulesCard";
import { motion } from "framer-motion";

const rules = [
  {
    title: "IEEE Membership",
    content:
      "To enroll in the volunteering program, the student must have a valid IEEE membership ID. This ensures access to exclusive IEEE resources and networking opportunities.",
    icon: "👥",
  },
  {
    title: "Task Schedule",
    content:
      "Online tasks will be provided to the volunteers on alternate days. Each task is carefully designed to enhance your technical skills and contribute to meaningful projects.",
    icon: "📅",
  },
  {
    title: "Task Submission",
    content:
      "Reports of the completed task should be submitted via the Google Form that will be provided along with each task. Detailed documentation is encouraged for better evaluation.",
    icon: "📝",
  },
  {
    title: "Rewards",
    content:
      "The successful completion of each task will reward you with points. Accumulate points to climb the leaderboard and unlock exclusive prizes and recognition.",
    icon: "🏆",
  },
];

function Rules() {
  return (
    <section
      id="rules"
      className="relative min-h-screen bg-gradient-to-b from-black via-purple-900 to-slate-900 flex justify-center items-center py-20 px-4"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/6 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Competition Rules
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow these guidelines to ensure a fair and rewarding experience
            for all participants
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rules.map((rule, index) => (
            <RulesCard key={index} title={rule.title} index={index}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-1">{rule.icon}</span>
                <span>{rule.content}</span>
              </div>
            </RulesCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rules;
