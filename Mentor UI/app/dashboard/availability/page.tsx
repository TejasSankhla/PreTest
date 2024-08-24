"use client";
import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";

const FullWeekScheduler = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const initialSlots = daysOfWeek.reduce((acc, day) => {
    acc[day] = [{ startTime: "07:00 AM" }];
    return acc;
  }, {});

  const [slots, setSlots] = useState(initialSlots);

  const addSlot = (day) => {
    setSlots({
      ...slots,
      [day]: [...slots[day], { startTime: "07:00 AM" }],
    });
  };

  const removeSlot = (day, index) => {
    const newSlots = slots[day].filter((_, i) => i !== index);
    setSlots({ ...slots, [day]: newSlots });
  };

  const handleTimeChange = (day, index, time) => {
    // Convert time to Date object to handle the addition of 1 hour
    const [hour, minute, period] = time.split(/[:\s]/);
    const date = new Date();
    date.setHours(
      period === "PM" && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour)
    );
    date.setMinutes(parseInt(minute));

    // Add one hour to start time
    const endTimeDate = new Date(date.getTime() + 60 * 60 * 1000);
    const endHour =
      endTimeDate.getHours() > 12
        ? endTimeDate.getHours() - 12
        : endTimeDate.getHours();
    const endPeriod = endTimeDate.getHours() >= 12 ? "PM" : "AM";
    const endMinutes =
      endTimeDate.getMinutes() < 10
        ? `0${endTimeDate.getMinutes()}`
        : endTimeDate.getMinutes();

    const endTime = `${endHour}:${endMinutes} ${endPeriod}`;

    const newSlots = slots[day].map((slot, i) => {
      if (i === index) {
        return { ...slot, startTime: time, endTime };
      }
      return slot;
    });
    setSlots({ ...slots, [day]: newSlots });
  };

  return (
    <div className="flex flex-wrap gap-8 p-4 bg-gray-100">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`${day}-checkbox`}
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`${day}-checkbox`}
                className="text-xl font-semibold text-gray-800"
              >
                {day}
              </label>
            </div>
          </div>
          {slots[day].map((slot, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <TimePicker
                onChange={(time) => handleTimeChange(day, index, time)}
                value={slot.startTime}
                disableClock={true}
                clearIcon={null}
                format="hh:mm a"
                className="border rounded-md p-2 w-full text-center"
              />
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
        </div>
      ))}
    </div>
  );
};

export default FullWeekScheduler;
