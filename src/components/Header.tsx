"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SearchBar from "@/components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler for search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cuisines", href: "/cuisines" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? theme === "dark"
              ? "rgba(10, 10, 15, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--card-border)" : "none",
          boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-4 pt-6 md:pt-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <motion.span
              className="text-3xl"
              whileHover={{ rotate: 20, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🍽️
            </motion.span>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="gradient-text">World</span>
              <span
                style={{
                  color: isScrolled
                    ? theme === "dark"
                      ? "var(--foreground)"
                      : "#1a1a2e"
                    : "white",
                }}
              >
                Feast
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - always visible, pushed left when search opens */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="relative text-sm font-medium transition-all duration-300 py-2 group whitespace-nowrap"
                  style={{
                    color: isScrolled
                      ? theme === "dark"
                        ? "var(--foreground-secondary)"
                        : "#333333"
                      : "white",
                  }}
                >
                  <span className="group-hover:text-[#ff6b6b] transition-colors duration-300">
                    {item.name}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: "#ff6b6b" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side: Search + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Inline Search - expands and pushes nav links left */}
            <div ref={searchContainerRef} className="flex items-center">
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="searchbar"
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <SearchBar onClose={() => setIsSearchOpen(false)} />
                  </motion.div>
                ) : (
                  <motion.button
                    key="searchbutton"
                    onClick={() => setIsSearchOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                    }}
                    aria-label="Open search"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: "var(--foreground)" }}
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? faSun : faMoon}
                  style={{ color: "var(--foreground)" }}
                />
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? faSun : faMoon}
                  style={{ color: "var(--foreground)" }}
                />
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center cursor-pointer"
              style={{
                gap: "10px",
              }}
              animate={{
                rotate: isMobileMenuOpen ? 180 : 0,
              }}
              transition={{ duration: 0.5 }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  width: isMobileMenuOpen ? "100%" : "70%",
                  position: isMobileMenuOpen ? "absolute" : "relative",
                }}
                transition={{ duration: 0.5 }}
                className="h-1 rounded"
                style={{
                  background: "var(--foreground)",
                  width: isMobileMenuOpen ? "100%" : "70%",
                }}
              />
              <motion.span
                animate={{
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: isMobileMenuOpen ? 0.5 : 0.8 }}
                className="w-full h-1 rounded"
                style={{ background: "var(--foreground)" }}
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  width: isMobileMenuOpen ? "100%" : "70%",
                  position: isMobileMenuOpen ? "absolute" : "relative",
                }}
                transition={{ duration: 0.5 }}
                className="h-1 rounded"
                style={{
                  background: "var(--foreground)",
                  width: isMobileMenuOpen ? "100%" : "70%",
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[70%] z-50 md:hidden px-6"
              style={{
                background: theme === "dark" ? "#0a0a0f" : "#ffffff",
                borderLeft: "1px solid var(--card-border)",
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end pt-6">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex flex-col items-center justify-center cursor-pointer relative"
                  aria-label="Close menu"
                >
                  <motion.span
                    initial={{ rotate: 45 }}
                    className="absolute h-1 rounded"
                    style={{
                      background: "var(--foreground)",
                      width: "100%",
                      transform: "rotate(45deg)",
                    }}
                  />
                  <motion.span
                    initial={{ rotate: -45 }}
                    className="absolute h-1 rounded"
                    style={{
                      background: "var(--foreground)",
                      width: "100%",
                      transform: "rotate(-45deg)",
                    }}
                  />
                </motion.button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6 mt-6">
                <SearchBar
                  isMobile={true}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 hover:pl-6"
                      style={{
                        color: "var(--foreground)",
                        background: "var(--background-secondary)",
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div
                className="mt-8 pt-8"
                style={{ borderTop: "1px solid var(--card-border)" }}
              >
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  Explore cuisines from around the world
                </p>
                <div className="flex gap-3">
                  {["🌏", "🌍", "🌎"].map((emoji, i) => (
                    <span key={i} className="text-2xl">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
