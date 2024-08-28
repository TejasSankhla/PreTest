"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "lucide-react";
import { Backend_Base_URL } from "./constants";
interface User {
  id: string;
  name: string;
  email: string;
  mobile_number?: string;
}

interface Credentials {
  name?: string;
  email: string;
  password: string;
  mobile_number?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  signUp: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  ErrorMessage: String | null;
  setErrorMessage: any;
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

  const login = async (credentials: Credentials) => {
    try {
      console.log("long in handler");
      const response = await axios.post(
          `${Backend_Base_URL}/api/user/sign-in`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      const data = await response.data;
      console.log(data);

      if (data.success) {
        const userData = data.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Persist user session
        localStorage.setItem("token", JSON.stringify(userData.token)); // Persist user session
        console.log(User);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
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
        console.error("Unexpected error:", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };
  const signUp = async (credentials: Credentials) => {
    try {
      const response = await axios.post(
        `${Backend_Base_URL}/api/user/sign-up`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
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
          setErrorMessage("User with email already exists, Try logging in.");
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
    localStorage.removeItem("user");
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
