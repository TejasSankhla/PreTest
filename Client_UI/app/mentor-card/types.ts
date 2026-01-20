// Mentor Card Types

export type MentorCardVariant = "featured" | "browse" | "past";

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  college: string;
  avatar: string;
  rating: number;
  totalSessions: number;
  sessionDuration: number; // in minutes
  expertise: string[];
  price: number; // in INR
  // Optional fields for specific variants
  tagline?: string; // For featured variant
  about?: string; // Brief description for browse variant
  lastSessionDate?: string; // For past variant
  userRating?: number; // User's rating for this mentor (past variant)
  userSessionCount?: number; // How many sessions user had with this mentor
  isTopMentor?: boolean; // For featured badge
}
