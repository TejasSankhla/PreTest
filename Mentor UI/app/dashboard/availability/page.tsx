"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Function to generate time slots with a 15-minute interval
const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  const periods = ["AM", "PM"];

  for (let hour = startHour; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour < 12 ? periods[0] : periods[1];
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      // a slots starting time
      const startTime = `${displayHour}:${
        minute < 10 ? "0" + minute : minute
      } ${period}`;
      // generate time after 1 hour
      const endTime = new Date(0, 0, 0, hour, minute);
      endTime.setHours(endTime.getHours() + 1);
      // now the end time contains the slots ending time but need to correctly format
      const endPeriod =
        endTime.getHours() < 12 || endTime.getHours() === 24
          ? periods[0]
          : periods[1];
      const displayEndHour =
        endTime.getHours() % 12 === 0 ? 12 : endTime.getHours() % 12;
      const endSlot = `${displayEndHour}:${
        endTime.getMinutes() < 10
          ? "0" + endTime.getMinutes()
          : endTime.getMinutes()
      } ${endPeriod}`;
      slots.push(`${startTime}-${endSlot}`);
    }
  }

  return slots;
};

// Generate time slots from 7:00 AM to 12:00 AM to restrict mentor between these two
const timeSlots = generateTimeSlots(7, 24);

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

  // Mapping days of the week to their numeric values
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
    // Fetch slots data on page load
    const fetchSlots = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("mentor"));
        const mentorId = user?.id;
        const response = await fetch(
          `http://localhost:5500/api/mentor/${mentorId}`
        );
        const result = await response.json();

        // Map weekday numbers to day names
        const numberToDay = {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        };

        // Map slots data to the state format
        const fetchedSlots = Object.entries(result.data.selectedSlots).reduce(
          (acc, [dayNumber, slotsArray]) => {
            const dayName = numberToDay[dayNumber];
            acc[dayName] = slotsArray.map((slot) => {
              const slotDate = new Date(slot);
              const timeSlot = `${slotDate.getHours() % 12 || 12}:${slotDate
                .getMinutes()
                .toString()
                .padStart(2, "0")} ${slotDate.getHours() < 12 ? "AM" : "PM"}-${
                slotDate.getHours() + 1
              }:${slotDate.getMinutes().toString().padStart(2, "0")} ${
                slotDate.getHours() + 1 < 12 ? "AM" : "PM"
              }`;
              return { startTime: timeSlot, date: slotDate };
            });
            return acc;
          },
          {}
        );

        console.log("fetched slots processed ", fetchedSlots);

        // Initialize slots state with fetched data
        setSlots((prevSlots) => ({
          ...prevSlots,
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
      [day]: [...slots[day], { startTime: timeSlots[0], date: new Date() }],
    });
    setErrors({ ...errors, [day]: null });
  };

  const removeSlot = (day, index) => {
    const newSlots = slots[day].filter((_, i) => i !== index);
    setSlots({ ...slots, [day]: newSlots });
    setErrors({ ...errors, [day]: null });
  };

  const parseTimeSlot = (timeSlot) => {
    const [start, period] = timeSlot.split(" ");
    const [startHour] = start.split("-");
    const hour =
      period === "PM" && startHour !== "12"
        ? parseInt(startHour) + 12
        : parseInt(startHour);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    return date;
  };

  const handleTimeChange = (day, index, timeSlot) => {
    const selectedTime = parseTimeSlot(timeSlot);

    // Check for conflicts within 1 hour
    const hasConflict = slots[day].some((slot, i) => {
      if (i !== index) {
        const existingTime = parseTimeSlot(slot.startTime);
        const diff = Math.abs(selectedTime - existingTime) / (60 * 1000); // difference in minutes
        return diff < 60; // conflict if within 60 minutes
      }
      return false;
    });

    if (hasConflict) {
      setErrors({
        ...errors,
        [day]: `Selected slot on ${day} is within 1 hour of another slot.`,
      });
      // Clear the conflicting slot's value
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
        return { startTime: timeSlot, date: selectedTime };
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

      // Get mentor ID from localStorage or any other source
      const user = JSON.parse(localStorage.getItem("mentor"));
      const mentorId = user?.id;
      console.log("slots before sending to backend", formattedSlots);

      // Send PATCH request to update slots
      const response = await fetch(
        `http://localhost:5500/api/mentor/slots/${mentorId}`,
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

      const result = await response.json();

      // Optionally show a success message or update UI
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly gap-8 p-4 ">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-start mb-6">
            <div className="flex items-center">
              <label
                htmlFor={`${day}-checkbox`}
                className="text-xl font-semibold text-gray-800"
              >
                {day}
              </label>
            </div>
          </div>
          {slots[day]?.map((slot, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <select
                value={slot.startTime}
                onChange={(e) => handleTimeChange(day, index, e.target.value)}
                className="border rounded-md p-2 w-full text-center"
              >
                {timeSlots.map((timeSlot) => (
                  <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeSlot(day, index)}
                className="ml-4 p-2 text-red-600 hover:text-red-800 focus:outline-none"
                title="Remove slot"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() => addSlot(day)}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add slot
          </button>
          {errors[day] && (
            <div className="text-red-600 text-sm mt-2">{errors[day]}</div>
          )}
        </div>
      ))}
      {/* Update Availability Button */}
      <div className="w-full mt-8">
        <Button
          onClick={handleUpdateAvailability}
          className="bg-black text-white hover:bg-slate-700"
        >
          Update Availability
        </Button>
      </div>
    </div>
  );
};

export default FullWeekScheduler;
