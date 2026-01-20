"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/atoms";

const painPoints = [
  {
    title: "Knowledge ≠ Performance",
    description: "You know the answer but can't explain your thinking under pressure.",
  },
  {
    title: "No Practice Partners",
    description: "Most students don't have seniors at top companies to practice with.",
  },
  {
    title: "Generic Prep Resources",
    description: "YouTube tutorials and courses don't simulate the real interview stress.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-background-subtle border-y border-border">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Problem Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold tracking-tight-v2 text-text-primary mb-6 leading-tight"
            >
              You can solve 300 LeetCode problems and still{" "}
              <span className="text-secondary">freeze when someone&apos;s watching.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-secondary mb-12 font-medium"
            >
              That&apos;s the gap. <span className="font-bold text-text-primary">Preparation ≠ Practice.</span>
            </motion.p>

            {/* Pain Points */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {painPoints.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {point.title}
                    </h3>
                    <p className="text-base text-text-secondary leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated Diagram */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-6 relative">
              {/* Preparation Card (Left) */}
              <motion.div
                className="bg-background rounded-2xl p-6 border border-border shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Preparation</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="w-3 h-3 text-success flex-shrink-0" />
                    <span>300 LeetCode</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="w-3 h-3 text-success flex-shrink-0" />
                    <span>50 System Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="w-3 h-3 text-success flex-shrink-0" />
                    <span>YouTube tutorials</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-text-tertiary">Alone • Unlimited time</span>
                </div>
              </motion.div>

              {/* Practice Card (Right) */}
              <motion.div
                className="bg-background rounded-2xl p-6 border border-error shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <X className="w-5 h-5 text-error" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Practice</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <X className="w-3 h-3 text-error flex-shrink-0" />
                    <span>Being watched</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <X className="w-3 h-3 text-error flex-shrink-0" />
                    <span>Real pressure</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <X className="w-3 h-3 text-error flex-shrink-0" />
                    <span>60 min deadline</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-text-tertiary">Interview • Timed</span>
                </div>
              </motion.div>

              {/* Gap Symbol - Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-background border-2 border-error shadow-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-2xl font-bold text-error">≠</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-text-primary">
                That&apos;s the gap <span className="text-secondary">we close.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
