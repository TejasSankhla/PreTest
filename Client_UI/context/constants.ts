/**
 * @deprecated For API calls, use `import { API_ROUTES, apiClient } from "@/lib/api"` instead.
 * These exports are kept for non-API uses (e.g., Razorpay config, pricing).
 */
const Backend_Base_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const bookingPrice = process.env.NEXT_PUBLIC_BOOKING_PRICE;
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export { Backend_Base_URL, bookingPrice, RAZORPAY_KEY_ID };
