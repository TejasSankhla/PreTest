"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  "Detailed written feedback report",
  "Resume review included",
  "100% money-back guarantee",
];

const stats = [
  { value: "200+", label: "Interviews" },
  { value: "4.9/5", label: "Rating" },
  { value: "45+", label: "Mentors" },
  { value: "₹0", label: "Platform Fees", highlight: true },
];

export default function StatsSectionV2() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-6"
              style={{ letterSpacing: "-0.04em" }}
            >
              Not just another{" "}
              <span className="text-gray-400">mock interview.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 leading-relaxed font-medium"
            >
              PreTest is built on the belief that context matters. Our mentors
              have cracked the specific companies you are targeting.
            </motion.p>
            <motion.ul variants={fadeInUp} className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="font-medium text-sm">{feature}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-8 rounded-2xl ${
                  stat.highlight
                    ? "bg-secondary shadow-lg shadow-orange-500/20 border border-orange-400"
                    : "bg-white shadow-sm border border-gray-100"
                }`}
              >
                <div
                  className={`text-4xl font-bold mb-1 tracking-tighter ${
                    stat.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    stat.highlight ? "text-orange-100" : "text-gray-400"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
