"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { continents, recipes } from "@/data/recipes";

// EmailJS configuration - loaded from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_AUTO_REPLY_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "";

// Get all unique countries from continents data
const allCountries = continents.flatMap((c) =>
  c.countries.map((country) => ({
    name: country.name,
    flag: country.flag,
    continent: c.name,
  }))
);

// Build a map of dish names to their countries (case-insensitive)
const dishToCountryMap = new Map<string, string>();
recipes.forEach((recipe) => {
  dishToCountryMap.set(recipe.name.toLowerCase(), recipe.country);
  // Also add without common prefixes
  const simplifiedName = recipe.name
    .toLowerCase()
    .replace(/^(traditional|authentic|classic|homemade)\s+/i, "");
  if (simplifiedName !== recipe.name.toLowerCase()) {
    dishToCountryMap.set(simplifiedName, recipe.country);
  }
});

// Common dishes and their countries for validation (extends existing recipes)
const knownDishes: Record<string, string> = {
  // Japanese
  sushi: "Japan",
  ramen: "Japan",
  tempura: "Japan",
  teriyaki: "Japan",
  udon: "Japan",
  sashimi: "Japan",
  miso: "Japan",
  gyoza: "Japan",
  onigiri: "Japan",
  // Thai
  "pad thai": "Thailand",
  "tom yum": "Thailand",
  "green curry": "Thailand",
  "red curry": "Thailand",
  "massaman curry": "Thailand",
  satay: "Thailand",
  // Indian
  biryani: "India",
  "butter chicken": "India",
  "tikka masala": "India",
  samosa: "India",
  naan: "India",
  dosa: "India",
  paneer: "India",
  korma: "India",
  vindaloo: "India",
  // Italian
  pizza: "Italy",
  pasta: "Italy",
  carbonara: "Italy",
  lasagna: "Italy",
  risotto: "Italy",
  tiramisu: "Italy",
  gelato: "Italy",
  bruschetta: "Italy",
  // French
  croissant: "France",
  baguette: "France",
  "coq au vin": "France",
  ratatouille: "France",
  quiche: "France",
  crepe: "France",
  souffle: "France",
  // Mexican
  tacos: "Mexico",
  burrito: "Mexico",
  enchilada: "Mexico",
  guacamole: "Mexico",
  quesadilla: "Mexico",
  tamale: "Mexico",
  mole: "Mexico",
  churros: "Mexico",
  // Chinese
  "dim sum": "China",
  "kung pao": "China",
  "sweet and sour": "China",
  dumplings: "China",
  "fried rice": "China",
  "spring rolls": "China",
  "peking duck": "China",
  // Spanish
  paella: "Spain",
  tapas: "Spain",
  gazpacho: "Spain",
  "spanish tortilla": "Spain",
  // Greek
  moussaka: "Greece",
  souvlaki: "Greece",
  gyros: "Greece",
  tzatziki: "Greece",
  spanakopita: "Greece",
  // Korean
  kimchi: "South Korea",
  bibimbap: "South Korea",
  bulgogi: "South Korea",
  "korean bbq": "South Korea",
  japchae: "South Korea",
  // Vietnamese
  pho: "Vietnam",
  "banh mi": "Vietnam",
  "vietnamese spring rolls": "Vietnam",
  "bun cha": "Vietnam",
  // Brazilian
  feijoada: "Brazil",
  churrasco: "Brazil",
  brigadeiro: "Brazil",
  acai: "Brazil",
  // Other
  poutine: "Canada",
  "meat pie": "Australia",
  pavlova: "New Zealand",
  hangi: "New Zealand",
  "jollof rice": "Nigeria",
  tagine: "Morocco",
  injera: "Ethiopia",
  hummus: "Israel",
  falafel: "Israel",
  ceviche: "Peru",
  empanada: "Argentina",
  asado: "Argentina",
  koshari: "Egypt",
  schnitzel: "Germany",
  bratwurst: "Germany",
  pretzel: "Germany",
  "fish and chips": "United Kingdom",
  "shepherd's pie": "United Kingdom",
  "full english": "United Kingdom",
};

interface RequestRecipeProps {
  className?: string;
}

