"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { continents, recipes } from "@/data/recipes";

const teamMembers = [
  {
    name: "Chef Maria Santos",
    role: "Head Chef & Founder",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
    bio: "With 20 years of culinary experience across 4 continents, Maria brings authentic flavors to every recipe.",
  },
  {
    name: "David Chen",
    role: "Recipe Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "A food scientist and home cook who ensures every recipe is tested for perfection.",
  },
  {
    name: "Amara Okonkwo",
    role: "Cultural Curator",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    bio: "Anthropologist and foodie who researches the cultural stories behind each dish.",
  },
  {
    name: "James Wilson",
    role: "Food Photographer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Award-winning photographer who makes every dish look as delicious as it tastes.",
  },
];

const values = [
  {
    icon: "🌍",
    title: "Global Diversity",
    description:
      "We celebrate cuisines from every corner of the world, preserving authentic recipes and techniques.",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    description:
      "Every recipe is carefully crafted and tested to ensure you get the best results in your kitchen.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "We promote sustainable cooking practices and locally-sourced ingredients whenever possible.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family First",
    description:
      "Food brings families together. We create recipes that can be shared across generations.",
  },
];

export default function AboutPage() {
  const totalCountries = continents.reduce(
    (acc, c) => acc + c.countries.length,
    0
  );

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, #ff6b6b 50%, #feca57 100%)",
            opacity: 0.1,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block text-7xl mb-6"
          >
            🍽️
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--foreground)",
            }}
          >
            About <span className="gradient-text">WorldFeast</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed"
            style={{ color: "var(--foreground-secondary)" }}
          >
            We&apos;re on a mission to bring the world&apos;s most authentic and
            delicious recipes to your kitchen. From the spicy streets of Bangkok
            to the cozy trattorias of Rome, we explore, document, and share
            culinary treasures from every culture.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: recipes.length + "+", label: "Recipes", icon: "📖" },
              { number: totalCountries + "+", label: "Countries", icon: "🗺️" },
              { number: continents.length, label: "Continents", icon: "🌍" },
              { number: "50K+", label: "Happy Cooks", icon: "👨‍🍳" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <span className="text-4xl block mb-2">{stat.icon}</span>
                <span
                  className="text-4xl font-bold gradient-text block"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {stat.number}
                </span>
                <span style={{ color: "var(--foreground-secondary)" }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Our <span className="gradient-text">Story</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            <p className="text-lg leading-relaxed mb-6">
              WorldFeast was born from a simple idea: everyone deserves access
              to the world&apos;s greatest recipes. Our founder, Chef Maria
              Santos, spent over a decade traveling the globe, learning from
              home cooks, street vendors, and Michelin-starred chefs alike.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              What started as a personal recipe collection in 2020 has grown
              into a comprehensive culinary library featuring hundreds of
              authentic dishes from every continent. Each recipe is carefully
              researched, tested multiple times, and written with home cooks in
              mind.
            </p>
            <p className="text-lg leading-relaxed">
              Today, WorldFeast is more than just a recipe website—it&apos;s a
              celebration of cultural diversity through food. We believe that by
              sharing and cooking recipes from around the world, we can foster
              understanding, appreciation, and deliciousness in every kitchen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section
        className="py-20 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Our <span className="gradient-text">Values</span>
            </h2>
            <p style={{ color: "var(--foreground-secondary)" }}>
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <span className="text-5xl block mb-4">{value.icon}</span>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p style={{ color: "var(--foreground-secondary)" }}>
              The passionate food lovers behind WorldFeast
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-3 gradient-text">
                    {member.role}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-6"
        style={{
          background: "linear-gradient(135deg, var(--accent) 0%, #ff6b6b 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-6 text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to Start Cooking?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of home cooks exploring cuisines from around the
              world.
            </p>
            <motion.a
              href="/cuisines"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-full text-lg font-semibold transition-all"
              style={{
                background: "white",
                color: "var(--accent)",
              }}
            >
              Explore Cuisines 🌍
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
