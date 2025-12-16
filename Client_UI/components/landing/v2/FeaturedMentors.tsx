"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button, Container } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import MentorCard from "./MentorCard";

// Static mentor data
const mentors = [
  {
    name: "Priya Sharma",
    role: "SDE II @ Google",
    college: "Ex-IIT Bombay",
    rating: 4.9,
    sessions: 23,
    expertise: ["DSA", "System Design"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    company: "Google",
  },
  {
    name: "Arjun Patel",
    role: "SDE @ Amazon",
    college: "Ex-BITS Pilani",
    rating: 4.8,
    sessions: 18,
    expertise: ["DSA", "Behavioral"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    company: "Amazon",
  },
  {
    name: "Sneha Reddy",
    role: "SDE @ Microsoft",
    college: "Ex-NIT Trichy",
    rating: 5.0,
    sessions: 31,
    expertise: ["System Design", "DSA"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    company: "Microsoft",
  },
  {
    name: "Rahul Kumar",
    role: "SDE II @ Flipkart",
    college: "Ex-IIIT Hyderabad",
    rating: 4.7,
    sessions: 15,
    expertise: ["DSA", "Backend"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    company: "Flipkart",
  },
];

export default function FeaturedMentors() {
  return (
    <section className="py-24 bg-background">
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
            Practice with engineers who{" "}
            <span className="text-secondary">recently cracked it</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-medium"
          >
            Our mentors are recent grads (6-12 months) from top companies. They
            remember the struggle and know what actually works.
          </motion.p>
        </motion.div>

        {/* Mentor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MentorCard {...mentor} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            rounded="full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            <Link href={ROUTES.exploreMentors}>View All Mentors</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
