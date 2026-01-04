"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { recipes } from "@/data/recipes";

function ComingSoonContent() {
  const searchParams = useSearchParams();
  const recipeName = searchParams.get("recipe") || "This Recipe";

  // Get some random available recipes to suggest
  const suggestedRecipes = recipes.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-12"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-8xl mb-8"
            >
              👨‍🍳
            </motion.div>

            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              <span className="gradient-text">{recipeName}</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-6 py-3 rounded-full mb-8"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
              }}
            >
              <span className="text-white font-semibold text-lg">
                🚀 Coming Soon!
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Our master chefs are perfecting this recipe. Subscribe to get
              notified when it&apos;s ready!
            </motion.p>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl mb-16"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Get Notified
            </h2>
            <p
              className="mb-6"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Be the first to know when {recipeName} is available
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full outline-none text-sm"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--card-border)",
                  color: "var(--foreground)",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                }}
              >
                Notify Me
              </motion.button>
            </form>
          </motion.div>

          {/* Suggested Recipes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2
              className="text-2xl font-bold mb-8"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              While You Wait, Try These
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link href={`/recipe/${recipe.id}`}>
                    <div
                      className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] cursor-pointer group overflow-hidden relative"
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url(${recipe.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "blur(20px)",
                        }}
                      />
                      <div className="relative z-10">
                        <span className="text-3xl mb-3 block">🍴</span>
                        <h3
                          className="font-semibold text-lg group-hover:text-[var(--accent)] transition-colors"
                          style={{ color: "var(--foreground)" }}
                        >
                          {recipe.name}
                        </h3>
                        <p
                          className="text-sm mt-2 flex items-center gap-2"
                          style={{ color: "var(--foreground-secondary)" }}
                        >
                          <span>{recipe.country}</span>
                          <span>•</span>
                          <span>{recipe.cookTime}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <span>←</span>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--background)" }}
        >
          <span className="text-4xl animate-pulse">👨‍🍳</span>
        </div>
      }
    >
      <ComingSoonContent />
    </Suspense>
  );
}
