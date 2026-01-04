"use client";
import React, { useState, useEffect } from "react";
import { Button, Badge, Container, Spinner } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { apiClient, API_ROUTES, Booking, User } from "@/lib/api";
import { useAuthGuard } from "@/hooks";
import Link from "next/link";

type BookingType = "upcoming" | "past";

function Page() {
  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuthGuard();
  const [activeButton, setActiveButton] = useState<BookingType>("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsData, setBookingsData] = useState<Record<BookingType, Booking[]>>({
    upcoming: [],
    past: [],
  });
  const [isDataFetched, setIsDataFetched] = useState<Record<BookingType, boolean>>({
    upcoming: false,
    past: false,
  });

  const handleButtonClick = (buttonType: BookingType) => {
    setActiveButton(buttonType);
  };

  // Fetch bookings when the activeButton changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?._id || authUser?._id; // Ensure userId is available from localStorage or context

    if (!userId) {
      return;
    }

    const fetchBookings = async () => {
      try {
        const url =
          activeButton === "upcoming"
            ? API_ROUTES.booking.upcoming(userId)
            : API_ROUTES.booking.past(userId);

        // Check if data is already fetched
        if (isDataFetched[activeButton]) {
          setBookings(bookingsData[activeButton]);
          return;
        }

        const response = await apiClient.get(url);

        const fetchedBookings = response.data.data;
        setBookings(fetchedBookings);
        setBookingsData((prev) => ({
          ...prev,
          [activeButton]: fetchedBookings,
        }));
        setIsDataFetched((prev) => ({
          ...prev,
          [activeButton]: true,
        }));
      } catch {
        // Error fetching bookings - silent fail
      }
    };

    fetchBookings();
  }, [activeButton, authUser, isDataFetched, bookingsData]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Will redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container size="xl" className="py-8">
      <div className="flex flex-col">
        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => handleButtonClick("upcoming")}
            variant={activeButton === "upcoming" ? "primary" : "outline"}
            rounded="lg"
            className="flex-1 sm:flex-none"
          >
            Upcoming Bookings
          </Button>
          <Button
            onClick={() => handleButtonClick("past")}
            variant={activeButton === "past" ? "primary" : "outline"}
            rounded="lg"
            className="flex-1 sm:flex-none"
          >
            Past Bookings
          </Button>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-border rounded-xl">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-background-subtle">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-body-sm font-medium text-text-secondary"
                    >
                      Mentor
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-body-sm font-medium text-text-secondary"
                    >
                      Session
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-body-sm font-medium text-text-secondary"
                    >
                      Booked on
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-body-sm font-medium text-text-secondary"
                    >
                      {activeButton === "upcoming" ? "Action" : "Details"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12">
                        <EmptyState
                          icon="calendar"
                          title={`No ${activeButton} bookings`}
                          description={
                            activeButton === "upcoming"
                              ? "You don't have any upcoming sessions. Book a mentor to get started!"
                              : "You haven't completed any sessions yet."
                          }
                        />
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  booking.mentor?.profile_pic ||
                                  "/default-avatar.jpg"
                                }
                                alt="Mentor Profile"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/default-avatar.jpg";
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-body-sm font-medium text-text-primary">
                                {booking.mentor?.name || "N/A"}
                              </div>
                              <div className="text-body-xs text-text-tertiary">
                                {booking.mentor?.college || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-body-sm font-medium text-text-primary">
                            {new Date(booking.slot).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-body-xs text-text-tertiary">
                            {new Date(booking.slot).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-body-sm text-text-secondary">
                          {new Date(booking.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {activeButton === "upcoming" ? (
                            booking.meeting_link ? (
                              <Button
                                asChild
                                variant="primary"
                                size="sm"
                              >
                                <Link href={booking.meeting_link} target="_blank">
                                  Join Meeting
                                </Link>
                              </Button>
                            ) : (
                              <Badge variant="warning" size="md">
                                Link pending
                              </Badge>
                            )
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // TODO: Implement view details modal/page
                                console.log("View details for booking:", booking._id);
                              }}
                            >
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Page;
