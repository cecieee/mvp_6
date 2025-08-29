import React from "react";
import { motion } from "framer-motion";

const RulesCard = ({ title, children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
      style={{
        boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
      }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-[#4B3791] to-[#1C1538] rounded-full mr-3"></div>
          <h2 
            className="text-xl font-bold tracking-wide"
            style={{
              color: "#1C1538",
              fontFamily: "JerseyM54, sans-serif",
            }}
          >
            {title}
          </h2>
        </div>
        <div 
          className="leading-relaxed text-sm"
          style={{
            color: "#4B3791",
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default RulesCard;
