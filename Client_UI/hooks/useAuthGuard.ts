"use client";

/**
 * Auth Guard Hook
 *
 * Protects routes by redirecting unauthenticated users to login.
 * Preserves the intended destination with returnTo parameter.
 *
 * Usage:
 * const { user, isLoading, isAuthenticated } = useAuthGuard();
 *
 * if (isLoading) return <Spinner />;
 * if (!isAuthenticated) return null; // Will redirect
 */

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { buildLoginUrl, storeReturnTo, getCurrentPathForReturn } from "@/lib/auth-redirect";
import { isProtectedRoute } from "@/lib/routes";

interface AuthGuardResult {
  /** Current user if authenticated */
  user: ReturnType<typeof useAuth>["user"];
  /** Whether auth state is being checked */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
}

interface AuthGuardOptions {
  /** Whether to require authentication (default: true) */
  required?: boolean;
  /** Custom redirect path after login */
  redirectTo?: string;
}

export function useAuthGuard(options: AuthGuardOptions = {}): AuthGuardResult {
  const { required = true } = options;
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Give localStorage time to hydrate
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasChecked(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasChecked) return;

    // If authentication is required and user is not logged in
    if (required && !user) {
      // Get the full current path including query params
      const currentPath = getCurrentPathForReturn();

      // Only redirect if this is a protected route or required is true
      if (isProtectedRoute(pathname) || required) {
        // Store the intended destination
        storeReturnTo(currentPath);

        // Redirect to login with returnTo parameter
        const loginUrl = buildLoginUrl(currentPath);
        router.push(loginUrl);
      }
    }
  }, [user, hasChecked, required, pathname, router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

export default useAuthGuard;
