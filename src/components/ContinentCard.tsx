"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Continent } from "@/data/recipes";
import { useState } from "react";

interface ContinentCardProps {
  continent: Continent;
  index: number;
}

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function ContinentCard({
  continent,
  index,
}: ContinentCardProps) {
  const [imageSrc, setImageSrc] = useState(continent.image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/continent/${continent.slug}`}>
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden rounded-3xl cursor-pointer group"
          style={{
            height: "400px",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Background Image */}
          <img
            src={imageSrc}
            alt={continent.name}
            onError={handleImageError}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.7s",
            }}
            className="group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500 z-10"
            style={{
              background: `linear-gradient(to top, ${continent.color}dd 0%, ${continent.color}66 40%, transparent 100%)`,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20">
            <motion.h3
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {continent.name}
            </motion.h3>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              {continent.description}
            </p>

            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              className="h-0.5 bg-white mt-4 group-hover:opacity-100 opacity-0"
            />
          </div>

          {/* Hover Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            →
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
