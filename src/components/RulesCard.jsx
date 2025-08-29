import React from "react";
import { motion } from "framer-motion";

const RulesCard = ({ title, children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl hover:border-white/30 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {title}
          </h2>
        </div>
        <div className="text-gray-200 leading-relaxed text-sm">{children}</div>
      </div>
    </motion.div>
  );
};

export default RulesCard;
