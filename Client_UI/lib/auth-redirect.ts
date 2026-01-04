/**
 * Auth Redirect Utilities
 *
 * Handles deep linking and post-auth redirects securely.
 * Prevents open redirect vulnerabilities by validating returnTo paths.
 */

import { ROUTES } from "./routes";

// Paths that are allowed as returnTo destinations
const ALLOWED_PATH_PREFIXES = [
  "/",
  "/mentor/",
  "/explore-mentors",
  "/profile",
  "/booking",
];

// Paths that should never be used as returnTo (prevent loops)
const BLOCKED_PATHS = [
  "/auth/log-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
];

/**
 * Validates if a path is safe to redirect to
 */
export function isValidReturnPath(path: string | null): boolean {
  if (!path) return false;

  // Must start with /
  if (!path.startsWith("/")) return false;

  // Block auth pages to prevent redirect loops
  const pathWithoutQuery = path.split("?")[0];
  if (BLOCKED_PATHS.some((blocked) => pathWithoutQuery.startsWith(blocked))) {
    return false;
  }

  // Must match allowed prefixes
  return ALLOWED_PATH_PREFIXES.some(
    (prefix) => pathWithoutQuery === prefix || pathWithoutQuery.startsWith(prefix)
  );
}

/**
 * Gets the returnTo path from URL search params or localStorage
 */
export function getReturnToPath(): string | null {
  if (typeof window === "undefined") return null;

  // First check URL params
  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get("returnTo");

  if (returnTo && isValidReturnPath(returnTo)) {
    return decodeURIComponent(returnTo);
  }

  // Fallback to localStorage
  const storedReturnTo = localStorage.getItem("auth_return_to");
  if (storedReturnTo && isValidReturnPath(storedReturnTo)) {
    return storedReturnTo;
  }

  return null;
}

/**
 * Stores the intended destination before redirecting to auth
 */
export function storeReturnTo(path: string): void {
  if (typeof window === "undefined") return;
  if (isValidReturnPath(path)) {
    localStorage.setItem("auth_return_to", path);
  }
}

/**
 * Clears the stored returnTo path
 */
export function clearReturnTo(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_return_to");
}

/**
 * Gets the final redirect path after auth
 * Falls back to default if no valid returnTo
 */
export function getPostAuthRedirect(defaultPath: string = ROUTES.exploreMentors): string {
  const returnTo = getReturnToPath();
  clearReturnTo();
  return returnTo || defaultPath;
}

/**
 * Builds a login URL with returnTo parameter
 */
export function buildLoginUrl(returnTo?: string): string {
  if (returnTo && isValidReturnPath(returnTo)) {
    return `${ROUTES.auth.logIn}?returnTo=${encodeURIComponent(returnTo)}`;
  }
  return ROUTES.auth.logIn;
}

/**
 * Gets current path for use as returnTo
 */
export function getCurrentPathForReturn(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname + window.location.search;
}
