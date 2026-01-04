/**
 * Centralized Configuration
 *
 * Usage:
 * import { config } from "@/lib/config";
 * const baseUrl = config.api.baseUrl;
 *
 * Benefits:
 * - Single source of truth for all config values
 * - Type-safe access to environment variables
 * - Default values for missing env vars
 * - Easy to mock in tests
 */

/**
 * Site configuration
 */
export const siteConfig = {
  name: "PreTest",
  tagline: "Master your next interview",
  description:
    "Practice with engineers who recently cracked Google, Amazon, Flipkart. Get honest feedback before your real interview.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pretest.in",
  supportEmail: "support@pretest.in",
  social: {
    twitter: "@pretest_in",
    linkedin: "pretest",
  },
} as const;

/**
 * API configuration
 */
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:4001",
  timeout: 30000,
} as const;

/**
 * Payment configuration
 */
export const paymentConfig = {
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  defaultBookingPrice: Number(process.env.NEXT_PUBLIC_BOOKING_PRICE) || 1000,
  currency: "INR",
} as const;

/**
 * Cloudinary configuration
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
} as const;

/**
 * Feature flags
 */
export const features = {
  googleAuth: false, // Enable when Google OAuth is ready
  emailNotifications: false, // Enable when email service is setup
  reviews: false, // Enable when reviews API is ready
} as const;

/**
 * Combined config export
 */
export const config = {
  site: siteConfig,
  api: apiConfig,
  payment: paymentConfig,
  cloudinary: cloudinaryConfig,
  features,
} as const;

export default config;
