"use client";

import Link from "next/link";
import { Recipe } from "@/data/recipes";
import { getRecipeImage } from "@/data/foodImages";
import { useState } from "react";

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
    <div
      className="recipe-card-enter"
      style={{ animationDelay: `${index * 0.1}s` }}
      suppressHydrationWarning
    >
      <Link href={`/recipe/${recipe.id}`}>
        <article
          className="rounded-2xl overflow-hidden cursor-pointer group card-hover"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Image Container */}
          <div
            className="relative h-48 overflow-hidden"
            style={{ backgroundColor: "#e5e7eb" }}
          >
            <img
              src={imageSrc}
              alt={recipe.name}
              onError={handleImageError}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s",
              }}
              className="group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                {recipe.country}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ background: difficultyColors[recipe.difficulty] }}
              >
                {recipe.difficulty}
              </span>
            </div>

            {/* Cook Time */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
              <span className="text-white text-sm">⏱️ {recipe.cookTime}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className="text-lg font-semibold mb-2 line-clamp-1"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              {recipe.name}
            </h3>
            <p
              className="text-sm line-clamp-2 mb-4"
              style={{ color: "var(--foreground-secondary)" }}
            >
              {recipe.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md text-xs"
                  style={{
                    background: "var(--background)",
                    color: "var(--foreground-secondary)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
