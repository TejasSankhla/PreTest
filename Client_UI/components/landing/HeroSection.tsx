"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRight } from "lucide-react";
import OrbitingLogos from "./OrbitingLogos";
import {
  fadeInUp,
  staggerContainer,
  textReveal,
} from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-8 md:py-12 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-orange-50/30" />

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-0 -right-40 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Social Proof - Glass UI Badge */}
      <motion.div
        className="absolute top-24 inset-x-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/40 backdrop-blur-xl rounded-full shadow-lg border border-white/50 ring-1 ring-black/5">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/70 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">P</div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white/70 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">R</div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white/70 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">A</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-bold text-gray-900">200+</span> students practicing
          </div>
        </div>
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Orbiting logos around the headline */}
        <OrbitingLogos>
          {/* Minimal Sun - Clean center content */}
          <motion.div
            className="flex flex-col items-center text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main Headline - Bold & Clean */}
            <motion.div variants={textReveal} className="mb-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                Preparation
              </h1>
              <div className="flex items-center justify-center gap-3 mt-1">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500">
                  ≠
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                  Practice
                </h1>
              </div>
            </motion.div>

            {/* Subheadline - Simple */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-500 mb-6"
            >
              That&apos;s the gap we close.
            </motion.p>

            {/* CTA Button - The only action */}
            <motion.div variants={fadeInUp}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 group"
              >
                <Link href="/explore-mentors" className="flex items-center gap-2">
                  Start Practicing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </OrbitingLogos>

      </div>

      {/* Floating Trust Badges - Positioned at bottom corners */}
      <div className="hidden lg:block">
        {/* Left side badge */}
        <motion.div
          className="absolute z-20 left-8 xl:left-16 bottom-36 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-lg">💳</span>
          <span className="text-sm font-medium text-gray-600">No credit card required</span>
        </motion.div>

        {/* Right side badge */}
        <motion.div
          className="absolute z-20 right-8 xl:right-16 bottom-36 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <CheckIcon className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-600">Verified mentors only</span>
        </motion.div>

      </div>

      {/* Mobile: Compact trust bar */}
      <motion.div
        className="lg:hidden absolute z-20 bottom-8 left-4 right-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <span className="flex items-center gap-1">
            <CheckIcon className="w-3 h-3 text-green-500" />
            Free
          </span>
          <span className="flex items-center gap-1">
            <CheckIcon className="w-3 h-3 text-green-500" />
            Verified
          </span>
          <span className="flex items-center gap-1">
            <CheckIcon className="w-3 h-3 text-green-500" />
            200+ students
          </span>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
