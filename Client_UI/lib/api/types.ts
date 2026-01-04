/**
 * Shared API types
 * Usage: import { User, Mentor, Booking, ApiResponse } from "@/lib/api"
 */

// ============ Base Types ============

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  msg?: string;
}

// ============ User/Auth Types ============

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  mobile_number?: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  mobile_number?: string;
}

// ============ Mentor Types ============

export interface SlotInfo {
  date: string;
  slots: string[];
}

export interface Mentor {
  _id: string;
  name: string;
  email?: string;
  profile_pic?: string;
  username?: string;

  // Professional Info
  currentCompany?: string;
  role?: string;

  // Education
  college: string;
  branch?: string;
  location?: string;
  grad_year?: number;

  // Profile Content
  about?: string;
  tagline?: string;

  // Stats
  rating?: number;
  session?: number;

  // Social Links
  linkedin_url?: string;
  insta_url?: string;

  // Availability
  slots?: SlotInfo[];
  isAvailable?: boolean;

  // Metadata
  isVerified?: boolean;
  mobile_number?: string;
}

// ============ Booking Types ============

export interface Booking {
  _id?: string;
  mentor?: Mentor;
  client?: string;
  slot: string;
  createdAt: string;
  meeting_link?: string;
}

export interface CreateBookingPayload {
  client: string;
  slot: string;
  paymentResponse: PaymentResponse;
}

// ============ Payment Types ============

export interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentFailedResponse {
  error: {
    description: string;
  };
}

export interface CreateOrderPayload {
  amount: number;
}

export interface Order {
  id: string;
  amount: number;
  currency: string;
}
