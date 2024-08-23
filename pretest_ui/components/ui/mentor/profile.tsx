"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile_banner from "../../../public/profile-banner.png";
import Image from "next/image";
import avatar from "../../../public/user-placeholder.png";
import { LocationIcon } from "@/components/constants/icons";
import { Fragment, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
export default function MentorProfile({ mentor }) {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
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

  const handleBooking = async () => {
    if (!selectedTimeSlot) return;

    const bookingData = {
      slot: selectedTimeSlot,
      client: user._id,
    };

    setBookingInProgress(true);

    try {
      console.log(bookingData);

      const response = await axios.post(
        `http://localhost:5500/api/booking/${mentor._id}`,
        bookingData
      );
      console.log(response);

      if (response.status === 201) {
        router.push("/profile/my-bookings");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book the slot. Please try again.");
    } finally {
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
            <div className="absolute left-4 sm:left-32 flex gap-x-4 items-center top-[%] -translate-y-1/3 w-4/5 z-20">
              <div className="profile-avatar">
                <Avatar className="h-36 w-36 sm:h-48 sm:w-48 border-8 border-background border-orange-400">
                  <AvatarImage
                    src={mentor?.profile_pic || avatar}
                    alt={`Profile picture of ${mentor?.name || "mentor"}`}
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
              <div className="profile-info flex-col pt-8 w-full flex sm:ml-8 z-30">
                <div className="mentor-name font-bold text-black text-xl sm:text-3xl">
                  {mentor?.name || "Unknown mentor"}
                </div>
                <div className="mentor-name text-black text-base sm:text-xl">
                  {mentor?.college || "Unknown College"}
                </div>
                <div className="mentor-college flex text-gray-400 items-center gap-x-2 text-base sm:text-lg">
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
        <div className="mentor-details-container md:w-2/5 p-4 text-lg  text-justify">
          {mentor?.about || "No additional information provided."}
        </div>

        <div className="available-slots-booking shadow-lg border-gray-200 rounded-xl border-2 w-full p-4 md:w-2/5 flex flex-col gap-y-4 left-0 mt-8 md:mt-0">
          <div className="container-heading flex text-blue-950  gap-x-2 items-center text-2xl font-bold sm:text-3xl">
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
              <path d="M16 18h.01" />
            </svg>
            Schedule Session
          </div>
          <div className="container-heading text-lg font-medium sm:text-xl">
            Available Dates
          </div>
          {/* // slots carousel */}
          <div className="slots-carousl flex justify-center p-2">
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
                    className={` basis-1/3 cursor-pointer ${
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
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
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
              <h3 className="text-lg text-blue-950 font-medium mb-4 ">
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
              className={` bg-blue-500 text-white text-xl p-2 w-full ${
                selectedTimeSlot ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleBooking}
            >
              Book Slot
            </Button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
