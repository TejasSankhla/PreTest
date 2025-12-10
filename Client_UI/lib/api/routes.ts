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
    list: () => "/api/mentor/",
    detail: (id: string) => `/api/mentor/${id}`,
  },

  // Booking endpoints
  booking: {
    create: (mentorId: string) => `/api/booking/${mentorId}`,
    upcoming: (userId: string) => `/api/booking/user/upcoming/${userId}`,
    past: (userId: string) => `/api/booking/user/prev/${userId}`,
  },

  // Order endpoints
  order: {
    create: () => "/api/order/create-order",
  },
} as const;
