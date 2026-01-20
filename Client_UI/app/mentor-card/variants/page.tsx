"use client";

import { Mentor } from "../types";
import { MentorCardV2 } from "../components";

// Sample mentor data
const baseMentor: Mentor = {
  id: "mentor-1",
  name: "Rahul Sharma",
  role: "SDE 2",
  company: "Google",
  college: "IIT Delhi",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
  rating: 4.9,
  totalSessions: 47,
  sessionDuration: 45,
  expertise: ["DSA", "System Design", "Behavioral"],
  price: 49,
  tagline: "Great at explaining complex concepts simply",
};

// Variants for different scenarios
const featuredMentors: Mentor[] = [
  {
    ...baseMentor,
    id: "featured-1",
    isTopMentor: true,
  },
  {
    ...baseMentor,
    id: "featured-2",
    name: "Priya Patel",
    role: "SDE 3",
    company: "Microsoft",
    college: "BITS Pilani",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    rating: 4.8,
    totalSessions: 89,
    expertise: ["System Design", "Leadership", "DSA", "HLD"],
    isTopMentor: true,
  },
  {
    ...baseMentor,
    id: "featured-3",
    name: "Amit Kumar",
    role: "Senior Engineer",
    company: "Amazon",
    college: "NIT Trichy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
    rating: 4.7,
    totalSessions: 32,
    expertise: ["DSA", "OOP", "Problem Solving"],
    isTopMentor: false,
  },
];

const browseMentors: Mentor[] = [
  {
    ...baseMentor,
    id: "browse-1",
    about: "Helped 20+ students crack FAANG interviews. I focus on building strong fundamentals and problem-solving intuition.",
  },
  {
    ...baseMentor,
    id: "browse-2",
    name: "Sneha Gupta",
    role: "Software Engineer",
    company: "Flipkart",
    college: "IIIT Hyderabad",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
    rating: 4.6,
    totalSessions: 28,
    expertise: ["DSA", "Backend", "Java"],
    price: 49,
    about: "I believe in learning by doing. My sessions are hands-on with real interview problems.",
  },
  {
    ...baseMentor,
    id: "browse-3",
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "Razorpay",
    college: "DTU",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    rating: 4.9,
    totalSessions: 156,
    sessionDuration: 60,
    expertise: ["System Design", "Architecture", "Distributed Systems", "HLD", "LLD"],
    price: 99,
    about: "5+ years in fintech. I specialize in system design and help you think like a senior engineer.",
  },
];

const pastMentors: Mentor[] = [
  {
    ...baseMentor,
    id: "past-1",
    lastSessionDate: "Jan 5, 2025",
    userRating: 5,
    userSessionCount: 3,
  },
  {
    ...baseMentor,
    id: "past-2",
    name: "Neha Reddy",
    role: "SDE 1",
    company: "Swiggy",
    college: "VIT Vellore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
    rating: 4.5,
    totalSessions: 15,
    expertise: ["DSA", "Python", "Communication"],
    price: 49,
    lastSessionDate: "Dec 20, 2024",
    userRating: 4,
    userSessionCount: 1,
  },
  {
    ...baseMentor,
    id: "past-3",
    name: "Arjun Mehta",
    role: "Senior SDE",
    company: "Google",
    college: "IIT Bombay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
    rating: 5.0,
    totalSessions: 203,
    sessionDuration: 60,
    expertise: ["System Design", "DSA", "Behavioral", "Leadership"],
    price: 99,
    lastSessionDate: "Jan 10, 2025",
    userRating: 5,
    userSessionCount: 5,
  },
];

// Edge cases
const edgeCaseMentors: Mentor[] = [
  // Long name
  {
    ...baseMentor,
    id: "edge-long-name",
    name: "Venkatanarasimharajuvaripeta Krishnamurthy",
    role: "Principal Software Engineer",
    company: "Meta",
  },
  // Many expertise tags
  {
    ...baseMentor,
    id: "edge-many-tags",
    expertise: ["DSA", "System Design", "HLD", "LLD", "Behavioral", "Communication", "Leadership"],
  },
  // Few expertise tags
  {
    ...baseMentor,
    id: "edge-few-tags",
    expertise: ["DSA"],
  },
  // High stats
  {
    ...baseMentor,
    id: "edge-high-stats",
    totalSessions: 1247,
    rating: 5.0,
  },
  // Low stats
  {
    ...baseMentor,
    id: "edge-low-stats",
    totalSessions: 2,
    rating: 4.0,
  },
  // Long tagline
  {
    ...baseMentor,
    id: "edge-long-tagline",
    tagline:
      "I specialize in helping students understand the core fundamentals of data structures and algorithms with a focus on building intuition rather than rote learning",
  },
];

