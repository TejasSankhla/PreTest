"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Fragment, useState, useEffect } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { RAZORPAY_KEY_ID, bookingPrice } from "@/context/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { Button } from "@/components/atoms";
import { Star, MapPin, Clock, Video, GraduationCap, ArrowLeft, MessageSquare } from "lucide-react";
import { getMockRating, getMockSessionCount, getExpertiseTags, getMockReviews, cn } from "@/lib/utils";
import ProfileCard from "./profileCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  apiClient,
  API_ROUTES,
  Mentor,
  SlotInfo,
  PaymentResponse,
  PaymentFailedResponse,
} from "@/lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MentorProfileProps {
  mentor: Mentor;
}

export default function MentorProfile({ mentor }: MentorProfileProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [Razorpay] = useRazorpay();

  // Mock data for Phase 1
  const rating = getMockRating(mentor._id);
  const sessionCount = getMockSessionCount(mentor._id);
  const reviews = getMockReviews(mentor._id);
  const [selectedDate, setSelectedDate] = useState<SlotInfo | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [similarMentors, setSimilarMentors] = useState<Mentor[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Load data when component mounts
  useEffect(() => {
    if (mentor?.slots?.length && mentor.slots.length > 0) {
      setSelectedDate(mentor.slots[0]);
      setSelectedTimeSlot(null);
    }
    setLoading(false);
  }, [mentor]);

  // Fetch similar mentors (same college or company)
  useEffect(() => {
    apiClient.get(API_ROUTES.mentor.list()).then((response) => {
      const allMentors: Mentor[] = response.data.data;
      const similar = allMentors
        .filter((m) => m._id !== mentor._id) // Exclude current
        .filter((m) =>
          m.college === mentor.college ||
          m.currentCompany === mentor.currentCompany
        )
        .sort((a, b) => getMockRating(b._id) - getMockRating(a._id))
        .slice(0, 4);
      setSimilarMentors(similar);
    }).catch(() => {
      // Silently fail - similar mentors is not critical
    });
  }, [mentor._id, mentor.college, mentor.currentCompany]);

  const handleDateClick = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handlePaymentAndBooking = async () => {
    if (!user) {
      setShowSignInModal(true);
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("Please select a time slot.");
      return;
    }

    setIsLoading(true);
    setBookingInProgress(true);
    try {
      const response = await apiClient.post(API_ROUTES.order.create(), { amount: bookingPrice });

      if (response.status !== 200) {
        toast.error("Failed to create order");
        return;
      }
      const order = response.data;
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID || "",
        amount: order.amount.toString(),
        currency: order.currency,
        name: "Pretest",
        description: "Payment for mentor booking",
        order_id: order.id,
        handler: async (paymentResponse: PaymentResponse) => {
          try {
            const bookingResponse = await apiClient.post(
              API_ROUTES.booking.create(user._id),
              {
                mentorId: mentor._id,
                slot: selectedTimeSlot,
                paymentResponse: {
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                },
              }
            );

            const bookingData = bookingResponse.data;

            if (bookingData.success) {
              toast.success("Booking successful!");
              router.push("/profile/my-bookings");
            } else {
              toast.error("Booking creation failed");
            }
          } catch {
            toast.error("Payment or booking failed. Please try again.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();

      rzpay.on("payment.failed", (response: PaymentFailedResponse) => {
        toast.error(`Payment failed: ${response.error.description}`);
      });
    } catch {
      toast.error("Error initiating payment. Please try again.");
    } finally {
      setIsLoading(false);
      setBookingInProgress(false);
    }
  };

  const mentorFirstName = mentor?.name?.split(" ")[0] || "Mentor";

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return { day: "Today", date: "" };
    if (isTomorrow) return { day: "Tomorrow", date: "" };

    return {
      day: date.toLocaleDateString("en-IN", { weekday: "short", timeZone: "Asia/Kolkata" }),
      date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", timeZone: "Asia/Kolkata" }),
    };
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-2xl flex text-center items-center justify-center font-semibold text-text-secondary">
          Loading...
        </div>
      </div>
    );
  }

  // ============================================
  // SHARED COMPONENTS
  // ============================================

  const MentorHeader = () => (
    <section className="border-b border-border bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        {/* Back + Avatar + Info in one tight row */}
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-background-subtle text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Avatar */}
          <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm flex-shrink-0">
            <AvatarImage
              src={mentor?.profile_pic || "/user-placeholder.png"}
              alt={mentor?.name || "mentor"}
              className="object-cover"
            />
            <AvatarFallback className="bg-secondary text-white text-sm font-bold">
              {mentor?.name?.split(" ").map((n: string) => n[0]).join("") || "?"}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-text-primary truncate">
                {mentor?.name || "Unknown"}
              </h1>
              {mentor.currentCompany && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-text-primary text-white">
                  {mentor.currentCompany}
                </span>
              )}
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">{rating}</span>
                <span className="text-text-tertiary">• {sessionCount} sessions</span>
              </div>
            </div>
            <p className="text-xs text-text-tertiary truncate">
              {mentor.role}{mentor.role && mentor.college && " • "}{mentor.college}
            </p>
          </div>
        </div>

        {/* Expertise Tags - single row */}
        <div className="flex gap-1.5 mt-2 overflow-x-auto scrollbar-hide">
          {getExpertiseTags(mentor).slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="flex-shrink-0 px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  const AboutSection = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? "" : "w-full md:w-[55%] md:order-1"}>
      {/* About */}
      <div className={compact ? "mb-6" : "mb-8"}>
        <h2 className="text-lg font-bold text-text-primary mb-3">About</h2>
        <p className={cn(
          "text-text-secondary leading-relaxed whitespace-pre-line",
          compact ? "text-sm" : "text-base"
        )}>
          {mentor?.about || "No additional information provided."}
        </p>
      </div>

      {/* Details card */}
      <div className={cn(
        "bg-background-subtle rounded-xl space-y-3",
        compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
      )}>
        {/* Education */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-text-tertiary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{mentor?.college || "College"}</p>
            <p className="text-sm text-text-tertiary">
              {mentor.branch && `${mentor.branch}`}
              {mentor.branch && mentor.grad_year && " • "}
              {mentor.grad_year && `Class of ${mentor.grad_year}`}
            </p>
          </div>
        </div>

        {/* Location */}
        {mentor?.location && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-text-tertiary" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{mentor.location}</p>
            </div>
          </div>
        )}

        {/* Social Links */}
        {(mentor.linkedin_url || mentor.insta_url) && (
          <div className="flex items-center gap-2 pt-2">
            {mentor.linkedin_url && (
              <Link
                href={mentor.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background text-sm font-medium text-text-secondary hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </Link>
            )}
            {mentor.insta_url && (
              <Link
                href={mentor.insta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background text-sm font-medium text-text-secondary hover:text-[#E4405F] hover:bg-[#E4405F]/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Tagline */}
      {mentor.tagline && (
        <blockquote className="mt-6 pl-4 border-l-4 border-secondary/30 bg-secondary/5 py-3 pr-4 rounded-r-lg">
          <p className="text-base text-text-secondary italic">
            &ldquo;{mentor.tagline}&rdquo;
          </p>
        </blockquote>
      )}
    </div>
  );

  const MobileStickyCTA = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      <div className="h-6 bg-gradient-to-t from-background to-transparent" />
      <div className="bg-background/95 backdrop-blur-lg border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {selectedTimeSlot && (
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-text-secondary">
              {selectedDate && formatDate(selectedDate.date).day}{" "}
              {selectedDate && formatDate(selectedDate.date).date} at{" "}
              {new Date(selectedTimeSlot).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <span className="font-semibold text-text-primary">₹{bookingPrice}</span>
          </div>
        )}
        <Button
          disabled={bookingInProgress || !selectedTimeSlot}
          variant="primary"
          size="lg"
          className="w-full shadow-lg shadow-secondary/20"
          onClick={handlePaymentAndBooking}
          isLoading={isLoading}
          loadingText="Processing..."
        >
          {selectedTimeSlot
            ? `Book with ${mentorFirstName}`
            : "Select a time slot"}
        </Button>
      </div>
    </div>
  );

  const SignInModal = () => (
    showSignInModal ? (
      <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <div className="bg-background w-full sm:max-w-sm sm:mx-4 p-6 sm:rounded-2xl rounded-t-2xl shadow-xl border-t sm:border border-border">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4 sm:hidden" />
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Sign in to continue
          </h2>
          <p className="text-base text-text-secondary mb-6">
            Create an account or sign in to book a session with {mentorFirstName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 order-2 sm:order-1"
              onClick={() => setShowSignInModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1 order-1 sm:order-2"
              onClick={() => router.push("/auth/log-in")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    ) : null
  );

  // ============================================
  // REVIEWS SECTION
  // ============================================

  const ReviewsSection = () => {
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
    const hasMoreReviews = reviews.length > 2;

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-text-tertiary" />
            <h3 className="text-sm font-semibold text-text-primary">Reviews</h3>
            <span className="text-xs text-text-tertiary">({reviews.length})</span>
          </div>
        </div>
        <div className="space-y-2">
          {displayedReviews.map((review) => (
            <div key={review.id} className="bg-background-subtle rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary">{review.name}</span>
                  <span className="text-xs text-text-tertiary">{review.college}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{review.text}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-text-tertiary">{review.date}</span>
                {review.placed && (
                  <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    Placed at {review.placed}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {hasMoreReviews && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="w-full mt-2 py-2 text-xs font-medium text-secondary hover:text-secondary-dark transition-colors"
          >
            {showAllReviews ? "Show less" : `Show all ${reviews.length} reviews`}
          </button>
        )}
      </div>
    );
  };

  // ============================================
  // MAIN CONTENT LAYOUT
  // ============================================

  const MainContent = () => {
    return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-32 sm:pb-6">
      <div className="flex flex-col md:flex-row gap-5 md:gap-6">
        {/* Booking Card - First on mobile, right on desktop */}
        <div className="w-full md:w-[42%] md:order-2">
          <div className="bg-background rounded-xl border border-border shadow-sm p-3 sm:p-4 md:sticky md:top-20">
            {/* Price + Duration header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <span className="text-lg font-bold text-text-primary">₹{bookingPrice}</span>
                <span className="text-xs text-text-tertiary ml-1.5">/ session</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 45 min
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3" /> Meet
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="py-3">
              <p className="text-xs font-medium text-text-secondary mb-2">Select date</p>
              <div className="sm:px-8 relative">
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-1.5">
                    {mentor?.slots?.map((slotInfo: SlotInfo, index: number) => {
                      const { day, date } = formatDate(slotInfo.date);
                      const isSelected = selectedDate?.date === slotInfo.date;

                      return (
                        <CarouselItem key={index} className="basis-1/3 pl-1.5">
                          <button
                            onClick={() => handleDateClick(slotInfo)}
                            className={cn(
                              "w-full py-2 px-1 rounded-lg text-center transition-all",
                              "focus:outline-none active:scale-95",
                              isSelected
                                ? "bg-secondary text-white"
                                : "bg-background-subtle border border-border hover:border-secondary/40"
                            )}
                          >
                            <span className={cn("block text-[10px]", isSelected ? "text-white/70" : "text-text-tertiary")}>
                              {day}
                            </span>
                            {date && <span className="block text-xs font-semibold">{date}</span>}
                            <span className={cn("block text-[9px]", isSelected ? "text-white/60" : "text-text-tertiary")}>
                              {slotInfo.slots.length} slots
                            </span>
                          </button>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex -left-8 h-6 w-6" />
                  <CarouselNext className="hidden sm:flex -right-8 h-6 w-6" />
                </Carousel>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="pb-3 border-b border-border">
                <p className="text-xs font-medium text-text-secondary mb-2">
                  Select time <span className="text-text-tertiary font-normal">({selectedDate.slots.length} available)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDate.slots.map((timeSlot: string, idx: number) => {
                    const isSelected = selectedTimeSlot === timeSlot;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTimeSlotClick(timeSlot)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95",
                          isSelected
                            ? "bg-secondary text-white"
                            : "bg-background-subtle border border-border hover:border-secondary/40 text-text-primary"
                        )}
                      >
                        {new Date(timeSlot).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Desktop CTA */}
            <div className="hidden sm:block pt-3">
              <Button
                disabled={bookingInProgress || !selectedTimeSlot}
                variant="primary"
                size="default"
                className="w-full"
                onClick={handlePaymentAndBooking}
                isLoading={isLoading}
                loadingText="Processing..."
              >
                {selectedTimeSlot ? `Book with ${mentorFirstName}` : "Select a time"}
              </Button>
              <p className="text-[10px] text-text-tertiary text-center mt-2">
                Free cancellation • Secure payment
              </p>
            </div>
          </div>
        </div>

        {/* About + Reviews - Second on mobile, left on desktop */}
        <div className="w-full md:w-[58%] md:order-1">
          <AboutSection compact />
          <ReviewsSection />
        </div>
      </div>
    </section>
    );
  };

  // ============================================
  // SIMILAR MENTORS SECTION
  // ============================================

  const SimilarMentors = () => {
    if (similarMentors.length === 0) return null;

    return (
      <section className="border-t border-border bg-background-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              Similar Mentors
            </h2>
            <Link
              href="/explore-mentors"
              className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {similarMentors.slice(0, 2).map((m) => (
              <ProfileCard key={m._id} mentor={m} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <Fragment>
      <MentorHeader />
      <MainContent />
      <SimilarMentors />
      <MobileStickyCTA />
      <SignInModal />
      <ToastContainer />
    </Fragment>
  );
}
