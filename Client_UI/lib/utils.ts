import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
