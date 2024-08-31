"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Backend_Base_URL } from "./constants";
interface Mentor {
  id: string;
  name: string;
  email: string;
  username: string;
  mobile_number?: string;
  profile_pic?: string;
  college?: string;
  location?: string;
  branch?: string;
  grad_year?: number;
  about?: string;
  selectedSlots?: Record<string, any>;
  session?: number;
  linkedin_url?: string | null;
  insta_url?: string | null;
  isVerified?: boolean;
  isBlocked?: boolean;
  unavailable_dates?: any[];
}

interface Credentials {
  name?: string;
  email: string;
  password: string;
  mobile_number?: string;
}

interface AuthContextType {
  user: Mentor | null;
  login: (credentials: Credentials) => Promise<void>;
  signUp: (mentor: Mentor) => Promise<void>;
  logout: () => void;
  ErrorMessage: string | null;
  setErrorMessage: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Mentor | null>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const [ErrorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("mentor");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
    if (!storedUser || !storedToken) {
      router.push("/");
    }
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      const response = await axios.post(
        `${Backend_Base_URL}/api/mentor/sign-in`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      if (data.success) {
        const mentorData: Mentor = {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          username: data.data.username,
          mobile_number: data.data.mobile_number,
          profile_pic: data.data.profile_pic,
          college: data.data.college,
          location: data.data.location,
          branch: data.data.branch,
          grad_year: data.data.grad_year,
          about: data.data.about,
          selectedSlots: data.data.selectedSlots,
          session: data.data.session,
          linkedin_url: data.data.linkedin_url,
          insta_url: data.data.insta_url,
          isVerified: data.data.isVerified,
          isBlocked: data.data.isBlocked,
          unavailable_dates: data.data.unavailable_dates,
        };

        setUser(mentorData);
        setToken(data.data.token);
        localStorage.setItem("mentor", JSON.stringify(mentorData)); // Persist mentor session
        localStorage.setItem("token", JSON.stringify(data.data.token)); // Persist token

        router.push("/dashboard/profile"); // Redirect after successful login
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Invalid credentials");
        } else if (error.response?.status === 404) {
          setErrorMessage("User not found, please sign up");
        } else if (error.response?.status === 500) {
          setErrorMessage("User not found, please sign up");
        } else {
          setErrorMessage(
            `Error: ${error.message}`
          );
        }
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  const signUp = async (mentor: Mentor) => {
    try {
      const response = await axios.post(
        `${Backend_Base_URL}/api/mentor/sign-up`,
        mentor,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;

      if (!data.success) {
        setErrorMessage(data.msg);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage("User with email already exists, try logging in.");
        } else {
          setErrorMessage(
            `Error: ${error.response?.status} - ${error.message}`
          );
        }
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("mentor");
    localStorage.removeItem("token");
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
