"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScalableIngredientsListProps {
  ingredients: string[];
  baseServings: number;
  currentServings: number;
  recipeId?: string;
}

// Regex to find numbers (integers and decimals) at the start of ingredients
const numberPattern = /^([\d./]+)\s*/;

// Common fractions to their decimal equivalents
const fractionMap: Record<string, number> = {
  "1/2": 0.5,
  "1/3": 0.333,
  "2/3": 0.667,
  "1/4": 0.25,
  "3/4": 0.75,
  "1/8": 0.125,
  "3/8": 0.375,
  "5/8": 0.625,
  "7/8": 0.875,
};

function parseNumber(str: string): number | null {
  // Check if it's a fraction
  if (fractionMap[str]) {
    return fractionMap[str];
  }

  // Check if it's a mixed number like "1 1/2"
  const mixedMatch = str.match(/^(\d+)\s+([\d/]+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1]);
    const fraction = fractionMap[mixedMatch[2]];
    if (fraction !== undefined) {
      return whole + fraction;
    }
  }

  // Try parsing as regular number
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function formatNumber(num: number): string {
  // Round to 2 decimal places
  const rounded = Math.round(num * 100) / 100;

  // Convert back to fractions for common values
  if (Math.abs(rounded - 0.25) < 0.01) return "1/4";
  if (Math.abs(rounded - 0.333) < 0.02) return "1/3";
  if (Math.abs(rounded - 0.5) < 0.01) return "1/2";
  if (Math.abs(rounded - 0.667) < 0.02) return "2/3";
  if (Math.abs(rounded - 0.75) < 0.01) return "3/4";

  // For mixed numbers
  if (rounded > 1) {
    const whole = Math.floor(rounded);
    const fraction = rounded - whole;
    if (Math.abs(fraction - 0.25) < 0.01) return `${whole} 1/4`;
    if (Math.abs(fraction - 0.333) < 0.02) return `${whole} 1/3`;
    if (Math.abs(fraction - 0.5) < 0.01) return `${whole} 1/2`;
    if (Math.abs(fraction - 0.667) < 0.02) return `${whole} 2/3`;
    if (Math.abs(fraction - 0.75) < 0.01) return `${whole} 3/4`;
  }

  // Return as is, removing trailing zeros
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  return rounded.toFixed(1).replace(/\.0$/, "");
}

function scaleIngredient(
  ingredient: string,
  baseServings: number,
  currentServings: number
): string {
  const multiplier = currentServings / baseServings;

  // Try to find a number at the start
  const match = ingredient.match(numberPattern);
  if (match) {
    const originalNumber = parseNumber(match[1]);
    if (originalNumber !== null) {
      const scaledNumber = originalNumber * multiplier;
      const formattedNumber = formatNumber(scaledNumber);
      return ingredient.replace(match[0], formattedNumber + " ");
    }
  }

  return ingredient;
}

export default function ScalableIngredientsList({
  ingredients,
  baseServings,
  currentServings,
  recipeId,
}: ScalableIngredientsListProps) {
  const isScaled = currentServings !== baseServings;
  const storageKey = recipeId ? `recipe-ingredients-${recipeId}` : null;

  // State for checked ingredients
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(ingredients.length).fill(false)
  );

  // Load from localStorage on mount
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Ensure array length matches ingredients
          if (Array.isArray(parsed) && parsed.length === ingredients.length) {
            setCheckedIngredients(parsed);
          }
        }
      } catch {
        // Invalid data, ignore
      }
    }
  }, [storageKey, ingredients.length]);

  // Save to localStorage when changed
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(checkedIngredients));
    }
  }, [checkedIngredients, storageKey]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const checkedCount = checkedIngredients.filter(Boolean).length;
  const allChecked = checkedCount === ingredients.length;

  const toggleAll = () => {
    setCheckedIngredients(new Array(ingredients.length).fill(!allChecked));
  };

  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Header with availability count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
              background:
                checkedCount === ingredients.length
                  ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)"
                  : "var(--background)",
              color:
                checkedCount === ingredients.length
                  ? "white"
                  : "var(--foreground-secondary)",
            }}
          >
            {checkedCount} of {ingredients.length} available
          </span>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
          style={{
            background: "var(--background)",
            color: "var(--foreground-secondary)",
          }}
        >
          {allChecked ? "Uncheck All" : "Check All"}
        </button>
      </div>

      {/* Ingredients List */}
      <ul className="space-y-3">
        {ingredients.map((ingredient, index) => {
          const scaledIngredient = scaleIngredient(
            ingredient,
            baseServings,
            currentServings
          );
          const isChecked = checkedIngredients[index];

          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => toggleIngredient(index)}
              style={{ color: "var(--foreground)" }}
            >
              {/* Checkbox */}
              <button
                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isChecked ? "scale-110" : ""
                }`}
                style={{
                  background: isChecked
                    ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)"
                    : "transparent",
                  border: isChecked ? "none" : "2px solid var(--card-border)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIngredient(index);
                }}
              >
                {isChecked && <span className="text-white text-xs">✓</span>}
              </button>

              {/* Ingredient Text */}
              <span
                className={`flex-1 transition-all duration-300 ${
                  isScaled ? "font-medium" : ""
                } ${isChecked ? "line-through opacity-60" : ""}`}
                style={{
                  color: isChecked
                    ? "var(--foreground-secondary)"
                    : "var(--foreground)",
                }}
              >
                {scaledIngredient}
              </span>

              {/* Scaled indicator */}
              {isScaled && scaledIngredient !== ingredient && (
                <span
                  className="text-xs ml-auto"
                  style={{ color: "var(--accent)" }}
                >
                  (scaled)
                </span>
              )}

              {/* Availability badge (shows on hover) */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                  isChecked ? "" : "hidden group-hover:block"
                }`}
                style={{
                  background: isChecked ? "var(--accent)" : "var(--background)",
                  color: isChecked ? "white" : "var(--foreground-secondary)",
                }}
              >
                {isChecked ? "Have it" : "Need it"}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* Shopping List Hint */}
      {checkedCount < ingredients.length && (
        <div
          className="mt-4 p-3 rounded-lg text-sm"
          style={{
            background: "var(--background)",
            color: "var(--foreground-secondary)",
          }}
        >
          <span className="mr-2">🛒</span>
          {ingredients.length - checkedCount} ingredient
          {ingredients.length - checkedCount > 1 ? "s" : ""} to add to your
          shopping list
        </div>
      )}
    </div>
  );
}
