"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import Footer from "@/components/Footer";
import {
  getContinentBySlug,
  getRecipesByContinent,
  getRecipesByCountry,
} from "@/data/recipes";

interface ContinentPageProps {
  params: Promise<{ slug: string }>;
}

export default function ContinentPage({ params }: ContinentPageProps) {
  const { slug } = use(params);
  const continent = getContinentBySlug(slug);
  const allRecipes = getRecipesByContinent(slug);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (!continent) {
    notFound();
  }

  const filteredRecipes = selectedCountry
    ? getRecipesByCountry(selectedCountry)
    : allRecipes;

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${continent.image})`,
            filter: "brightness(0.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, var(--background))`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-6xl mb-6"
          >
            🌍
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {continent.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            {continent.description}
          </motion.p>
        </div>
      </section>

      {/* Country Filter */}
      <section
        className="py-8 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Filter by country:
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCountry(null)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background:
                  selectedCountry === null ? continent.color : "var(--card-bg)",
                color: selectedCountry === null ? "white" : "var(--foreground)",
                border: "1px solid var(--card-border)",
              }}
            >
              All ({allRecipes.length})
            </motion.button>
            {continent.countries.map((country) => {
              const countryRecipes = getRecipesByCountry(country.code);
              return (
                <motion.button
                  key={country.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCountry(country.code)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                  style={{
                    background:
                      selectedCountry === country.code
                        ? continent.color
                        : "var(--card-bg)",
                    color:
                      selectedCountry === country.code
                        ? "white"
                        : "var(--foreground)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="opacity-60">({countryRecipes.length})</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                {selectedCountry ? (
                  <>
                    Recipes from{" "}
                    <span style={{ color: continent.color }}>
                      {
                        continent.countries.find(
                          (c) => c.code === selectedCountry
                        )?.name
                      }
                    </span>
                  </>
                ) : (
                  <>
                    All <span className="gradient-text">Recipes</span>
                  </>
                )}
              </h2>
              <p
                className="mt-2"
                style={{ color: "var(--foreground-secondary)" }}
              >
                {filteredRecipes.length} delicious dishes
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-6xl block mb-4">🍳</span>
              <p style={{ color: "var(--foreground-secondary)" }}>
                No recipes found for this selection. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
