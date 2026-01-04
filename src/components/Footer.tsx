"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { continents } from "@/data/recipes";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{
        background: "var(--background-secondary)",
        borderTop: "1px solid var(--card-border)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍽️</span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="gradient-text">World</span>
                <span style={{ color: "var(--foreground)" }}>Feast</span>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Discover authentic recipes from around the globe. Cook, explore,
              and taste the world.
            </p>
          </div>

          {/* Continents */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Explore
            </h4>
            <ul className="space-y-2">
              {continents.map((continent) => (
                <li key={continent.slug}>
                  <Link
                    href={`/continent/${continent.slug}`}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {continent.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "All Recipes", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Get Updates
            </h4>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Subscribe for new recipes and cooking tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-red-400"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--card-border)",
                  color: "var(--foreground)",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ background: "var(--accent)" }}
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--card-border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--foreground-secondary)" }}
          >
            © 2025 WorldFeast. Made with ❤️ for food lovers. By Prince
          </p>
          <div className="flex gap-4">
            {/* Instagram */}
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="p-2 rounded-full transition-colors"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </motion.a>
            {/* Facebook */}
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="p-2 rounded-full transition-colors"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </motion.a>
            {/* Mail */}
            <motion.a
              href="mailto:contact@worldfeast.com"
              whileHover={{ scale: 1.2, y: -2 }}
              className="p-2 rounded-full transition-colors"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </motion.a>
            {/* Telegram */}
            <motion.a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="p-2 rounded-full transition-colors"
              style={{ color: "var(--foreground-secondary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2L2 9.5l7 2.5M21.5 2L11 22l-2-10M21.5 2L9 12"></path>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
