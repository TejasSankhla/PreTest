"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Backend_Base_URL } from "@/context/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to generate time slots with a 15-minute interval
const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  const periods = ["AM", "PM"];

  const formatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? periods[1] : periods[0];
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const startDate = new Date();
  startDate.setHours(startHour, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(endHour, 0, 0, 0);

  let currentStart = new Date(startDate);
  while (currentStart < endDate) {
    const currentEnd = new Date(currentStart);
    currentEnd.setMinutes(currentEnd.getMinutes() + 60);

    slots.push(`${formatTime(currentStart)}-${formatTime(currentEnd)}`);

    currentStart.setMinutes(currentStart.getMinutes() + 15);
  }

  return slots;
};

// Generate time slots from 7:00 AM to 12:00 AM to restrict mentor between these two
const timeSlots = generateTimeSlots(10, 20);

const FullWeekScheduler = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayToNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const [slots, setSlots] = useState(() =>
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [{ startTime: timeSlots[0], date: new Date() }];
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("mentor"));
        const mentorId = user?.id;
        const response = await fetch(
          `${Backend_Base_URL}/api/mentor/${mentorId}`
        );
        const result = await response.json();

        const numberToDay = {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        };

        const fetchedSlots = Object.entries(result.data.selectedSlots).reduce(
          (acc, [dayNumber, slotsArray]) => {
            const dayName = numberToDay[dayNumber];
            acc[dayName] = slotsArray.map((slot) => {
              const slotDate = new Date(slot);

              // Format time in 12-hour format
              const period = slotDate.getHours() < 12 ? "AM" : "PM";
              const hours = slotDate.getHours() % 12 || 12; // Converts 0 to 12
              const minutes = slotDate.getMinutes().toString().padStart(2, "0");

              const timeSlot = `${hours}:${minutes} ${period}-${
                (hours + 1) % 12
              }:${minutes} ${
                hours + 1 < 12 ? period : period == "AM" ? "PM" : "AM"
              }`;

              const matchedSlot = timeSlots.find(
                (availableSlot) =>
                  parseTimeSlot(availableSlot).startDate.getTime() ===
                  slotDate.getTime()
              );

              return {
                startTime: matchedSlot || timeSlot, // Use matched slot or fallback to the original
                date: slotDate,
              };
            });
            return acc;
          },
          {}
        );

        setSlots((prevSlots) => ({
          ...fetchedSlots,
        }));
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []);

  const addSlot = (day) => {
    setSlots({
      ...slots,
      [day]: [
        ...slots[day],
        { startTime: timeSlots[0], date: convertToDate(timeSlots[0]) },
      ],
    });
    setErrors({ ...errors, [day]: null });
  };

  const removeSlot = (day, index) => {
    const newSlots = slots[day].filter((_, i) => i !== index);
    setSlots({ ...slots, [day]: newSlots });
    setErrors({ ...errors, [day]: null });
  };

  const convertToDate = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    let adjustedHour = hour;

    if (period === "PM" && hour !== 12) {
      adjustedHour += 12;
    } else if (period === "AM" && hour === 12) {
      adjustedHour = 0;
    }

    const date = new Date();
    date.setHours(adjustedHour);
    date.setMinutes(minute);
    date.setSeconds(0);
    return date;
  };

  const parseTimeSlot = (timeSlot) => {
    const [startTime, endTime] = timeSlot.split("-");
    const startDate = convertToDate(startTime);
    const endDate = convertToDate(endTime);

    return { startDate, endDate };
  };

  const handleTimeChange = (day, index, timeSlot) => {
    const { startDate: selectedStartDate, endDate: selectedEndDate } =
      parseTimeSlot(timeSlot);

    const hasConflict = slots[day].some((slot, i) => {
      if (i !== index) {
        const { startDate: existingStartDate } = parseTimeSlot(slot.startTime);
        const diff =
          Math.abs(selectedStartDate - existingStartDate) / (60 * 1000);
        return diff < 60;
      }
      return false;
    });

    if (hasConflict) {
      setErrors({
        ...errors,
        [day]: `Selected slot on ${day} is within 1 hour of another slot.`,
      });
      const newSlots = slots[day].map((slot, i) => {
        if (i === index) {
          return { startTime: "", date: null };
        }
        return slot;
      });

      setSlots({ ...slots, [day]: newSlots });
      return;
    } else {
      setErrors({ ...errors, [day]: null });
    }

    const newSlots = slots[day].map((slot, i) => {
      if (i === index) {
        return { startTime: timeSlot, date: selectedStartDate };
      }
      return slot;
    });

    setSlots({ ...slots, [day]: newSlots });
  };

  const handleUpdateAvailability = async () => {
    try {
      const formattedSlots = daysOfWeek.reduce((acc, day) => {
        acc[dayToNumber[day]] = slots[day].map((slot) =>
          slot.date.toISOString()
        );
        return acc;
      }, {});

      const user = JSON.parse(localStorage.getItem("mentor"));
      const mentorId = user?.id;

      const response = await fetch(
        `${Backend_Base_URL}/api/mentor/slots/${mentorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedSlots),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update availability: ${response.statusText}`
        );
      }

      toast.success("Availability updated");

    } catch (error) {
      toast.error("Failed to update availability");
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly gap-8 p-4 ">
      <div className="w-4/5 flex flex-col md:flex-row items-center justify-between mt-8">
        <div className="text-xl md:ml-4 mb-4 md:mb-0">
          Choose slots on if available
        </div>
        <Button
          onClick={handleUpdateAvailability}
          className="bg-black text-white text-base p-2"
        >
          Save changes
        </Button>
      </div>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between   mb-6">
            <label
              htmlFor={`${day}-checkbox`}
              className="text-2xl font-semibold text-gray-800 block"
            >
              {day}
            </label>
            <Button
              variant="secondary"
              className=" p-2 text-base bg-blue-600 text-white"
              onClick={() => addSlot(day)}
            >
              Add Slot
            </Button>
          </div>

          {slots[day].map((slot, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <select
                value={slot.startTime}
                onChange={(e) => handleTimeChange(day, index, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              >
                {timeSlots.map((timeSlot) => (
                  <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
              <Button
                variant="destructive"
                className="ml-4 text-red-600 text-2xl"
                onClick={() => removeSlot(day, index)}
              >
                x
              </Button>
            </div>
          ))}
          {errors[day] && (
            <p className="text-red-500 text-sm mt-2">{errors[day]}</p>
          )}
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default FullWeekScheduler;
