/**
 * Centralized API route definitions
 * Usage: import { API_ROUTES } from "@/lib/api"
 */

export const API_ROUTES = {
  // Auth endpoints
  auth: {
    signIn: () => "/api/user/sign-in",
    signUp: () => "/api/user/sign-up",
  },

  // Mentor endpoints
  mentor: {
    list: (college?: string) => college ? `/api/mentor?college=${encodeURIComponent(college)}` : "/api/mentor",
    detail: (id: string) => `/api/mentor/${id}`,
    updateProfile: (userId: string) => `/api/mentor/${userId}`,
    updateSlots: (userId: string) => `/api/mentor/${userId}/slots`,
    bookings: (userId: string, status: "upcoming" | "previous") => `/api/mentor/${userId}/bookings?status=${status}`,
  },

  // User booking endpoints
  booking: {
    create: (userId: string) => `/api/user/${userId}/booking`,
    list: (userId: string, status: "upcoming" | "previous") => `/api/user/${userId}/bookings?status=${status}`,
    // Convenience aliases
    upcoming: (userId: string) => `/api/user/${userId}/bookings?status=upcoming`,
    past: (userId: string) => `/api/user/${userId}/bookings?status=previous`,
  },

  // Order endpoints
  order: {
    create: () => "/api/order",
  },

  // AI Interview endpoints
  aiInterview: {
    list: () => "/api/ai-interview",
    detail: (id: string) => `/api/ai-interview/${id}`,
    startSession: (id: string) => `/api/ai-interview/${id}/session/start`,
    sessionResults: (conversationId: string) =>
      `/api/ai-interview/session/${conversationId}/results`,
  },
} as const;
