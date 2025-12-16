"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/atoms";
import TestimonialCard from "./TestimonialCard";

// Static testimonial data
const testimonials = [
  {
    name: "Rahul Verma",
    college: "NIT Trichy",
    quote:
      "I thought I was ready after 3 months of prep. My first mock showed me I wasn't. Glad I found out here, not at Google.",
    outcome: "Now at Amazon",
    company: "Amazon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RahulV",
  },
  {
    name: "Sneha Patel",
    college: "BITS Pilani",
    quote:
      "The feedback was brutally honest. Exactly what I needed. Fixed my weak spots before my real Microsoft interview.",
    outcome: "Now at Microsoft",
    company: "Microsoft",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaP",
  },
  {
    name: "Arjun Kumar",
    college: "VIT Vellore",
    quote:
      "Practicing with someone who cracked Flipkart 6 months ago was way better than watching YouTube tutorials.",
    outcome: "Now at Flipkart",
    company: "Flipkart",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunK",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight-v2 text-text-primary mb-6"
          >
            Where are they <span className="text-secondary">now?</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium"
          >
            Students who practiced here, succeeded there.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
