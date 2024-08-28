import { Backend_Base_URL } from "@/context/constants";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || `${Backend_Base_URL}/api/`, // default base URL
  timeout: 10000, // Set a timeout limit (optional)
  headers: {
    "Content-Type": "application/json", // Default headers (optional)
  },
});

export default api;
