"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 50%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block text-7xl mb-6"
          >
            🌍
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Discover Flavors{" "}
          <span className="gradient-text">Around the World</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Explore authentic recipes from every continent. From Asian delicacies
          to European classics, embark on a culinary journey without leaving
          your kitchen.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContent}
          className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300"
          style={{
            background: "var(--accent-gradient)",
            boxShadow: "0 10px 40px rgba(255, 107, 107, 0.3)",
          }}
        >
          Start Exploring
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToContent}
        >
          <span
            className="text-sm font-medium"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Scroll to explore
          </span>
          <span className="text-2xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
