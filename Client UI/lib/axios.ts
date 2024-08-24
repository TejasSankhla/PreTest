import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5500/api/", // default base URL
  timeout: 10000, // Set a timeout limit (optional)
  headers: {
    "Content-Type": "application/json", // Default headers (optional)
  },
});

export default api;
