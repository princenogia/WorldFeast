"use client";

import { use, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import RecipeProgressTracker, {
  RecipeProgressTrackerRef,
} from "@/components/RecipeProgressTracker";
import VoiceRecipeAssistant from "@/components/VoiceRecipeAssistant";
import ServingsAdjuster from "@/components/ServingsAdjuster";
import ScalableIngredientsList from "@/components/ScalableIngredientsList";
import Footer from "@/components/Footer";
import { getRecipeById, getRecipesByContinent } from "@/data/recipes";
import { getRecipeImage } from "@/data/foodImages";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default function RecipePage({ params }: RecipePageProps) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  const [currentServings, setCurrentServings] = useState(recipe?.servings || 4);
  const [currentStep, setCurrentStep] = useState(0);
  const [readingStep, setReadingStep] = useState<number | undefined>(undefined);

  // Ref for controlling the progress tracker timer
  const progressTrackerRef = useRef<RecipeProgressTrackerRef>(null);

  // Shared state for completed steps - managed at page level
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(recipe?.instructions.length || 0).fill(false)
  );

  // Force refresh key for progress tracker
  const [refreshKey, setRefreshKey] = useState(0);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRecipesByContinent(recipe.continent)
    .filter((r) => r.id !== recipe.id)
    .slice(0, 3);

  const difficultyColors = {
    Easy: "#26de81",
    Medium: "#feca57",
    Hard: "#ff6b6b",
  };

  // Complete a step (from voice assistant or progress tracker)
  const completeStep = useCallback((stepIndex: number) => {
    setCompletedSteps((prev) => {
      const newCompleted = [...prev];
      newCompleted[stepIndex] = true;
      return newCompleted;
    });
  }, []);

  // Handle step completion from voice assistant
  const handleVoiceStepComplete = useCallback(
    (stepIndex: number) => {
      // Mark step as complete
      completeStep(stepIndex);

      // Move to next step
      const nextStep = stepIndex + 1;
      if (nextStep < recipe.instructions.length) {
        setCurrentStep(nextStep);
        setReadingStep(nextStep);
      }

      // Clear reading indicator after a delay
      setTimeout(() => setReadingStep(undefined), 3000);

      // Force refresh of progress tracker
      setRefreshKey((prev) => prev + 1);
    },
    [completeStep, recipe.instructions.length]
  );

  // Handle step change from voice assistant
  const handleStepChange = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
    setReadingStep(stepIndex);
    // Clear reading indicator after speech finishes (approx)
    setTimeout(() => setReadingStep(undefined), 5000);
  }, []);

  // Handle current step update from progress tracker
  const handleCurrentStepChange = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  // Handle step toggle from progress tracker
  const handleStepToggle = useCallback(
    (stepIndex: number, isCompleted: boolean) => {
      setCompletedSteps((prev) => {
        const newCompleted = [...prev];
        newCompleted[stepIndex] = isCompleted;
        return newCompleted;
      });

      // Update current step to first uncompleted
      setCompletedSteps((prev) => {
        const firstUncompleted = prev.findIndex((c) => !c);
        if (firstUncompleted !== -1) {
          setCurrentStep(firstUncompleted);
        }
        return prev;
      });
    },
    []
  );

  // Handle start timer from voice assistant
  const handleStartTimer = useCallback((stepIndex: number) => {
    if (progressTrackerRef.current) {
      progressTrackerRef.current.startTimer(stepIndex);
    }
  }, []);

  // Handle stop timer from voice assistant
  const handleStopTimer = useCallback(() => {
    if (progressTrackerRef.current) {
      progressTrackerRef.current.stopTimer();
    }
  }, []);

  // Handle timer complete notification (for voice feedback)
  const handleTimerComplete = useCallback((stepIndex: number) => {
    // The progress tracker shows the visual alert
    // We could add voice feedback here if needed
    console.log(`Timer complete for step ${stepIndex + 1}`);
  }, []);

  // Get step times with default
  const stepTimes = recipe.stepTimes || recipe.instructions.map(() => 5);

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Header />

      {/* Recipe Hero */}
      <section className="pt-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 pt-8"
          >
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:opacity-70"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  Home
                </Link>
              </li>
              <li style={{ color: "var(--foreground-secondary)" }}>/</li>
              <li>
                <Link
                  href={`/continent/${recipe.continent}`}
                  className="transition-colors hover:opacity-70 capitalize"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  {recipe.continent}
                </Link>
              </li>
              <li style={{ color: "var(--foreground-secondary)" }}>/</li>
              <li style={{ color: "var(--foreground)" }}>{recipe.name}</li>
            </ol>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden aspect-square"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getRecipeImage(recipe.id)})` }}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    color: "var(--foreground)",
                  }}
                >
                  {recipe.country}
                </span>
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
                  style={{ background: difficultyColors[recipe.difficulty] }}
                >
                  {recipe.difficulty}
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                {recipe.name}
              </h1>

              <p
                className="text-lg mb-8 leading-relaxed"
                style={{ color: "var(--foreground-secondary)" }}
              >
                {recipe.description}
              </p>

              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--foreground-secondary)" }}
                    >
                      Cook Time
                    </p>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {recipe.cookTime}
                    </p>
                  </div>
                </div>
                <ServingsAdjuster
                  baseServings={recipe.servings}
                  onServingsChange={setCurrentServings}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: "var(--background-secondary)",
                      color: "var(--accent)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                <span className="text-3xl">🥗</span>
                Ingredients
                {currentServings !== recipe.servings && (
                  <span
                    className="text-sm font-normal ml-2 px-2 py-1 rounded-full"
                    style={{
                      background: "var(--accent)",
                      color: "white",
                    }}
                  >
                    Adjusted for {currentServings}
                  </span>
                )}
              </h2>
              <ScalableIngredientsList
                ingredients={recipe.ingredients}
                baseServings={recipe.servings}
                currentServings={currentServings}
                recipeId={recipe.id}
              />
            </motion.div>

            {/* Instructions with Progress Tracker */}
            <div className="lg:col-span-2 fade-in-up">
              <h2
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--foreground)",
                }}
              >
                <span className="text-3xl">👨‍🍳</span>
                Instructions
              </h2>
              <RecipeProgressTracker
                ref={progressTrackerRef}
                key={refreshKey}
                instructions={recipe.instructions}
                stepTimes={stepTimes}
                onCurrentStepChange={handleCurrentStepChange}
                onStepToggle={handleStepToggle}
                onTimerComplete={handleTimerComplete}
                readingStep={readingStep}
                externalCompletedSteps={completedSteps}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section
          className="py-16 px-6"
          style={{ background: "var(--background)" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--foreground)",
              }}
            >
              More from{" "}
              <span className="gradient-text capitalize">
                {recipe.continent}
              </span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRecipes.map((related, index) => (
                <RecipeCard key={related.id} recipe={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voice Recipe Assistant */}
      <VoiceRecipeAssistant
        instructions={recipe.instructions}
        currentStep={currentStep}
        onStepComplete={handleVoiceStepComplete}
        onStepChange={handleStepChange}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
        recipeName={recipe.name}
        stepTimes={stepTimes}
      />

      <Footer />
    </main>
  );
}
