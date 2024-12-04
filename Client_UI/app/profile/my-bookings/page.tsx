"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Backend_Base_URL } from "@/context/constants";
import Link from "next/link";
function Page() {
  const { user: authUser } = useAuth();
  const [activeButton, setActiveButton] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [bookingsData, setBookingsData] = useState({
    upcoming: [],
    past: [],
  });
  const [isDataFetched, setIsDataFetched] = useState({
    upcoming: false,
    past: false,
  });

  const handleButtonClick = (buttonType : string) => {
    setActiveButton(buttonType);
  };

  // Fetch bookings when the activeButton changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || authUser?._id; // Ensure userId is available from localStorage or context

    if (!userId) {
      console.log("User ID not found!");
      return;
    }

    const fetchBookings = async () => {
      try {
        const url =
          activeButton === "upcoming"
            ? `${Backend_Base_URL}/api/booking/user/upcoming/${userId}`
            : `${Backend_Base_URL}/api/booking/user/prev/${userId}`;

        // Check if data is already fetched
        if (isDataFetched[activeButton]) {
          setBookings(bookingsData[activeButton]);
          return;
        }

        const response = await axios.get(url);

        const fetchedBookings = response.data.data; // Assuming response contains bookings array
        setBookings(fetchedBookings);
        setBookingsData((prev) => ({
          ...prev,
          [activeButton]: fetchedBookings,
        }));
        setIsDataFetched((prev) => ({
          ...prev,
          [activeButton]: true,
        }));
      } catch (error) {
        console.log("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  }, [activeButton, authUser, isDataFetched, bookingsData]);
  
  return (
    <div className="w-full h-full flex mt-8 items-center mx-auto justify-center">
      <div className="bookings-container w-4/5 flex-col items-center">
        {/* Button Section */}
        <div className="flex divide-slate-400 divide-x-2 items-center justify-evenly">
          <button
            onClick={() => handleButtonClick("upcoming")}
            className={`px-4 py-2 w-1/2 relative rounded-md ${
              activeButton === "upcoming"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-black hover:bg-gray-400"
            }`}
          >
            Upcoming Bookings
          </button>
          <button
            onClick={() => handleButtonClick("past")}
            className={`px-4 py-2 w-1/2 relative rounded-md ${
              activeButton === "past"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-black hover:bg-gray-400"
            }`}
          >
            Past Bookings
          </button>
        </div>
        {/* // Bookings table */}
        <div className="my-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Mentor</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        College
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Slot
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Booked on
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Meeting Link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {bookings.map((booking, index) => (
                      <tr key={index} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  booking.mentor?.profile_pic ||
                                  "/default-avatar.jpg"
                                }
                                alt="Mentor Profile"
                                onError={(e) =>
                                  (e.target.src = "/default-avatar.jpg")
                                }
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {booking.mentor?.name || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {booking.mentor?.college || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.mentor?.branch || "N/A"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex items-center justify-center rounded-lg bg-green-200 px-3 py-1.5 text-sm font-medium text-green-800 shadow-sm ring-1 ring-green-300">
                            {new Date(booking.slot).toLocaleString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString() ||
                            "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 flex items-center justify-center text-right text-sm font-medium">
                          {booking.meeting_link ? (
                            <Button
                              asChild
                              className="bg-blue-600 text-white"
                              variant="outline"
                            >
                              <Link href={booking.meeting_link}>
                                Meeting Link
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              className="bg-red-600 text-white"
                              variant="outline"
                            >
                              Not available
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
