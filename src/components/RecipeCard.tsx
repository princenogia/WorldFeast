"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Recipe } from "@/data/recipes";
import { getRecipeImage } from "@/data/foodImages";
import { useState } from "react";
import { Clock } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  const [imageSrc, setImageSrc] = useState(() => getRecipeImage(recipe.id));
  const [hasError, setHasError] = useState(false);

  const difficultyColors = {
    Easy: "#26de81",
    Medium: "#feca57",
    Hard: "#ff6b6b",
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/recipe/${recipe.id}`} className="block group">
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageSrc}
              alt={recipe.name}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Country Badge */}
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
            >
              {recipe.country}
            </span>

            {/* Difficulty Badge */}
            <span
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium text-white"
              style={{ background: difficultyColors[recipe.difficulty] }}
            >
              {recipe.difficulty}
            </span>

            {/* Cook Time */}
            <span className="absolute bottom-3 left-3 text-white text-sm flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2} />
              {recipe.cookTime}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3
              className="text-lg font-bold mb-1 line-clamp-1"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              {recipe.name}
            </h3>
            <p
              className="text-sm line-clamp-2 mb-3"
              style={{ color: "var(--foreground-secondary)" }}
            >
              {recipe.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: "var(--background-secondary)",
                    color: "var(--foreground-secondary)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
