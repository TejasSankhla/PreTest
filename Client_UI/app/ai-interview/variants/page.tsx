"use client";

import { AIInterview, Difficulty } from "../types";
import { InterviewCard } from "../components";

// Sample interview data for different states
const baseInterview: AIInterview = {
  id: "sde-1-general",
  title: "Software Engineer - Entry Level",
  role: "SDE 1 / Junior Developer",
  description:
    "Practice common interview questions for entry-level software engineering roles. Covers DSA basics, OOP concepts, and behavioral questions.",
  difficulty: Difficulty.EASY,
  duration: 30,
  stages: ["Introduction", "Technical Background", "Problem Solving", "Behavioral", "Wrap-up"],
  focusAreas: ["Data Structures", "Algorithms", "OOP", "Communication", "Problem Solving"],
  totalTaken: 1247,
  avgScore: 72,
  status: "available",
  createdAt: "2024-01-15",
};

// All state combinations for 3x3 grid display
const allVariants: AIInterview[] = [
  // Row 1: Not Taken - Easy, Medium, Hard
  {
    ...baseInterview,
    id: "not-taken-easy",
    difficulty: Difficulty.EASY,
    userState: "not_taken",
  },
  {
    ...baseInterview,
    id: "not-taken-medium",
    title: "Software Engineer - Mid Level",
    role: "SDE 2 / Software Engineer",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    userState: "not_taken",
  },
  {
    ...baseInterview,
    id: "not-taken-hard",
    title: "Senior Software Engineer",
    role: "SDE 3 / Senior Engineer",
    difficulty: Difficulty.HARD,
    duration: 60,
    userState: "not_taken",
  },

  // Row 2: Completed - Easy, Medium, Hard
  {
    ...baseInterview,
    id: "completed-easy",
    difficulty: Difficulty.EASY,
    userState: "completed",
    userScore: 85,
  },
  {
    ...baseInterview,
    id: "completed-medium",
    title: "Software Engineer - Mid Level",
    role: "SDE 2 / Software Engineer",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    userState: "completed",
    userScore: 72,
  },
  {
    ...baseInterview,
    id: "completed-hard",
    title: "Senior Software Engineer",
    role: "SDE 3 / Senior Engineer",
    difficulty: Difficulty.HARD,
    duration: 60,
    userState: "completed",
    userScore: 68,
  },

  // Row 3: Coming Soon - Different roles
  {
    ...baseInterview,
    id: "coming-soon-ml",
    title: "Machine Learning Engineer",
    role: "ML / AI Engineer",
    description: "ML engineering interview covering model development, MLOps, feature engineering, and production ML systems.",
    difficulty: Difficulty.HARD,
    status: "coming_soon",
    focusAreas: ["ML Algorithms", "Deep Learning", "MLOps", "Feature Engineering"],
  },
  {
    ...baseInterview,
    id: "coming-soon-pm",
    title: "Product Manager",
    role: "Product Manager / PM",
    description: "Product management interview covering product sense, analytical thinking, strategy, and cross-functional collaboration.",
    difficulty: Difficulty.MEDIUM,
    status: "coming_soon",
    focusAreas: ["Product Sense", "Analytics", "Strategy", "Communication"],
  },
  {
    ...baseInterview,
    id: "coming-soon-data",
    title: "Data Scientist",
    role: "Data Science / Analytics",
    description: "Data science interview covering statistics, machine learning, SQL, and business problem solving.",
    difficulty: Difficulty.HARD,
    status: "coming_soon",
    focusAreas: ["Statistics", "ML", "SQL", "Python"],
  },
];

export default function CardVariantsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-bold text-text-primary">
            Interview Card - All State Variants
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Fixed dimensions: 340px height | 3x3 Grid Layout
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Main 3x3 Grid */}
        <section>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center py-2 bg-background-subtle rounded-lg">
              <span className="text-body-sm font-medium text-text-secondary">Easy</span>
            </div>
            <div className="text-center py-2 bg-background-subtle rounded-lg">
              <span className="text-body-sm font-medium text-text-secondary">Medium</span>
            </div>
            <div className="text-center py-2 bg-background-subtle rounded-lg">
              <span className="text-body-sm font-medium text-text-secondary">Hard</span>
            </div>
          </div>

          {/* Row 1: Not Taken */}
          <div className="mb-6">
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Not Taken
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allVariants.slice(0, 3).map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </div>

          {/* Row 2: Completed */}
          <div className="mb-6">
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Completed (with Retake)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allVariants.slice(3, 6).map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </div>

          {/* Row 3: Coming Soon */}
          <div>
            <h3 className="text-body-sm font-medium text-text-tertiary mb-3 uppercase tracking-wide">
              Coming Soon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allVariants.slice(6, 9).map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </div>
        </section>

        {/* Edge Cases */}
        <section className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Edge Cases
          </h2>
          <p className="text-body-sm text-text-secondary mb-6">
            Testing with long titles, many topics, etc.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Long Title */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">Long Title</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "long-title",
                  title: "Senior Staff Software Engineer - Platform Infrastructure Team",
                }}
              />
            </div>

            {/* Many Topics */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">Many Topics (7)</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "many-topics",
                  focusAreas: [
                    "Data Structures",
                    "Algorithms",
                    "System Design",
                    "OOP",
                    "Communication",
                    "Problem Solving",
                    "Leadership",
                  ],
                }}
              />
            </div>

            {/* Few Topics */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">Few Topics (2)</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "few-topics",
                  focusAreas: ["Coding", "Communication"],
                }}
              />
            </div>

            {/* High Stats */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">High Stats</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "high-stats",
                  totalTaken: 124789,
                  avgScore: 98,
                  duration: 120,
                }}
              />
            </div>

            {/* Short Description */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">Short Description</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "short-desc",
                  description: "Quick coding assessment for junior roles.",
                }}
              />
            </div>

            {/* Long Description */}
            <div>
              <span className="text-body-xs text-text-tertiary mb-2 block">Long Description</span>
              <InterviewCard
                interview={{
                  ...baseInterview,
                  id: "long-desc",
                  description:
                    "This comprehensive interview covers a wide range of topics including data structures, algorithms, object-oriented programming principles, system design basics, behavioral questions, and communication skills assessment. Perfect for candidates preparing for entry-level software engineering positions at top tech companies.",
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