export default function MentorCardVariantsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-bold text-text-primary">
            Mentor Card - All Variants
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Fixed dimensions: 340px height | 3 Variants: Featured, Browse, Past
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Featured Variant */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Featured Variant
            </h2>
            <p className="text-body-sm text-text-secondary">
              For landing page hero sections. Centered layout, gradient header, prominent CTA with price.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMentors.map((mentor) => (
              <MentorCardV2 key={mentor.id} mentor={mentor} variant="featured" />
            ))}
          </div>
        </section>

        {/* Browse Variant */}
        <section className="pt-8 border-t border-border">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Browse Variant
            </h2>
            <p className="text-body-sm text-text-secondary">
              For explore/search pages. Left-aligned, scannable, &quot;View Profile&quot; CTA for comparison.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {browseMentors.map((mentor) => (
              <MentorCardV2 key={mentor.id} mentor={mentor} variant="browse" />
            ))}
          </div>
        </section>

        {/* Past Mentor Variant */}
        <section className="pt-8 border-t border-border">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Past Mentor Variant
            </h2>
            <p className="text-body-sm text-text-secondary">
              For dashboard/history. Shows relationship context (last session, your rating), dual CTA for rebooking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastMentors.map((mentor) => (
              <MentorCardV2 key={mentor.id} mentor={mentor} variant="past" />
            ))}
          </div>
        </section>

        {/* Edge Cases */}
        <section className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Edge Cases
          </h2>
          <p className="text-body-sm text-text-secondary mb-6">
            Testing with long names, many tags, extreme stats, etc.
          </p>

          {/* Featured Edge Cases */}
          <div className="mb-8">
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Featured - Edge Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Long Name</span>
                <MentorCardV2 mentor={edgeCaseMentors[0]} variant="featured" />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Many Tags (7)</span>
                <MentorCardV2 mentor={edgeCaseMentors[1]} variant="featured" />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Few Tags (1)</span>
                <MentorCardV2 mentor={edgeCaseMentors[2]} variant="featured" />
              </div>
            </div>
          </div>

          {/* Browse Edge Cases */}
          <div className="mb-8">
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Browse - Edge Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">High Stats</span>
                <MentorCardV2 mentor={edgeCaseMentors[3]} variant="browse" />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Low Stats</span>
                <MentorCardV2 mentor={edgeCaseMentors[4]} variant="browse" />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Long Tagline</span>
                <MentorCardV2 mentor={edgeCaseMentors[5]} variant="browse" />
              </div>
            </div>
          </div>

          {/* Past Edge Cases */}
          <div>
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Past - Edge Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Long Name</span>
                <MentorCardV2
                  mentor={{
                    ...edgeCaseMentors[0],
                    lastSessionDate: "Jan 15, 2025",
                    userRating: 5,
                    userSessionCount: 2,
                  }}
                  variant="past"
                />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">Many Sessions</span>
                <MentorCardV2
                  mentor={{
                    ...edgeCaseMentors[3],
                    lastSessionDate: "Jan 18, 2025",
                    userRating: 5,
                    userSessionCount: 12,
                  }}
                  variant="past"
                />
              </div>
              <div>
                <span className="text-body-xs text-text-tertiary mb-2 block">First Session</span>
                <MentorCardV2
                  mentor={{
                    ...edgeCaseMentors[4],
                    lastSessionDate: "Jan 19, 2025",
                    userRating: 4,
                    userSessionCount: 1,
                  }}
                  variant="past"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Side by Side Comparison */}
        <section className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Side-by-Side Comparison
          </h2>
          <p className="text-body-sm text-text-secondary mb-6">
            Same mentor data rendered in all 3 variants for direct comparison.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block font-medium">FEATURED</span>
              <MentorCardV2
                mentor={{ ...baseMentor, isTopMentor: true }}
                variant="featured"
              />
            </div>
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block font-medium">BROWSE</span>
              <MentorCardV2 mentor={baseMentor} variant="browse" />
            </div>
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block font-medium">PAST</span>
              <MentorCardV2
                mentor={{
                  ...baseMentor,
                  lastSessionDate: "Jan 5, 2025",
                  userRating: 5,
                  userSessionCount: 3,
                }}
                variant="past"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
