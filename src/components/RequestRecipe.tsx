"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { continents } from "@/data/recipes";
import {
  UtensilsCrossed,
  Globe,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  XCircle,
  Info,
  BookOpen,
  Clock,
  Users,
} from "lucide-react";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

// Get all unique countries
const allCountries = continents.flatMap((c) =>
  c.countries.map((country) => ({
    name: country.name,
    flag: country.flag,
    continent: c.name,
  })),
);

// Known dishes map
const knownDishes: Record<string, string> = {
  sushi: "Japan",
  ramen: "Japan",
  tempura: "Japan",
  "pad thai": "Thailand",
  "tom yum": "Thailand",
  biryani: "India",
  "butter chicken": "India",
  pizza: "Italy",
  pasta: "Italy",
  carbonara: "Italy",
  croissant: "France",
  tacos: "Mexico",
  burrito: "Mexico",
  paella: "Spain",
  moussaka: "Greece",
  pho: "Vietnam",
  "jollof rice": "Nigeria",
  tagine: "Morocco",
};

export default function RequestRecipe({
  className = "",
}: {
  className?: string;
}) {
  const [dishName, setDishName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validation = useMemo(() => {
    if (!dishName.trim() || !selectedCountry) {
      return { isValid: false, message: "", showError: false };
    }
    const normalizedDish = dishName.toLowerCase().trim();
    const matchedCountry = knownDishes[normalizedDish];

    if (!matchedCountry) {
      return {
        isValid: true,
        message: "We'll verify this dish!",
        showError: false,
        isUnknown: true,
      };
    }
    if (matchedCountry === selectedCountry) {
      return {
        isValid: true,
        message: `${dishName} is from ${selectedCountry}!`,
        showError: false,
      };
    }
    return {
      isValid: false,
      message: `This dish is from ${matchedCountry}, not ${selectedCountry}.`,
      showError: true,
    };
  }, [dishName, selectedCountry]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validation.isValid || !email.trim()) return;
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID) {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              dish_name: dishName,
              country: selectedCountry,
              user_email: email,
              message: message || "No message",
            },
            EMAILJS_PUBLIC_KEY,
          );
        }
        setSubmitStatus("success");
        setDishName("");
        setSelectedCountry("");
        setEmail("");
        setMessage("");
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [dishName, selectedCountry, email, message, validation.isValid],
  );

  const canSubmit = validation.isValid && email.trim() && !isSubmitting;

  return (
    <section
      className={`py-20 px-6 relative overflow-hidden ${className}`}
      style={{ background: "var(--background-secondary)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: "#ff6b6b" }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "#4ecdc4" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--foreground)",
            }}
          >
            Can't Find Your <span className="gradient-text">Favorite Dish</span>
            ?
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Request any recipe from around the world and we'll add it within 48
            hours.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left side - Visual content */}
          <motion.div
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Attractive overlapping image collage */}
            <div
              className="relative rounded-2xl overflow-hidden flex-1 min-h-[420px]"
              style={{ background: "var(--accent-gradient)" }}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/20 via-transparent to-[#4ecdc4]/20" />

              {/* Corner Images - positioned to avoid center text */}
              {/* Top-left corner */}
              <motion.img
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Pasta dish"
                className="absolute -top-3 -left-3 w-32 h-40 object-cover rounded-2xl shadow-2xl border-4 border-white/20 hover:scale-105 hover:z-20 transition-all duration-300"
              />

              {/* Top-right corner */}
              <motion.img
                initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sushi platter"
                className="absolute -top-2 -right-2 w-28 h-36 object-cover rounded-2xl shadow-2xl border-4 border-white/20 hover:scale-105 hover:z-20 transition-all duration-300"
              />

              {/* Bottom-left corner */}
              <motion.img
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Healthy salad"
                className="absolute -bottom-2 -left-2 w-28 h-32 object-cover rounded-2xl shadow-2xl border-4 border-white/20 hover:scale-105 hover:z-20 transition-all duration-300"
              />

              {/* Bottom-right corner */}
              <motion.img
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Tacos"
                className="absolute -bottom-3 -right-3 w-30 h-28 object-cover rounded-2xl shadow-2xl border-4 border-white/20 hover:scale-105 hover:z-20 transition-all duration-300"
              />

              {/* Center overlay content - higher z-index */}
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center px-8 py-6 rounded-2xl backdrop-blur-md shadow-2xl"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <div className="text-5xl mb-2">🌍</div>
                  <p className="text-2xl font-bold text-white">50+ Countries</p>
                  <p className="text-sm text-white/80">Authentic Recipes</p>
                </motion.div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-white/40 animate-pulse" />
              <div
                className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-white/30 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-1/2 right-1/3 w-4 h-4 rounded-full bg-white/20 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                {
                  icon: BookOpen,
                  value: "150+",
                  label: "Recipes",
                  color: "#ff6b6b",
                },
                {
                  icon: Clock,
                  value: "48h",
                  label: "Response",
                  color: "#4ecdc4",
                },
                {
                  icon: Users,
                  value: "10K+",
                  label: "Users",
                  color: "#feca57",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <stat.icon
                    size={24}
                    className="mx-auto mb-2"
                    style={{ color: stat.color }}
                  />
                  <p
                    className="text-xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Submit Your Request
            </h3>

            <div className="space-y-5">
              {/* Row 1: Dish Name + Country (side by side) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-medium mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    <UtensilsCrossed size={16} style={{ color: "#ff6b6b" }} />
                    Dish Name
                  </label>
                  <input
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g., Pad Thai, Biryani..."
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/50"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="flex items-center gap-2 text-sm font-medium mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    <Globe size={16} style={{ color: "#4ecdc4" }} />
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/50 cursor-pointer"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--card-border)",
                      color: selectedCountry
                        ? "var(--foreground)"
                        : "var(--foreground-secondary)",
                    }}
                  >
                    <option value="">Select country...</option>
                    {allCountries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Validation Message */}
              <AnimatePresence>
                {validation.message && dishName && selectedCountry && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-xl text-sm flex items-center gap-2 ${
                      validation.showError
                        ? "bg-red-500/10 text-red-500"
                        : validation.isUnknown
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {validation.showError ? (
                      <XCircle size={16} />
                    ) : validation.isUnknown ? (
                      <Info size={16} />
                    ) : (
                      <CheckCircle size={16} />
                    )}
                    {validation.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <Mail size={16} style={{ color: "#feca57" }} />
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/50"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--card-border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Message (optional) */}
              <div>
                <label
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <MessageSquare size={16} style={{ color: "#a29bfe" }} />
                  Additional Details{" "}
                  <span className="text-xs opacity-60">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any specific variations or notes..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/50 resize-none"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--card-border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={
                  canSubmit
                    ? {
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(255,107,107,0.3)",
                      }
                    : {}
                }
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  canSubmit ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                style={{
                  background: canSubmit
                    ? "var(--accent-gradient)"
                    : "var(--background)",
                  color: canSubmit ? "white" : "var(--foreground-secondary)",
                  border: canSubmit ? "none" : "1px solid var(--card-border)",
                }}
              >
                <Send size={18} />
                {isSubmitting ? "Sending Request..." : "Submit Recipe Request"}
              </motion.button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 p-4 rounded-xl bg-green-500/10 text-green-500 text-center text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Your request has been submitted!
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 p-4 rounded-xl bg-red-500/10 text-red-500 text-center text-sm flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Failed to send. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
