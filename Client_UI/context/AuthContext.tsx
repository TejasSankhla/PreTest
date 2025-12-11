"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient, API_ROUTES, User, LoginCredentials, SignUpCredentials } from "@/lib/api";
import axios from "axios";

// Re-export User type for backwards compatibility
export type { User } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => void;
  ErrorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const router = useRouter();
  const [ErrorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post(API_ROUTES.auth.signIn(), credentials);
      const data = response.data;

      if (!data.success) {
        throw new Error("Bad Request, Login Failed.");
      }

      const userData = data.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(userData.token));
      router.push("/");
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Invalid credentials");
        } else if (error.response?.status === 404) {
          setErrorMessage("User not found, please sign up");
        } else {
          setErrorMessage(
            `Error: ${error.response?.status} - ${error.message}`
          );
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };
  const signUp = async (credentials: SignUpCredentials) => {
    try {
      const response = await apiClient.post(API_ROUTES.auth.signUp(), credentials);
      const data = response.data;

      if (!data.success) {
        throw Error(data.msg || "Sign-Up failed, Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage("User with email already exists, Try logging in.");
        } else {
          setErrorMessage(
            `Error: ${error.response?.status} - ${error.message}`
          );
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/")
  };

  const value: AuthContextType = {
    user,
    login,
    signUp,
    ErrorMessage,
    setErrorMessage,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
