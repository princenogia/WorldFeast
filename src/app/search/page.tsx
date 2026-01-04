"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import {
  searchRecipes,
  recipes,
  allWorldRecipes,
  isRecipeAvailable,
} from "@/data/recipes";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<typeof recipes>([]);
  const [comingSoonResults, setComingSoonResults] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      // Get available recipes
      const available = searchRecipes(query);
      setSearchResults(available);

      // Get coming soon recipes
      const lowerQuery = query.toLowerCase();
      const comingSoon = [...new Set(allWorldRecipes)]
        .filter(
          (name) =>
            name.toLowerCase().includes(lowerQuery) && !isRecipeAvailable(name)
        )
        .slice(0, 6);
      setComingSoonResults(comingSoon);
    } else {
      setSearchResults([]);
      setComingSoonResults([]);
    }
  }, [query]);

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Search Results
            </h1>
            {query && (
              <p
                className="text-lg"
                style={{ color: "var(--foreground-secondary)" }}
              >
                Showing results for &quot;
                <span className="gradient-text font-semibold">{query}</span>
                &quot;
              </p>
            )}
          </motion.div>

          {/* Available Recipes */}
          {searchResults.length > 0 && (
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold mb-8 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                <span>🍴</span>
                Available Recipes ({searchResults.length})
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon Recipes */}
          {comingSoonResults.length > 0 && (
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-8 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                <span>⏳</span>
                Coming Soon ({comingSoonResults.length})
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonResults.map((recipeName, index) => (
                  <motion.div
                    key={recipeName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={`/coming-soon?recipe=${encodeURIComponent(
                        recipeName
                      )}`}
                    >
                      <div
                        className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                        style={{
                          background: "var(--card-bg)",
                          border: "1px solid var(--card-border)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl mb-2 block">⏳</span>
                            <h3
                              className="font-semibold text-lg group-hover:text-[var(--accent)] transition-colors"
                              style={{ color: "var(--foreground)" }}
                            >
                              {recipeName}
                            </h3>
                            <p
                              className="text-sm mt-1"
                              style={{ color: "var(--foreground-secondary)" }}
                            >
                              Recipe coming soon!
                            </p>
                          </div>
                          <span
                            className="text-2xl group-hover:translate-x-1 transition-transform"
                            style={{ color: "var(--accent)" }}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query &&
            searchResults.length === 0 &&
            comingSoonResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <span className="text-6xl mb-6 block">🔍</span>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--foreground)",
                  }}
                >
                  No recipes found
                </h2>
                <p
                  className="mb-8"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  We couldn&apos;t find any recipes matching &quot;{query}&quot;
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                    color: "white",
                  }}
                >
                  Browse All Recipes
                </Link>
              </motion.div>
            )}

          {/* Empty Query */}
          {!query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-6xl mb-6 block">🍳</span>
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                Start your culinary journey
              </h2>
              <p
                className="mb-8"
                style={{ color: "var(--foreground-secondary)" }}
              >
                Use the search bar above to find recipes from around the world
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--background)" }}
        >
          <span className="text-4xl animate-pulse">🔍</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
