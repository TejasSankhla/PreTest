"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSectionV2() {
  return (
    <section className="min-h-screen flex overflow-hidden bg-background w-full pt-14 relative items-center justify-center">
      {/* Background Elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          maskImage: "linear-gradient(to bottom, white, transparent)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="relative w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full py-12 lg:py-0">
        {/* Hero Content */}
        <motion.div
          className="relative z-10 flex flex-col items-start max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100/50 text-secondary text-[11px] font-semibold uppercase tracking-wider mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Community Powered Practice
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter tracking-tight-v2 text-text-primary leading-[0.95] mb-8"
          >
            Master your <br />
            <span className="text-text-tertiary">next interview.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed font-medium tracking-tight"
          >
            Direct access to mentors from top tech companies. No fluff, just
            real mock interviews and actionable feedback.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Link
              href="/explore-mentors"
              className="group bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-[0_1px_2px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Find a Mentor
              <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className="bg-background border border-border text-text-secondary hover:text-text-primary hover:border-border text-sm font-semibold px-6 py-3.5 rounded-full transition-all flex items-center justify-center">
              View Sample Report
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white bg-background-subtle"
              />
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white bg-background-subtle"
              />
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white bg-background-subtle"
              />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-background-subtle flex items-center justify-center text-[10px] font-bold text-text-secondary">
                +2k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-text-secondary mt-0.5">
                Rated 4.9/5 by students
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual / Graphic Side (Centered Orbital) */}
        <div className="relative h-full min-h-[600px] w-full hidden lg:flex items-center justify-center">
          {/* Center Glow */}
          <div className="absolute w-[500px] h-[500px] bg-orange-100/30 blur-[80px] rounded-full" />

          {/* Main Orbital System - Centered in the visual area */}
          <div className="relative w-[420px] h-[420px]">
            {/* Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-background rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-border flex items-center justify-center z-20">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold tracking-tighter shadow-lg shadow-orange-500/25">
                P
              </div>
            </div>

            {/* Orbit Ring 1 - Inner */}
            <div
              className="absolute top-1/2 left-1/2 w-[180px] h-[180px] rounded-full border border-dashed border-gray-200/60 animate-orbit-fast z-10"
              style={{ marginLeft: "-90px", marginTop: "-90px" }}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full shadow-md border border-border flex items-center justify-center animate-counter-rotate-fast">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-info">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full shadow-md border border-border flex items-center justify-center animate-counter-rotate-fast">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500">
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
            </div>

            {/* Orbit Ring 2 - Outer */}
            <div
              className="absolute top-1/2 left-1/2 w-[320px] h-[320px] rounded-full border border-border/80 animate-orbit-slow z-0"
              style={{ marginLeft: "-160px", marginTop: "-160px" }}
            >
              {/* Tech Companies */}
              <div className="absolute top-[5%] left-[75%] w-10 h-10 bg-background rounded-xl shadow-md border border-border flex items-center justify-center animate-counter-rotate-slow">
                <span className="font-bold text-[10px] tracking-tight text-text-primary">G</span>
              </div>
              <div className="absolute bottom-[15%] left-[5%] w-10 h-10 bg-background rounded-xl shadow-md border border-border flex items-center justify-center animate-counter-rotate-slow">
                <span className="font-bold text-[10px] tracking-tight text-text-primary">Ms</span>
              </div>
              <div className="absolute top-[45%] left-[-16px] w-10 h-10 bg-background rounded-xl shadow-md border border-border flex items-center justify-center animate-counter-rotate-slow">
                <span className="font-bold text-[10px] tracking-tight text-text-primary">Amz</span>
              </div>
              <div className="absolute bottom-[5%] right-[20%] w-10 h-10 bg-background rounded-xl shadow-md border border-border flex items-center justify-center animate-counter-rotate-slow">
                <span className="font-bold text-[10px] tracking-tight text-text-primary">Fk</span>
              </div>
            </div>

            {/* Floating Card 1 - Offer Received (Top Right) */}
            <motion.div
              className="absolute -right-16 top-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-44 z-30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 rounded-full bg-success-light flex items-center justify-center text-success border border-green-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-text-primary">Offer Received</div>
                  <div className="text-[9px] text-text-secondary">Google L3</div>
                </div>
              </div>
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full w-full bg-success rounded-full" />
              </div>
            </motion.div>

            {/* Floating Card 2 - Detailed Feedback (Bottom Left) */}
            <motion.div
              className="absolute -left-20 bottom-8 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-border shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-56 z-30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-semibold text-text-primary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Interview Feedback
                </span>
                <span className="text-[11px] font-bold text-secondary bg-orange-50 px-1.5 py-0.5 rounded">9.2/10</span>
              </div>
              <div className="space-y-2">
                {/* Introduction */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-medium">Introduction</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-success rounded-full" />
                    </div>
                    <span className="text-[9px] text-success font-semibold">9.0</span>
                  </div>
                </div>
                {/* Problem Solving */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-medium">Problem Solving</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-secondary rounded-full" />
                    </div>
                    <span className="text-[9px] text-secondary font-semibold">9.5</span>
                  </div>
                </div>
                {/* Communication */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-medium">Communication</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-info rounded-full" />
                    </div>
                    <span className="text-[9px] text-info font-semibold">8.5</span>
                  </div>
                </div>
                {/* Projects */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-medium">Projects</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-purple-500 rounded-full" />
                    </div>
                    <span className="text-[9px] text-purple-600 font-semibold">9.2</span>
                  </div>
                </div>
                {/* Code Quality */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary font-medium">Code Quality</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[88%] bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-[9px] text-emerald-600 font-semibold">8.8</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3 - Live Session Indicator (Top Left) */}
            <motion.div
              className="absolute -left-8 top-12 bg-gray-900 p-2.5 rounded-lg shadow-xl w-36 z-30"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </div>
                <span className="text-[10px] text-white font-medium">Live Session</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-secondary rounded-full" />
                </div>
                <span className="text-[9px] text-gray-400">32:15</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
