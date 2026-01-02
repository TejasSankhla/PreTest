/**
 * Centralized App Route Definitions
 *
 * Usage:
 * import { ROUTES } from "@/lib/routes";
 * <Link href={ROUTES.auth.signUp}>Sign Up</Link>
 *
 * Benefits:
 * - Single source of truth for all routes
 * - Type-safe route references
 * - Easy refactoring when routes change
 * - No hardcoded strings scattered across components
 */

export const ROUTES = {
  // Home
  home: "/",

  // Auth routes
  auth: {
    logIn: "/auth/log-in",
    signUp: "/auth/sign-up",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },

  // Main app routes
  exploreMentors: "/explore-mentors",

  mentor: {
    profile: (id: string) => `/mentor/${id}` as const,
  },

  // User profile routes
  profile: {
    index: "/profile",
    bookings: "/profile/my-bookings",
    settings: "/profile/settings",
  },

  // Legal pages
  legal: {
    privacy: "/privacy-policy",
    terms: "/terms-and-conditions",
    refunds: "/refunds",
  },

  // Landing page anchors
  anchors: {
    howItWorks: "/#how-it-works",
    faq: "/#faq",
    mentors: "/#mentors",
  },

  // External links
  external: {
    support: "mailto:support@pretest.in",
  },
} as const;

/**
 * Route helpers
 */
export const isAuthRoute = (pathname: string): boolean => {
  return pathname.startsWith("/auth");
};

export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPrefixes = ["/profile", "/booking"];
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
};

/**
 * Default redirect destinations
 */
export const REDIRECT = {
  afterLogin: ROUTES.exploreMentors,
  afterSignUp: ROUTES.exploreMentors,
  afterLogout: ROUTES.home,
  unauthorized: ROUTES.auth.logIn,
} as const;
