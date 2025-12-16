"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/atoms";

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background-subtle border-t border-border">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl lg:text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight-v2 text-text-primary mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {/* 1 faq */}
          <motion.div
            className="rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 bg-background"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(0)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-text-primary">
                What is PreTest?
              </span>
              {openIndex === 0 ? (
                <ChevronUp className="h-5 w-5 text-text-secondary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              )}
            </button>
            {openIndex === 0 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  PreTest is a community-powered mock interview platform where students practice with recent grads from top companies like Google, Amazon, Microsoft, and Flipkart. We connect you with mentors who recently cracked the interviews you're preparing for.
                </p>
              </div>
            )}
          </motion.div>

          {/* 2 faq */}
          <motion.div
            className="rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 bg-background"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(1)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-text-primary">
                How much does a session cost?
              </span>
              {openIndex === 1 ? (
                <ChevronUp className="h-5 w-5 text-text-secondary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              )}
            </button>
            {openIndex === 1 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Sessions are priced at ₹49-99 depending on the mentor's expertise and experience. We're currently offering a launch discount at ₹49/session. Mentors receive 90% of the session price, with 10% going to platform infrastructure.
                </p>
              </div>
            )}
          </motion.div>

          {/* 3 faq */}
          <motion.div
            className="rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 bg-background"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(2)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-text-primary">
                Who are the mentors on PreTest?
              </span>
              {openIndex === 2 ? (
                <ChevronUp className="h-5 w-5 text-text-secondary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              )}
            </button>
            {openIndex === 2 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Our mentors are recent graduates (6-12 months out) from top companies like Google, Amazon, Microsoft, and Flipkart. They remember the struggle, know what actually gets asked, and provide honest feedback because they just went through it themselves.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.p
          className="text-sm sm:text-base mt-8 text-center text-text-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Can&apos;t find what you&apos;re looking for?{" "}
          <a
            href="#"
            title=""
            className="font-semibold text-text-primary hover:underline"
          >
            Contact our support
          </a>
        </motion.p>
      </Container>
    </section>
  );
}

export default Faq;
