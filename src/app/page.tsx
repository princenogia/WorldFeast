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
        className="py-12 px-6 md:px-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4ecdc4 0%, #44a8b3 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Discover 20+ Countries & 50+ Authentic Recipes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-sm md:text-base mb-5"
            >
              From Japanese sushi to Mexican tacos, explore cuisines that have
              been perfected over generations.
            </motion.p>
            <motion.a
              href="/continent/asia"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-block px-6 py-3 rounded-full font-semibold text-sm bg-white text-teal-600"
            >
              Start Your Journey →
            </motion.a>
          </div>
          {/* Right Image Collage - Attractive Overlapping Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 hidden md:block relative w-72 h-64"
          >
            {/* Large center image */}
            <motion.img
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Pasta dish"
              className="absolute top-8 left-4 w-36 h-28 object-cover rounded-2xl shadow-2xl border-3 border-white/30 hover:scale-110 hover:z-30 transition-all duration-300 z-10"
            />

            {/* Top right - taller image */}
            <motion.img
              initial={{ opacity: 0, y: -20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Sushi platter"
              className="absolute -top-2 right-4 w-28 h-36 object-cover rounded-2xl shadow-2xl border-3 border-white/30 hover:scale-110 hover:z-30 transition-all duration-300 z-20"
            />

            {/* Bottom left - wide image */}
            <motion.img
              initial={{ opacity: 0, x: -20, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Healthy salad"
              className="absolute bottom-2 left-0 w-32 h-24 object-cover rounded-2xl shadow-2xl border-3 border-white/30 hover:scale-110 hover:z-30 transition-all duration-300 z-5"
            />

            {/* Bottom right - medium image */}
            <motion.img
              initial={{ opacity: 0, x: 20, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Tacos"
              className="absolute bottom-6 right-2 w-28 h-28 object-cover rounded-2xl shadow-2xl border-3 border-white/30 hover:scale-110 hover:z-30 transition-all duration-300 z-15"
            />

            {/* Extra small accent image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Curry dish"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 object-cover rounded-xl shadow-xl border-2 border-white/40 hover:scale-110 hover:z-30 transition-all duration-300 z-25"
            />
          </motion.div>
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
                border: "2px solid #ff6b6b",
                color: "#ff6b6b",
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
