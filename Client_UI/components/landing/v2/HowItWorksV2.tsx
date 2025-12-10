"use client";

import { motion } from "framer-motion";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HowItWorksV2() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            The process is <span className="text-secondary">simple</span>.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-500 font-medium"
          >
            Streamlined for your growth. From selection to feedback in three
            steps.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 md:grid-rows-2 gap-5 h-auto md:h-[600px]">
          {/* Card 1: Create Profile (Small) */}
          <motion.div
            className="md:col-span-2 md:row-span-1 bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between overflow-hidden group hover:border-gray-200 transition-all relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary shadow-sm border border-gray-100 mb-4">
                <span className="font-bold text-sm">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                Create Profile
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tell us your target roles and we&apos;ll match the context.
              </p>
            </div>
            {/* Visual decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-3 shadow-sm opacity-80 scale-100 group-hover:scale-105 transition-transform origin-bottom-left">
              <div className="flex gap-2 items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-100" />
                <div className="h-2 w-20 bg-gray-100 rounded-full" />
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full mb-1" />
              <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
            </div>
          </motion.div>

          {/* Card 2: Select Mentor (Large/Wide) */}
          <motion.div
            className="md:col-span-4 md:row-span-1 bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden group hover:border-gray-200 transition-all flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col justify-between relative z-10 md:w-1/2">
              <div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-secondary shadow-sm border border-gray-100 mb-4">
                  <span className="font-bold text-sm">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Select Mentor
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Browse mentors by company, college, or expertise. Filter by
                  price and availability.
                </p>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-semibold text-secondary cursor-pointer hover:gap-2 transition-all">
                Browse Mentors <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            {/* Mock UI */}
            <div className="md:w-1/2 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-50 to-transparent z-10 md:hidden" />
              <div className="flex flex-col gap-3 md:absolute md:top-2 md:-right-10 md:w-[110%] group-hover:translate-x-2 transition-transform duration-500">
                {/* Mentor Card 1 */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    className="w-10 h-10 rounded-full bg-gray-50"
                    alt=""
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      SDE II @ Google
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Ex-IIT Bombay
                    </div>
                  </div>
                  <div className="ml-auto bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
                    Available
                  </div>
                </div>
                {/* Mentor Card 2 */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 opacity-80">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    className="w-10 h-10 rounded-full bg-gray-50"
                    alt=""
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      Eng Manager @ Uber
                    </div>
                    <div className="text-[10px] text-gray-400">
                      100+ Interviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Live Practice (Dark) */}
          <motion.div
            className="md:col-span-3 md:row-span-1 bg-gray-900 rounded-3xl p-8 border border-gray-800 text-white relative overflow-hidden flex flex-col justify-between group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4 backdrop-blur-sm border border-white/10">
                <span className="font-bold text-sm">3</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Live Practice
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                60-minute video interview in a real coding environment.
              </p>
            </div>
            {/* Mock Video UI */}
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gray-800 rounded-tl-3xl border-t border-l border-gray-700 p-4 translate-y-4 translate-x-4 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-[10px] text-gray-500 font-mono">REC</div>
              </div>
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600 relative z-10"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <div className="absolute bottom-4 right-4 w-12 h-16 bg-gray-700 rounded border border-gray-600 shadow-lg" />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Feedback (Orange) */}
          <motion.div
            className="md:col-span-3 md:row-span-1 bg-secondary rounded-3xl p-8 border border-orange-400 text-white relative overflow-hidden flex flex-col justify-between group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4 backdrop-blur-sm border border-white/20">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                Detailed Feedback
              </h3>
              <p className="text-sm text-orange-100 leading-relaxed max-w-sm">
                Get a comprehensive scorecard highlighting your strengths and
                areas to improve.
              </p>
            </div>
            {/* Decorative Rings */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-white/10 rounded-full group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 border-[20px] border-white/5 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
