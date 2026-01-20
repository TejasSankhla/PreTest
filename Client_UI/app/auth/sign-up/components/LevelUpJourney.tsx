"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Users, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

interface LevelUpJourneyProps {
  currentStage: number; // 0: locked, 1: name, 2: email, 3: password, 4: complete
  name: string;
  email: string;
  showCelebration: boolean;
}

// Sample mentors with realistic Indian names
const MENTORS = [
  { name: "Rahul Sharma", company: "Google", role: "SDE-2", image: "/companies/google.png", initials: "RS" },
  { name: "Priya Patel", company: "Amazon", role: "SDE-1", image: "/companies/amazon.png", initials: "PP" },
  { name: "Amit Kumar", company: "Microsoft", role: "SDE-2", image: "/companies/microsoft.png", initials: "AK" },
];

// Animation variants
const stageContentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.3 }
  }
};


const confettiColors = ["#f97316", "#3b82f6", "#22c55e", "#a855f7", "#eab308", "#ec4899"];

export function LevelUpJourney({ currentStage, name, email, showCelebration }: LevelUpJourneyProps) {
  const firstName = name?.split(' ')[0] || '';

  return (
    <div className="relative w-full h-full min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Background - Matching Landing Page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern - Same as landing page */}
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
          }}
        />

        {/* Orange Gradient Blur - Same as landing page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] opacity-60" />

        {/* Secondary subtle glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 blur-[80px] rounded-[100%] opacity-40" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 relative z-10">
        <AnimatePresence mode="wait">

          {/* Stage 0: Initial - Unlock your potential */}
          {currentStage === 0 && !showCelebration && (
            <motion.div
              key="stage-0"
              variants={stageContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center max-w-md"
            >
              {/* Icon */}
              <motion.div
                className="mb-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                  <Rocket className="w-9 h-9 text-gray-400" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                Unlock Your Interview Edge
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Join 500+ students practicing with mentors from top companies
              </p>

              {/* Social proof avatars */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-3">
                  {MENTORS.map((mentor, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center overflow-hidden"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Image
                        src={mentor.image}
                        alt={mentor.company}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-body-sm text-text-secondary font-medium">
                  Google, Amazon, Microsoft & more
                </span>
              </div>
            </motion.div>
          )}

          {/* Stage 1: Name entered - Welcome */}
          {currentStage === 1 && !showCelebration && (
            <motion.div
              key="stage-1"
              variants={stageContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center max-w-md"
            >
              {/* Animated avatar */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-secondary to-orange-500 flex items-center justify-center shadow-xl shadow-secondary/25">
                  <span className="text-white text-3xl font-bold">
                    {firstName?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <motion.h3
                className="text-2xl font-bold text-text-primary mb-3 tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hey {firstName}!
              </motion.h3>
              <motion.p
                className="text-text-secondary mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Nice to meet you. Let&apos;s get you connected with mentors who&apos;ve been exactly where you are.
              </motion.p>

              {/* Hint */}
              <motion.div
                className="inline-flex items-center gap-2 text-body-sm text-secondary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Add your email to continue</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}

          {/* Stage 2: Email entered - Mentors ready */}
          {currentStage === 2 && !showCelebration && (
            <motion.div
              key="stage-2"
              variants={stageContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center w-full max-w-sm"
            >
              {/* Icon */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
                Your Mentors Are Ready
              </h3>
              <p className="text-body-sm text-text-secondary mb-6">
                Engineers who recently cracked interviews at:
              </p>

              {/* Mentor cards - cleaner design */}
              <div className="space-y-2.5">
                {MENTORS.map((mentor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100/80 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    {/* Company logo */}
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={mentor.image}
                        alt={mentor.company}
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-text-primary text-body-sm truncate">{mentor.name}</p>
                      <p className="text-body-xs text-text-tertiary">{mentor.role} · {mentor.company}</p>
                    </div>

                    {/* Status dot */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-body-xs text-green-600 font-medium">Online</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-body-xs text-text-tertiary mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                +100 more mentors available
              </motion.p>
            </motion.div>
          )}

          {/* Stage 3: Password entered - Almost there */}
          {currentStage === 3 && !showCelebration && (
            <motion.div
              key="stage-3"
              variants={stageContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center max-w-sm"
            >
              {/* Icon */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/25">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
                You&apos;re Almost There!
              </h3>
              <p className="text-body-sm text-text-secondary mb-8">
                One click away from booking your first mock interview
              </p>

              {/* Simple value prop */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-6 border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <span className="text-body-sm text-text-primary">Pick a mentor from top companies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <span className="text-body-sm text-text-primary">Book a 45-min mock interview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <span className="text-body-sm text-text-primary">Get honest feedback & improve</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA hint */}
              <motion.p
                className="text-body-sm text-secondary font-medium mt-6 flex items-center justify-center gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Hit &quot;Create Account&quot; to get started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.p>
            </motion.div>
          )}

          {/* Stage 4: Complete - Welcome */}
          {(currentStage === 4 || showCelebration) && (
            <motion.div
              key="stage-4"
              variants={stageContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center max-w-sm relative"
            >
              {/* Confetti */}
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    background: confettiColors[i % confettiColors.length],
                    left: '50%',
                    top: '40%',
                  }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 350,
                    y: (Math.random() - 0.5) * 350,
                    scale: [0, 1.2, 0],
                    rotate: Math.random() * 540,
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.04,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Success icon */}
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Content */}
              <motion.h3
                className="text-2xl font-bold text-text-primary mb-3 tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Welcome aboard, {firstName}!
              </motion.h3>
              <motion.p
                className="text-text-secondary mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Your account is ready. Let&apos;s find you a mentor.
              </motion.p>

              <motion.p
                className="text-body-sm text-text-tertiary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Taking you to explore mentors...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom tagline */}
      <motion.div
        className="relative z-10 pb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-body-sm text-text-tertiary font-medium">
          Practice makes perfect. PreTest makes it happen.
        </p>
      </motion.div>
    </div>
  );
}
