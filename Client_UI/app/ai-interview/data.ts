import { AIInterview, Difficulty } from "./types";

// Mock interview data - will be replaced with API calls
export const mockInterviews: AIInterview[] = [
  {
    id: "sde-1-general",
    title: "Software Engineer - Entry Level",
    role: "SDE 1 / Junior Developer",
    description:
      "Practice common interview questions for entry-level software engineering roles. Covers DSA basics, OOP concepts, and behavioral questions.",
    difficulty: Difficulty.EASY,
    duration: 30,
    stages: [
      "Introduction",
      "Technical Background",
      "Problem Solving",
      "Behavioral",
      "Wrap-up",
    ],
    focusAreas: ["Data Structures", "Algorithms", "OOP", "Communication"],
    totalTaken: 1247,
    avgScore: 72,
    status: "available",
    createdAt: "2024-01-15",
  },
  {
    id: "sde-2-general",
    title: "Software Engineer - Mid Level",
    role: "SDE 2 / Software Engineer",
    description:
      "Intermediate-level technical interview covering system design basics, complex algorithms, and leadership principles.",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    stages: [
      "Introduction",
      "Experience Discussion",
      "System Design",
      "Coding Challenge",
      "Behavioral",
      "Wrap-up",
    ],
    focusAreas: ["System Design", "Scalability", "Code Quality", "Leadership"],
    totalTaken: 892,
    avgScore: 68,
    status: "available",
    createdAt: "2024-01-20",
  },
  {
    id: "senior-sde",
    title: "Senior Software Engineer",
    role: "SDE 3 / Senior Engineer",
    description:
      "Advanced technical interview with deep system design, architecture decisions, and technical leadership scenarios.",
    difficulty: Difficulty.HARD,
    duration: 60,
    stages: [
      "Introduction",
      "Technical Deep-Dive",
      "System Design",
      "Architecture Review",
      "Leadership & Mentoring",
      "Wrap-up",
    ],
    focusAreas: [
      "Architecture",
      "System Design",
      "Technical Leadership",
      "Mentoring",
    ],
    totalTaken: 456,
    avgScore: 64,
    status: "available",
    createdAt: "2024-02-01",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    role: "Frontend / UI Engineer",
    description:
      "Frontend-focused interview covering React, JavaScript fundamentals, CSS, performance optimization, and UI/UX thinking.",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    stages: [
      "Introduction",
      "JavaScript Deep-Dive",
      "React Concepts",
      "UI Challenge",
      "Performance Discussion",
      "Wrap-up",
    ],
    focusAreas: ["JavaScript", "React", "CSS", "Web Performance", "Accessibility"],
    totalTaken: 723,
    avgScore: 70,
    status: "available",
    createdAt: "2024-02-10",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    role: "Backend / Server-Side Engineer",
    description:
      "Backend-focused interview covering APIs, databases, system design, and server-side architecture patterns.",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    stages: [
      "Introduction",
      "API Design",
      "Database Discussion",
      "System Architecture",
      "Scaling Scenarios",
      "Wrap-up",
    ],
    focusAreas: ["APIs", "Databases", "Caching", "Microservices", "Security"],
    totalTaken: 634,
    avgScore: 67,
    status: "available",
    createdAt: "2024-02-15",
  },
  {
    id: "fullstack-engineer",
    title: "Full Stack Engineer",
    role: "Full Stack Developer",
    description:
      "Comprehensive interview covering both frontend and backend skills, end-to-end feature development, and system thinking.",
    difficulty: Difficulty.MEDIUM,
    duration: 50,
    stages: [
      "Introduction",
      "Frontend Discussion",
      "Backend Discussion",
      "Full Stack Challenge",
      "Architecture",
      "Wrap-up",
    ],
    focusAreas: ["Full Stack", "Integration", "DevOps Basics", "Problem Solving"],
    totalTaken: 567,
    avgScore: 69,
    status: "available",
    createdAt: "2024-03-01",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    role: "Data / Analytics Engineer",
    description:
      "Data engineering focused interview covering ETL pipelines, data modeling, SQL, and big data technologies.",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    stages: [
      "Introduction",
      "SQL Deep-Dive",
      "Data Modeling",
      "Pipeline Design",
      "Big Data Discussion",
      "Wrap-up",
    ],
    focusAreas: ["SQL", "ETL", "Data Modeling", "Spark", "Airflow"],
    totalTaken: 312,
    avgScore: 71,
    status: "available",
    createdAt: "2024-03-10",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    role: "DevOps / SRE",
    description:
      "DevOps and SRE focused interview covering CI/CD, cloud infrastructure, monitoring, and reliability engineering.",
    difficulty: Difficulty.HARD,
    duration: 50,
    stages: [
      "Introduction",
      "Infrastructure Discussion",
      "CI/CD Deep-Dive",
      "Incident Response",
      "Monitoring & Observability",
      "Wrap-up",
    ],
    focusAreas: ["CI/CD", "Cloud", "Kubernetes", "Monitoring", "Reliability"],
    totalTaken: 234,
    avgScore: 65,
    status: "available",
    createdAt: "2024-03-15",
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    role: "ML / AI Engineer",
    description:
      "ML engineering interview covering model development, MLOps, feature engineering, and production ML systems.",
    difficulty: Difficulty.HARD,
    duration: 55,
    stages: [
      "Introduction",
      "ML Fundamentals",
      "Model Design",
      "MLOps Discussion",
      "Case Study",
      "Wrap-up",
    ],
    focusAreas: ["ML Algorithms", "Deep Learning", "MLOps", "Feature Engineering"],
    totalTaken: 189,
    avgScore: 63,
    status: "coming_soon",
    createdAt: "2024-04-01",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    role: "Product Manager / PM",
    description:
      "Product management interview covering product sense, analytical thinking, strategy, and cross-functional collaboration.",
    difficulty: Difficulty.MEDIUM,
    duration: 45,
    stages: [
      "Introduction",
      "Product Sense",
      "Analytical Case",
      "Strategy Discussion",
      "Execution & Prioritization",
      "Wrap-up",
    ],
    focusAreas: ["Product Sense", "Analytics", "Strategy", "Communication"],
    totalTaken: 445,
    avgScore: 72,
    status: "coming_soon",
    createdAt: "2024-04-10",
  },
];

// Filter difficulty options including "All"
export type DifficultyFilter = Difficulty | "All";

// Helper to filter and sort interviews
export function filterInterviews(
  interviews: AIInterview[],
  filters: {
    search?: string;
    difficulty?: DifficultyFilter;
    sortBy?: "popular" | "newest" | "highest_rated";
  }
): AIInterview[] {
  let result = [...interviews];

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (interview) =>
        interview.title.toLowerCase().includes(searchLower) ||
        interview.role.toLowerCase().includes(searchLower) ||
        interview.description.toLowerCase().includes(searchLower) ||
        interview.focusAreas.some((area) =>
          area.toLowerCase().includes(searchLower)
        )
    );
  }

  // Filter by difficulty
  if (filters.difficulty && filters.difficulty !== "All") {
    result = result.filter(
      (interview) => interview.difficulty === filters.difficulty
    );
  }

  // Sort
  switch (filters.sortBy) {
    case "popular":
      result.sort((a, b) => b.totalTaken - a.totalTaken);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "highest_rated":
      result.sort((a, b) => b.avgScore - a.avgScore);
      break;
    default:
      // Default: available first, then by popularity
      result.sort((a, b) => {
        if (a.status === "available" && b.status !== "available") return -1;
        if (a.status !== "available" && b.status === "available") return 1;
        return b.totalTaken - a.totalTaken;
      });
  }

  return result;
}
