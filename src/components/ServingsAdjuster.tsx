"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ServingsAdjusterProps {
  baseServings: number;
  onServingsChange: (servings: number) => void;
}

export default function ServingsAdjuster({
  baseServings,
  onServingsChange,
}: ServingsAdjusterProps) {
  const [servings, setServings] = useState(baseServings);

  const handleDecrease = () => {
    if (servings > 1) {
      const newServings = servings - 1;
      setServings(newServings);
      onServingsChange(newServings);
    }
  };

  const handleIncrease = () => {
    if (servings < 20) {
      const newServings = servings + 1;
      setServings(newServings);
      onServingsChange(newServings);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl">👥</span>
      <div>
        <p
          className="text-sm mb-1"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Servings
        </p>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDecrease}
            disabled={servings <= 1}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all"
            style={{
              background:
                servings <= 1 ? "var(--card-border)" : "var(--accent)",
              color: servings <= 1 ? "var(--foreground-secondary)" : "white",
              cursor: servings <= 1 ? "not-allowed" : "pointer",
            }}
          >
            −
          </motion.button>
          <span
            className="text-xl font-bold min-w-[60px] text-center"
            style={{ color: "var(--foreground)" }}
          >
            {servings} {servings === 1 ? "person" : "people"}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleIncrease}
            disabled={servings >= 20}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all"
            style={{
              background:
                servings >= 20 ? "var(--card-border)" : "var(--accent)",
              color: servings >= 20 ? "var(--foreground-secondary)" : "white",
              cursor: servings >= 20 ? "not-allowed" : "pointer",
            }}
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
}
