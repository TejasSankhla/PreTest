"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button, Container } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { MentorCardV2 } from "@/app/mentor-card/components";
import { Mentor } from "@/app/mentor-card/types";

// Static mentor data
const mentors: Mentor[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "SDE II",
    company: "Google",
    college: "IIT Bombay",
    rating: 4.9,
    totalSessions: 23,
    sessionDuration: 45,
    expertise: ["DSA", "System Design", "Behavioral"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    price: 49,
    isTopMentor: true,
  },
  {
    id: "arjun-patel",
    name: "Arjun Patel",
    role: "SDE",
    company: "Amazon",
    college: "BITS Pilani",
    rating: 4.8,
    totalSessions: 18,
    sessionDuration: 45,
    expertise: ["DSA", "Behavioral", "Leadership"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    price: 49,
    isTopMentor: true,
  },
  {
    id: "sneha-reddy",
    name: "Sneha Reddy",
    role: "SDE",
    company: "Microsoft",
    college: "NIT Trichy",
    rating: 5.0,
    totalSessions: 31,
    sessionDuration: 45,
    expertise: ["System Design", "DSA", "Backend"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    price: 49,
    isTopMentor: true,
  },
  {
    id: "rahul-kumar",
    name: "Rahul Kumar",
    role: "SDE II",
    company: "Flipkart",
    college: "IIIT Hyderabad",
    rating: 4.7,
    totalSessions: 15,
    sessionDuration: 45,
    expertise: ["DSA", "Backend", "Java"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    price: 49,
    isTopMentor: false,
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
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MentorCardV2 mentor={mentor} variant="featured" />
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