export default function RequestRecipe({ className = "" }: RequestRecipeProps) {
  const [dishName, setDishName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Check if dish belongs to selected country
  const validation = useMemo(() => {
    if (!dishName.trim() || !selectedCountry) {
      return { isValid: false, message: "", showError: false };
    }

    const normalizedDish = dishName.toLowerCase().trim();

    // Check in our known dishes map
    const expectedCountry = knownDishes[normalizedDish];

    // Also check from existing recipes
    const recipeCountry = dishToCountryMap.get(normalizedDish);

    const matchedCountry = expectedCountry || recipeCountry;

    if (!matchedCountry) {
      // Unknown dish - allow submission but show info message
      return {
        isValid: true,
        message: "We'll verify this dish and add it if authentic!",
        showError: false,
        isUnknown: true,
      };
    }

    if (matchedCountry === selectedCountry) {
      return {
        isValid: true,
        message: `✓ ${dishName} is a traditional ${selectedCountry} dish!`,
        showError: false,
      };
    }

    return {
      isValid: false,
      message: `This dish doesn't belong to ${selectedCountry}. It's from ${matchedCountry}.`,
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
        // Check if EmailJS is configured
        if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID) {
          // EmailJS not configured - log to console and show success for demo
          console.log("📧 Recipe Request (EmailJS not configured):", {
            dish_name: dishName,
            country: selectedCountry,
            user_email: email,
            message: message || "No additional message",
          });

          // Show success for demo purposes
          setSubmitStatus("success");
          setDishName("");
          setSelectedCountry("");
          setEmail("");
          setMessage("");
          return;
        }

        console.log("Sending email with config:", {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY ? "Set" : "Not set",
        });

        // Send email to site owner via EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            dish_name: dishName,
            country: selectedCountry,
            user_email: email,
            message: message || "No additional message",
          },
          EMAILJS_PUBLIC_KEY
        );

        console.log("Main email sent successfully!");

        // Send auto-reply to the user
        if (EMAILJS_AUTO_REPLY_TEMPLATE_ID) {
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_AUTO_REPLY_TEMPLATE_ID,
              {
                // Recipient
                to_email: email,
                // Dish details - use same variable names as your template
                dish_name: dishName,
                country: selectedCountry,
                user_email: email,
                message: message || "No additional message",
              },
              EMAILJS_PUBLIC_KEY
            );
            console.log("Auto-reply sent successfully!");
          } catch (autoReplyError) {
            console.error(
              "Auto-reply failed (main email was sent):",
              autoReplyError
            );
          }
        }

        setSubmitStatus("success");
        setDishName("");
        setSelectedCountry("");
        setEmail("");
        setMessage("");
      } catch (error: unknown) {
        console.error("Email send failed:", error);
        if (error && typeof error === "object" && "text" in error) {
          console.error(
            "EmailJS error details:",
            (error as { text: string }).text
          );
        }
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [dishName, selectedCountry, email, message, validation.isValid]
  );

  return (
    <section
      className={`py-20 px-6 ${className}`}
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="max-w-4xl mx-auto">
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
            Request a <span className="gradient-text">Recipe</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Can't find your favorite dish? Request it and we'll add it to our
            collection! Just make sure the dish belongs to the correct country.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Dish Name Input */}
            <div>
              <label
                htmlFor="dishName"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--foreground)" }}
              >
                🍽️ Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g., Pad Thai, Sushi, Tacos..."
                className="w-full px-4 py-3 rounded-xl text-base transition-all focus:outline-none focus:ring-2"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--card-border)",
                  color: "var(--foreground)",
                }}
                required
              />
            </div>

            {/* Country Selector */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--foreground)" }}
              >
                🌍 Country of Origin
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-base transition-all focus:outline-none focus:ring-2 cursor-pointer"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--card-border)",
                  color: "var(--foreground)",
                }}
                required
              >
                <option value="">Select a country...</option>
                {allCountries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.flag} {country.name} ({country.continent})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validation Message */}
          <AnimatePresence mode="wait">
            {(validation.showError || validation.message) &&
              dishName &&
              selectedCountry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <div
                    className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                      validation.showError
                        ? "bg-red-500/10 text-red-500"
                        : validation.isUnknown
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    <span className="text-lg">
                      {validation.showError
                        ? "❌"
                        : validation.isUnknown
                        ? "ℹ️"
                        : "✅"}
                    </span>
                    {validation.message}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              📧 Your Email (we'll notify you when it's added)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl text-base transition-all focus:outline-none focus:ring-2"
              style={{
                background: "var(--background)",
                border: "1px solid var(--card-border)",
                color: "var(--foreground)",
              }}
              required
            />
          </div>

          {/* Optional Message */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              💬 Additional Details (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific variations or details about this dish..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-base transition-all focus:outline-none focus:ring-2 resize-none"
              style={{
                background: "var(--background)",
                border: "1px solid var(--card-border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!validation.isValid || !email.trim() || isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              validation.isValid && email.trim() && !isSubmitting
                ? "hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            style={{
              background:
                validation.isValid && email.trim()
                  ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)"
                  : "var(--background)",
              color:
                validation.isValid && email.trim()
                  ? "white"
                  : "var(--foreground-secondary)",
              border:
                validation.isValid && email.trim()
                  ? "none"
                  : "1px solid var(--card-border)",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Sending Request...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>📨</span> Submit Recipe Request
              </span>
            )}
          </button>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-xl bg-green-500/10 text-green-500 text-center font-medium"
              >
                🎉 Thank you! Your recipe request has been submitted. We'll
                review it and add it soon!
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-xl bg-red-500/10 text-red-500 text-center font-medium"
              >
                ❌ Failed to send request. Please try again or contact us
                directly.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Info Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-sm"
          style={{ color: "var(--foreground-secondary)" }}
        >
          💡 Tip: We validate dishes against their traditional countries of
          origin. If you're unsure, we'll research it for you!
        </motion.p>
      </div>
    </section>
  );
}
