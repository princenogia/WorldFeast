"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, USA",
    avatar: "👩‍🍳",
    rating: 5,
    text: "WorldFeast has transformed my cooking! I've made dishes from 5 different continents this month alone. The recipes are authentic and easy to follow.",
  },
  {
    id: 2,
    name: "Marco Rossi",
    location: "Milan, Italy",
    avatar: "👨‍🍳",
    rating: 5,
    text: "As an Italian chef, I was skeptical. But the global recipes here are genuinely authentic. The Pad Thai recipe reminded me of my trip to Bangkok!",
  },
  {
    id: 3,
    name: "Aisha Okonkwo",
    location: "Lagos, Nigeria",
    avatar: "👩‍🦱",
    rating: 5,
    text: "Finally, a platform that showcases African cuisine properly! The Jollof Rice recipe is spot-on. My grandmother would approve!",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--accent)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20">🍜</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20">🥘</div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-10">🌶️</div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase mb-4 block text-white/80">
            What People Say
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Loved by Food Enthusiasts
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/70">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
