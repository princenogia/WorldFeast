"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Continent } from "@/data/recipes";
import { ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/continent/${continent.slug}`} className="block group">
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer h-[200px] md:h-[220px]"
          style={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Image */}
          <img
            src={imageSrc}
            alt={continent.name}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Simple dark gradient at bottom for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
            }}
          />

          {/* Name only - positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3
              className="text-xl md:text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {continent.name}
            </h3>
          </div>

          {/* Hover arrow */}
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ArrowRight size={16} strokeWidth={2} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
