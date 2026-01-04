"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContinentCard from "@/components/ContinentCard";
import RecipeCard from "@/components/RecipeCard";
import Testimonials from "@/components/Testimonials";
import RequestRecipe from "@/components/RequestRecipe";
import Footer from "@/components/Footer";
import { continents, recipes } from "@/data/recipes";

export default function Home() {
  const featuredRecipes = recipes.slice(0, 6);

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />
      <Hero />

      {/* Continents Section */}
      <section
        className="py-24 px-6"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-medium tracking-wider uppercase mb-4 block"
              style={{ color: "var(--accent)" }}
            >
              Explore by Region
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Choose Your <span className="gradient-text">Destination</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {continents.map((continent, index) => (
              <ContinentCard
                key={continent.slug}
                continent={continent}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA Section */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4ecdc4 0%, #44a8b3 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🥢</div>
          <div className="absolute bottom-10 right-10 text-8xl">🍕</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Discover 20+ Countries & 50+ Authentic Recipes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-8"
          >
            From Japanese sushi to Mexican tacos, explore cuisines that have
            been perfected over generations.
          </motion.p>
          <motion.a
            href="/continent/asia"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-white text-teal-600"
          >
            Start Your Journey →
          </motion.a>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section
        className="py-24 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-medium tracking-wider uppercase mb-4 block"
              style={{ color: "var(--accent-secondary)" }}
            >
              Top Picks
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Featured <span className="gradient-text">Recipes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/cuisines"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              style={{
                background: "transparent",
                border: "2px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              View All Recipes →
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Stats Section */}
      <section
        className="py-20 px-6"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Recipes" },
              { number: "5", label: "Continents" },
              { number: "20+", label: "Countries" },
              { number: "∞", label: "Flavors" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <span
                  className="text-4xl md:text-5xl font-bold gradient-text block mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Recipe Section */}
      <RequestRecipe />

      <Footer />
    </main>
  );
}
