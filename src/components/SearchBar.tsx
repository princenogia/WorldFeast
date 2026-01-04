"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getRecipeSuggestions } from "@/data/recipes";

interface SearchBarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function SearchBar({
  onClose,
  isMobile = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ name: string; available: boolean; id: string | null }>
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 2) {
      const results = getRecipeSuggestions(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (suggestion: {
    name: string;
    available: boolean;
    id: string | null;
  }) => {
    if (suggestion.available && suggestion.id) {
      router.push(`/recipe/${suggestion.id}`);
    } else {
      router.push(`/coming-soon?recipe=${encodeURIComponent(suggestion.name)}`);
    }
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex]);
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      onClose?.();
    }
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "w-80"}`}>
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center h-10"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "9999px",
          }}
        >
          <span className="pl-4 text-sm">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              query.length >= 2 && setIsOpen(suggestions.length > 0)
            }
            placeholder="Search any recipe..."
            className="w-full py-2 px-3 bg-transparent outline-none text-sm"
            style={{ color: "var(--foreground)" }}
            autoFocus
          />
          {query && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="pr-4 text-lg hover:scale-110 transition-transform"
              style={{ color: "var(--foreground-secondary)" }}
            >
              ✕
            </motion.button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.name}
                onClick={() => handleSelect(suggestion)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                  index === selectedIndex
                    ? "bg-[var(--background-secondary)]"
                    : ""
                }`}
                style={{
                  borderBottom:
                    index < suggestions.length - 1
                      ? "1px solid var(--card-border)"
                      : "none",
                }}
                whileHover={{
                  backgroundColor: "var(--background-secondary)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {suggestion.available ? "🍴" : "⏳"}
                  </span>
                  <div>
                    <span
                      className="block text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {suggestion.name}
                    </span>
                    {!suggestion.available && (
                      <span
                        className="text-xs"
                        style={{ color: "var(--accent)" }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                {suggestion.available && (
                  <span style={{ color: "var(--accent)" }}>→</span>
                )}
              </motion.button>
            ))}

            <div
              className="px-4 py-3 text-center"
              style={{
                background: "var(--background-secondary)",
                borderTop: "1px solid var(--card-border)",
              }}
            >
              <button
                onClick={handleSubmit}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--accent)" }}
              >
                Press Enter to see all results →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
