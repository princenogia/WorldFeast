"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Utensils,
  ChefHat,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Discover",
    cuisineWord: "Asian",
    subtitle: "Cuisine",
    description:
      "Explore authentic recipes from every continent. From Asian delicacies to European classics.",
    Icon: Globe,
    accent: "#ff6b6b",
    iconBg: "rgba(255, 107, 107, 0.15)",
    bgImage:
      "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: 2,
    title: "Master",
    cuisineWord: "Japanese",
    subtitle: "Cooking",
    description:
      "From sushi to curries, discover the secrets of Eastern cooking traditions.",
    Icon: Utensils,
    accent: "#4ecdc4",
    iconBg: "rgba(78, 205, 196, 0.15)",
    bgImage:
      "https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: 3,
    title: "Experience",
    cuisineWord: "Italian",
    subtitle: "Classics",
    description:
      "Pasta, pastries, paella - bring the taste of Europe to your kitchen.",
    Icon: ChefHat,
    accent: "#feca57",
    iconBg: "rgba(254, 202, 87, 0.15)",
    bgImage:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: 4,
    title: "Savor",
    cuisineWord: "African",
    subtitle: "Heritage",
    description:
      "Jollof rice, tagine, injera - discover the rich and vibrant flavors of Africa.",
    Icon: Flame,
    accent: "#e17055",
    iconBg: "rgba(225, 112, 85, 0.15)",
    bgImage:
      "https://images.pexels.com/photos/5836635/pexels-photo-5836635.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startInterval();
  }, [startInterval]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startInterval();
  }, [startInterval]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      startInterval();
    },
    [currentSlide, startInterval],
  );

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  const slide = slides[currentSlide];
  const SlideIcon = slide.Icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Centered on mobile, Left aligned on larger */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl w-full md:w-auto mx-auto md:mx-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-center md:text-left"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl mb-5 mx-auto md:mx-0"
              style={{ background: slide.iconBg }}
            >
              <SlideIcon
                size={28}
                strokeWidth={1.5}
                style={{ color: slide.accent }}
                className="md:w-8 md:h-8"
              />
            </motion.div>

            {/* Title + Cuisine Word + Subtitle */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="text-white">{slide.title} </span>
              <span className="gradient-text">{slide.cuisineWord}</span>
              <br />
              <span className="gradient-text">{slide.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-md text-white/80 mx-auto md:mx-0">
              {slide.description}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: `0 15px 40px ${slide.accent}40`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContent}
              className="px-6 py-3 rounded-full text-white font-semibold text-base transition-all duration-300"
              style={{
                background: "var(--accent-gradient)",
                boxShadow: `0 8px 25px ${slide.accent}30`,
              }}
            >
              Start Exploring
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex gap-2 mt-8 justify-center md:justify-start">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  index === currentSlide
                    ? slide.accent
                    : "rgba(255,255,255,0.4)",
                width: index === currentSlide ? "24px" : "8px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Arrow Navigation - At screen edges */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <ChevronLeft size={24} strokeWidth={2} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <ChevronRight size={24} strokeWidth={2} className="text-white" />
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToContent}
        >
          <span className="text-xs font-medium text-white/70">
            Scroll to explore
          </span>
          <ChevronDown size={20} className="text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
