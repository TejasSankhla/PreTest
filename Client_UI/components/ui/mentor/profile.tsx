"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile_banner from "../../../public/profile-banner.png";
import Image from "next/image";
import { LocationIcon } from "@/components/constants/icons";
import { Fragment, useState, useEffect } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { Card, CardContent } from "@/components/ui/card";
import { RAZORPAY_KEY_ID, bookingPrice } from "@/context/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { Button, Badge } from "@/components/atoms";
import { Star, MapPin, Briefcase } from "lucide-react";
import { getMockRating, getMockSessionCount } from "@/lib/utils";
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
  const [selectedDate, setSelectedDate] = useState<SlotInfo | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  // load data when loads
  useEffect(() => {
    if (mentor?.slots?.length && mentor.slots.length > 0) {
      setSelectedDate(mentor.slots[0]);
      setSelectedTimeSlot(null);
    }
    setLoading(false);
  }, [mentor]);

  const handleDateClick = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handlePaymentAndBooking = async () => {
    if (!user) {
      // Show sign-in modal if user is not authenticated
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
      // Step 1: Create Order for Payment
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
            // Step 2: Call combined booking and payment verification API
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
              toast.success("Booking successfull");
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
          color: "#3399cc",
        },
      };

      // Step 4: Open Razorpay Payment Window
      const rzpay = new Razorpay(options);
      rzpay.open();

      // Handle payment failures
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

 

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="text-2xl flex text-center items-center justify-center font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="w-full flex-col relative ">
        {/* header */}

        <section className="profile-header">
          <div className="relative h-[250px] sm:h-[300px]">
            <Image
              src={profile_banner}
              width={800}
              height={200}
              alt="Profile banner"
              className="sm:h-3/4 w-full object-cover"
              style={{ aspectRatio: "1200/400", objectFit: "cover" }}
            />
            {/* // avatar image */}
            <div className="absolute left-4 sm:left-32 flex gap-x-4 items-center top-[%] -translate-y-1/3 w-4/5 z-0">
              <div className="profile-avatar">
                <Avatar className="h-36 w-36 sm:h-48 sm:w-48 border-8 border-background border-orange-400">
                  <AvatarImage
                    src={mentor?.profile_pic || "/user-placeholder.png"}
                    alt={`Profile picture of ${mentor?.name || "mentor"}`}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback>
                    {mentor?.name
                      ? mentor.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "JD"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="profile-info flex-col gap-y-2 pt-16 w-full flex sm:ml-8 z-30">
                {/* Name */}
                <div className="mentor-name font-bold text-text-primary text-2xl sm:text-3xl">
                  {mentor?.name || "Unknown mentor"}
                </div>

                {/* Rating + Sessions */}
                <div className="flex items-center gap-2 text-text-secondary text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary" />
                  <span className="font-medium">{rating}</span>
                  <span className="text-text-tertiary">•</span>
                  <span>{sessionCount} sessions</span>
                </div>

                {/* Company + Role */}
                {mentor.currentCompany && mentor.role && (
                  <div className="flex items-start gap-2 mt-1">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-base sm:text-lg font-semibold text-text-primary">
                        {mentor.role}
                      </p>
                      <p className="text-sm sm:text-base text-text-secondary">
                        {mentor.currentCompany}
                      </p>
                    </div>
                  </div>
                )}

                {/* College + Grad Year */}
                <div className="flex items-center gap-2 text-text-secondary text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>
                    {mentor?.college || "Unknown College"}
                    {mentor.grad_year && ` • ${mentor.grad_year}`}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-text-tertiary text-sm sm:text-base">
                  <LocationIcon props="h-4 w-4 sm:h-5 sm:w-5" />
                  {mentor?.location || "Unknown Location"}
                </div>

                {/* Tagline */}
                {mentor.tagline && (
                  <p className="text-sm sm:text-base text-text-secondary mt-1 italic">
                    "{mentor.tagline}"
                  </p>
                )}

                {/* Branch Badge */}
                {mentor.branch && (
                  <div className="mt-1">
                    <Badge variant="default" size="sm">
                      {mentor.branch}
                    </Badge>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-2">
                  {mentor.linkedin_url && (
                    <Link
                      href={mentor.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  )}
                  {mentor.insta_url && (
                    <Link
                      href={mentor.insta_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-secondary transition-colors"
                      aria-label="Instagram profile"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-4/5 mb-16 flex flex-col mx-auto md:flex-row gap-y-4 md:justify-evenly mt-8 md:mt-28">
        {/* mentor about */}
        <div className="mentor-details-container md:w-2/5 p-4 text-lg text-justify">
          {mentor?.about || "No additional information provided."}
        </div>
        {/* // slots component             */}
        <div className="available-slots-booking shadow-lg border-border rounded-xl border-2 w-full p-4 md:w-2/5 flex flex-col gap-y-4 left-0 mt-8 md:mt-0">
          <div className="container-heading flex text-blue-950 gap-x-2 items-center text-2xl font-bold sm:text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-days"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="16 18h.01" />
            </svg>
            Schedule Session
          </div>
          <div className="container-heading text-lg font-medium sm:text-xl">
            Available Dates
          </div>
          {/* // slots carousel */}
          <div className="slots-carousel flex justify-center p-2">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {mentor?.slots?.map((slotInfo: SlotInfo, index: number) => (
                  <CarouselItem
                    key={index}
                    className={`basis-1/3 cursor-pointer ${
                      selectedDate?.date === slotInfo.date ? "bg-white " : ""
                    }`}
                    onClick={() => handleDateClick(slotInfo)}
                  >
                    <div className="p-1">
                      <Card
                        className={`${
                          selectedDate?.date === slotInfo.date
                            ? "bg-secondary"
                            : "bg-white"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div
                            className={`text-xl font-semibold mb-2 text-center ${
                              selectedDate?.date === slotInfo.date
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            {new Date(slotInfo.date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                timeZone: "Asia/Kolkata",
                              }
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Display Available Slots when a date is clicked */}
          {selectedDate && (
            <div className="available-slots">
              <h3 className="text-lg text-blue-950 font-medium mb-4">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedDate.slots.map((timeSlot: string, idx: number) => (
                  <div
                    key={idx}
                    className={`p-2 border rounded-md text-center text-base cursor-pointer ${
                      selectedTimeSlot === timeSlot
                        ? "bg-secondary text-white"
                        : "bg-background-subtle hover:bg-background"
                    }`}
                    onClick={() => handleTimeSlotClick(timeSlot)}
                  >
                    {new Date(timeSlot).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bookings-action flex mt-4 items-center justify-center">
            <Button
              disabled={bookingInProgress || !selectedTimeSlot}
              variant="primary"
              className="text-xl p-2 w-full"
              onClick={handlePaymentAndBooking}
            >
              Book Slot
            </Button>
          </div>
        </div>
      </section>

      {/* Sign-In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
            <p className="mb-4">
              You need to sign in to book a slot. Please sign in to continue.
            </p>
            <div className="flex justify-end">
              <Button
                className="mr-4"
                onClick={() => router.push("/auth/log-in")}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSignInModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
}
