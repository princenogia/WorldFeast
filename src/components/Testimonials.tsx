"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, USA",
    avatar: "👩‍🍳",
    rating: 5,
    text: "WorldFeast has transformed my cooking! I've made dishes from 5 different continents this month alone.",
  },
  {
    id: 2,
    name: "Marco Rossi",
    location: "Milan, Italy",
    avatar: "👨‍🍳",
    rating: 5,
    text: "As an Italian chef, I was skeptical. But the global recipes here are genuinely authentic!",
  },
  {
    id: 3,
    name: "Aisha Okonkwo",
    location: "Lagos, Nigeria",
    avatar: "👩‍🦱",
    rating: 5,
    text: "Finally, a platform that showcases African cuisine properly! The Jollof Rice recipe is spot-on.",
  },
  {
    id: 4,
    name: "Kenji Tanaka",
    location: "Tokyo, Japan",
    avatar: "🧑‍🍳",
    rating: 5,
    text: "The attention to detail in the Japanese recipes is impressive. True umami flavors!",
  },
  {
    id: 5,
    name: "Maria Garcia",
    location: "Mexico City, Mexico",
    avatar: "👩‍🦳",
    rating: 5,
    text: "From tacos to mole, every Mexican recipe reminds me of my grandmother's cooking.",
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => (
  <div
    className="w-[350px] shrink-0 p-6 rounded-2xl mx-4 relative"
    style={{
      background: "var(--card-bg)",
      border: "1px solid var(--card-border)",
      boxShadow: "var(--card-shadow)",
    }}
  >
    {/* Quote icon */}
    <Quote
      size={32}
      className="absolute top-4 right-4 opacity-10"
      style={{ color: "#ff6b6b" }}
    />

    {/* Rating */}
    <div className="flex gap-0.5 mb-3">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={14} fill="#feca57" stroke="#feca57" />
      ))}
    </div>

    {/* Quote */}
    <p
      className="text-sm leading-relaxed mb-4"
      style={{ color: "var(--foreground-secondary)" }}
    >
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-3">
      <span className="text-2xl">{testimonial.avatar}</span>
      <div>
        <p
          className="font-semibold text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {testimonial.name}
        </p>
        <p className="text-xs" style={{ color: "var(--foreground-secondary)" }}>
          {testimonial.location}
        </p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--background-secondary)" }}
    >
      {/* Decorative gradient orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: "linear-gradient(135deg, #4ecdc4 0%, #44a8b3 100%)",
        }}
      />

      <div className="max-w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-medium tracking-wider uppercase mb-4 block"
            style={{ color: "#ff6b6b" }}
          >
            What People Say
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--foreground)",
            }}
          >
            Loved by <span className="gradient-text">Food Enthusiasts</span>
          </h2>
        </motion.div>

        {/* First Marquee - Left direction */}
        <Marquee direction="left" duration={40} repeat={4} className="mb-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Second Marquee - Right direction */}
        <Marquee direction="right" duration={45} repeat={4}>
          {[...testimonials].reverse().map((testimonial) => (
            <TestimonialCard
              key={`rev-${testimonial.id}`}
              testimonial={testimonial}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
