import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Mentor as ApiMentor } from "@/lib/api"
import type { Mentor as CardMentor } from "@/app/mentor-card/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate mock rating for mentors (4.5-4.9 range)
 * Uses mentor ID as seed for consistency
 */
export function getMockRating(mentorId: string): number {
  const hash = mentorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const normalized = (hash % 40) / 100; // 0.00 to 0.39
  return Math.round((4.5 + normalized) * 10) / 10; // 4.5 to 4.9, rounded to 1 decimal
}

/**
 * Generate mock session count (10-50 range)
 * Uses mentor ID as seed for consistency
 */
export function getMockSessionCount(mentorId: string): number {
  const hash = mentorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 10 + (hash % 41); // 10 to 50
}

/**
 * Generate expertise tags based on mentor's role, company, and branch
 * Since backend doesn't have expertise field, we derive it intelligently
 */
export function getExpertiseTags(mentor: {
  role?: string;
  currentCompany?: string;
  branch?: string;
}): string[] {
  const tags: string[] = [];

  // Role-based tags
  const roleLower = mentor.role?.toLowerCase() || "";
  if (roleLower.includes("sde") || roleLower.includes("engineer") || roleLower.includes("developer")) {
    tags.push("DSA", "Coding Interviews", "System Design");
  }
  if (roleLower.includes("product") || roleLower.includes("pm")) {
    tags.push("Product Sense", "Case Studies", "Roadmapping");
  }
  if (roleLower.includes("analyst") || roleLower.includes("data")) {
    tags.push("SQL", "Analytics", "Data Visualization");
  }
  if (roleLower.includes("design") || roleLower.includes("ux")) {
    tags.push("UI/UX Design", "Portfolio Review", "Design Thinking");
  }
  if (roleLower.includes("consult")) {
    tags.push("Case Interviews", "Problem Solving", "Consulting Prep");
  }

  // Company-based tags
  const companyLower = mentor.currentCompany?.toLowerCase() || "";
  if (["google", "meta", "amazon", "microsoft", "apple", "netflix"].some(c => companyLower.includes(c))) {
    tags.push("FAANG Prep");
  }
  if (companyLower.includes("startup") || companyLower.includes("founder")) {
    tags.push("Startup Life", "Entrepreneurship");
  }

  // Branch-based tags
  const branchLower = mentor.branch?.toLowerCase() || "";
  if (branchLower.includes("computer") || branchLower.includes("software") || branchLower.includes("it")) {
    if (!tags.includes("DSA")) tags.push("Programming");
  }
  if (branchLower.includes("electronics") || branchLower.includes("electrical")) {
    tags.push("Core Engineering");
  }
  if (branchLower.includes("mechanical")) {
    tags.push("Core Engineering");
  }

  // Universal tags all mentors can help with
  tags.push("Career Guidance", "Resume Review", "Mock Interviews");

  // Remove duplicates and limit to 6
  return Array.from(new Set(tags)).slice(0, 6);
}

/**
 * Generate mock reviews for a mentor
 * Uses mentor ID as seed for consistency
 */
export function getMockReviews(mentorId: string): Array<{
  id: string;
  name: string;
  college: string;
  rating: number;
  text: string;
  date: string;
  placed?: string;
}> {
  const reviews = [
    {
      name: "Priya S.",
      college: "VIT Vellore",
      rating: 5,
      text: "Amazing session! Got practical tips for DSA that I couldn't find anywhere else. Cleared my Amazon interview!",
      placed: "Amazon"
    },
    {
      name: "Rahul M.",
      college: "NIT Trichy",
      rating: 5,
      text: "Very patient and explained concepts clearly. The mock interview felt like the real thing.",
      placed: undefined
    },
    {
      name: "Sneha K.",
      college: "BITS Pilani",
      rating: 4,
      text: "Helpful insights on system design. Would have loved more time but overall great experience.",
      placed: "Microsoft"
    },
    {
      name: "Amit R.",
      college: "IIT Bombay",
      rating: 5,
      text: "Finally understood how to approach DP problems. The mentor was super supportive and encouraging.",
      placed: undefined
    },
    {
      name: "Kavya P.",
      college: "DTU Delhi",
      rating: 5,
      text: "Best investment for placement prep. Got confidence to face interviews without fear.",
      placed: "Google"
    }
  ];

  // Use mentor ID to consistently select 2-3 reviews
  const hash = mentorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const startIndex = hash % 3;
  const count = 2 + (hash % 2); // 2 or 3 reviews

  const selectedReviews = [];
  for (let i = 0; i < count; i++) {
    const review = reviews[(startIndex + i) % reviews.length];
    selectedReviews.push({
      ...review,
      id: `${mentorId}-review-${i}`,
      date: `${Math.floor(1 + (hash + i) % 4)} week${((hash + i) % 4) > 0 ? 's' : ''} ago`
    });
  }

  return selectedReviews;
}

/**
 * Map API Mentor type to MentorCardV2 Mentor type
 * Handles field name differences and generates mock data where needed
 */
export function mapApiMentorToCardMentor(apiMentor: ApiMentor): CardMentor {
  const optimizedAvatar = apiMentor.profile_pic
    ? apiMentor.profile_pic.replace(
        "/upload/",
        "/upload/c_fill,w_400,h_400,q_auto,f_auto/"
      )
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + apiMentor.name;

  return {
    id: apiMentor._id,
    name: apiMentor.name,
    role: apiMentor.role || "Software Engineer",
    company: apiMentor.currentCompany || "Tech Company",
    college: apiMentor.college,
    avatar: optimizedAvatar,
    rating: getMockRating(apiMentor._id),
    totalSessions: getMockSessionCount(apiMentor._id),
    sessionDuration: 45, // Default session duration
    expertise: getExpertiseTags(apiMentor).slice(0, 4),
    price: 49, // Launch price
    tagline: apiMentor.tagline,
    about: apiMentor.about,
  };
}
