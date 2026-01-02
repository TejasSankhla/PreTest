/**
 * Configured Axios client with interceptors
 * Usage: import { apiClient } from "@/lib/api"
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - auto-attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - session expired or invalid token
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      // Don't redirect if already on auth pages
      if (!currentPath.startsWith("/auth")) {
        // Clear auth state
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Store current path for return after login
        const fullPath = window.location.pathname + window.location.search;
        localStorage.setItem("auth_return_to", fullPath);

        // Redirect to login with returnTo parameter
        const returnTo = encodeURIComponent(fullPath);
        window.location.href = `/auth/log-in?returnTo=${returnTo}&expired=true`;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
