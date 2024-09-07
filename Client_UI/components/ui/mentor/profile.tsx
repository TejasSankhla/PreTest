"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile_banner from "../../../public/profile-banner.png";
import Image from "next/image";
import avatar from "../../../public/user-placeholder.png";
import { LocationIcon } from "@/components/constants/icons";
import { Fragment, useState, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { Card, CardContent } from "@/components/ui/card";
import { RAZORPAY_KEY_ID } from "@/context/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { Button } from "../button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Backend_Base_URL, bookingPrice } from "@/context/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MentorProfile({ mentor }) {
  const { user } = useAuth();
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  // load data when loads
  useEffect(() => {
    if (mentor?.slots?.length > 0) {
      setSelectedDate(mentor.slots[0]);
      setSelectedTimeSlot(null);
    }
    setLoading(false);
  }, [mentor]);

  const handleDateClick = (slotInfo) => {
    setSelectedDate(slotInfo);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
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

    const token = localStorage.getItem("token");

    setIsLoading(true);
    setBookingInProgress(true);
    try {
      // Step 1: Create Order for Payment
      const response = await axios.post(
        `${Backend_Base_URL}/api/order/create-order`,
        { amount: bookingPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      if (response.status !== 200) {
        toast.error("Failed to create order");
        return;
      }
      const order = response.data;
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount.toString(),
        currency: order.currency,
        name: "Pretest",
        description: "Payment for mentor booking",
        order_id: order.id,
        handler: async (paymentResponse) => {
          try {
            // Step 3: Call combined booking and payment verification API
            const bookingResponse = await fetch(
              `${Backend_Base_URL}/api/booking/${mentor._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  client: user._id,
                  slot: selectedTimeSlot,
                  paymentResponse: {
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                    razorpay_signature: paymentResponse.razorpay_signature,
                  },
                }),
              }
            );

            const bookingData = await bookingResponse.json();

            if (bookingData.success) {
              toast.success("Booking successfull");
              router.push("/profile/my-bookings");
            } else {
              toast.error("Booking creation failed");
            }
          } catch (err) {
            console.error("Booking/Payment Verification Error:", err);
            toast.error("Payment or booking failed. Please try again.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 4: Open Razorpay Payment Window
      const rzpay = new Razorpay(options);
      rzpay.open();

      // Handle payment failures
      rzpay.on("payment.failed", (response) => {
        console.error("Payment Failed:", response);
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (err) {
      console.error("Payment Initialization Error:", err);
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
                    src={mentor?.profile_pic || avatar}
                    alt={`Profile picture of ${mentor?.name || "mentor"}`}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback>
                    {mentor?.name
                      ? mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "JD"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="profile-info flex-col gap-y-1 pt-16 w-full flex sm:ml-8 z-30">
                <div className="mentor-name font-bold text-black text-2xl sm:text-3xl">
                  {mentor?.name || "Unknown mentor"}
                </div>
                <div className="mentor-name text-black text-base sm:text-lg">
                  {mentor?.college || "Unknown College"}
                </div>
                <div className="mentor-college flex text-gray-400 items-center gap-x-2 text-sm sm:text-base">
                  <LocationIcon props="h-4 w-4 sm:h-5 sm:w-5" />
                  {mentor?.location || "Unknown Location"}
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
        <div className="available-slots-booking shadow-lg border-gray-200 rounded-xl border-2 w-full p-4 md:w-2/5 flex flex-col gap-y-4 left-0 mt-8 md:mt-0">
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
                {mentor?.slots?.map((slotInfo, index) => (
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
                            ? "bg-blue-500"
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
                {selectedDate.slots.map((timeSlot, idx) => (
                  <div
                    key={idx}
                    className={`p-2 border rounded-md text-center text-base cursor-pointer ${
                      selectedTimeSlot === timeSlot
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
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
              disabled={bookingInProgress}
              className={`bg-blue-500 text-white text-xl p-2 w-full ${
                selectedTimeSlot ? "" : "opacity-50 cursor-not-allowed"
              }`}
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
