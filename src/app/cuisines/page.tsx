"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import {
  continents,
  getRecipesByContinent,
  getRecipesByCountry,
} from "@/data/recipes";

export default function CuisinesPage() {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const currentContinent = continents.find((c) => c.slug === selectedContinent);

  const filteredRecipes = selectedCountry
    ? getRecipesByCountry(selectedCountry)
    : selectedContinent
    ? getRecipesByContinent(selectedContinent)
    : [];

  const handleContinentClick = (slug: string) => {
    setSelectedContinent(slug);
    setSelectedCountry(null);
  };

  const handleCountryClick = (code: string) => {
    setSelectedCountry(code);
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, #ff6b6b 50%, #feca57 100%)",
            opacity: 0.1,
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
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--foreground)",
            }}
          >
            Explore <span className="gradient-text">Cuisines</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Discover authentic dishes from every corner of the world. Select a
            continent to begin your culinary journey.
          </motion.p>
        </div>
      </section>

      {/* Continent Selection */}
      <section
        className="py-12 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--foreground)",
            }}
          >
            Choose a Continent
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {continents.map((continent, index) => (
              <motion.button
                key={continent.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleContinentClick(continent.slug)}
                className="relative overflow-hidden rounded-2xl p-6 text-center transition-all"
                style={{
                  background:
                    selectedContinent === continent.slug
                      ? continent.color
                      : "var(--card-bg)",
                  border: `2px solid ${
                    selectedContinent === continent.slug
                      ? continent.color
                      : "var(--card-border)"
                  }`,
                  boxShadow:
                    selectedContinent === continent.slug
                      ? `0 10px 30px ${continent.color}40`
                      : "none",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${continent.image})` }}
                />
                <div className="relative z-10">
                  <span className="text-3xl block mb-2">
                    {continent.slug === "asia" && "🌏"}
                    {continent.slug === "europe" && "🏰"}
                    {continent.slug === "africa" && "🌍"}
                    {continent.slug === "americas" && "🌎"}
                    {continent.slug === "oceania" && "🏝️"}
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        selectedContinent === continent.slug
                          ? "white"
                          : "var(--foreground)",
                    }}
                  >
                    {continent.name}
                  </span>
                  <span
                    className="block text-sm mt-1"
                    style={{
                      color:
                        selectedContinent === continent.slug
                          ? "rgba(255,255,255,0.8)"
                          : "var(--foreground-secondary)",
                    }}
                  >
                    {continent.countries.length} countries
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Country Selection (when continent is selected) */}
      {currentContinent && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="py-8 px-6"
          style={{ background: "var(--background)" }}
        >
          <div className="max-w-7xl mx-auto">
            <h3
              className="text-xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Countries in{" "}
              <span style={{ color: currentContinent.color }}>
                {currentContinent.name}
              </span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background:
                    selectedCountry === null
                      ? currentContinent.color
                      : "var(--card-bg)",
                  color:
                    selectedCountry === null ? "white" : "var(--foreground)",
                  border: "1px solid var(--card-border)",
                }}
              >
                All Countries (
                {getRecipesByContinent(currentContinent.slug).length})
              </motion.button>
              {currentContinent.countries.map((country) => {
                const countryRecipes = getRecipesByCountry(country.code);
                return (
                  <motion.button
                    key={country.code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCountryClick(country.code)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                    style={{
                      background:
                        selectedCountry === country.code
                          ? currentContinent.color
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
                    <span className="opacity-60">
                      ({countryRecipes.length})
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Recipes Grid */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto">
          {!selectedContinent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-8xl block mb-6">👆</span>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                Select a Continent to Start
              </h3>
              <p style={{ color: "var(--foreground-secondary)" }}>
                Choose from any of the five continents above to explore their
                cuisines
              </p>
            </motion.div>
          ) : (
            <>
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
                        <span style={{ color: currentContinent?.color }}>
                          {
                            currentContinent?.countries.find(
                              (c) => c.code === selectedCountry
                            )?.name
                          }
                        </span>
                      </>
                    ) : (
                      <>
                        All{" "}
                        <span className="gradient-text">
                          {currentContinent?.name}
                        </span>{" "}
                        Recipes
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
