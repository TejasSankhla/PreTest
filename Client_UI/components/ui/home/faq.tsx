"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/atoms";

const faqs = [
  {
    question: "What is PreTest?",
    answer:
      "PreTest is a community-powered mock interview platform where students practice with recent grads from top companies like Google, Amazon, Microsoft, and Flipkart. We connect you with mentors who recently cracked the interviews you're preparing for.",
  },
  {
    question: "How do sessions work?",
    answer:
      "Each session is a 60-minute video call with your chosen mentor. You'll practice real interview questions in a realistic environment, receive live feedback, and get a detailed written report within 24 hours after the session.",
  },
  {
    question: "How much does a session cost?",
    answer:
      "Sessions are priced at ₹49-99 depending on the mentor's expertise and experience. We're currently offering a launch discount at ₹49/session. Mentors receive 90% of the session price, with 10% going to platform infrastructure.",
  },
  {
    question: "Who are the mentors on PreTest?",
    answer:
      "Our mentors are recent graduates (6-12 months out) from top companies like Google, Amazon, Microsoft, and Flipkart. They remember the struggle, know what actually gets asked, and provide honest feedback because they just went through it themselves.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "You can reschedule or cancel up to 24 hours before your session for a full refund. For cancellations within 24 hours, please contact our support team and we'll do our best to accommodate you.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all payments are processed securely through Razorpay, India's leading payment gateway. We use industry-standard encryption and never store your card details on our servers.",
  },
  {
    question: "What topics can I practice?",
    answer:
      "You can practice DSA (Data Structures & Algorithms), System Design, Behavioral interviews, and more. Each mentor lists their areas of expertise, so you can pick someone who specializes in what you need.",
  },
  {
    question: "What's included in the feedback?",
    answer:
      "You'll receive verbal feedback during the session and a detailed written report within 24 hours. The report covers your problem-solving approach, communication skills, technical accuracy, and specific areas to improve.",
  },
];

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
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 bg-background"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-5 sm:p-6 text-left"
                onClick={() => toggleOpen(index)}
              >
                <span className="text-base sm:text-lg font-semibold text-text-primary pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-text-secondary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-text-secondary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
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
            href="mailto:support@pretest.in"
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
