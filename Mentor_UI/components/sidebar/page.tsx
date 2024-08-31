"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { CalendarClockIcon, MenuIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const { user } = useAuth();

  useEffect(() => {
    
  }, [user]);
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    user && (
      <div className=" fixed border-r-2 min-h-screen z-40  border-gray-200">
        {/* Hamburger menu for small screens */}
        <button
          className=" md:hidden p-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 z-30 bg-blue-50 py-8 px-4 md:px-8 md:w-64 h-full md:border-r rounded-xl transition-transform duration-300 sidebar ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage
                src={user.profile_pic}
                className="object-cover w-full h-full"
                alt="User Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold md:text-xl">{user.name}</h1>
            </div>
          </div>

          <nav className="mt-8 space-y-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
              prefetch={false}
              onClick={() => setIsOpen(!isOpen)}
            >
              <UserIcon className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/availability"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
              prefetch={false}
              onClick={() => setIsOpen(!isOpen)}
            >
              <CalendarClockIcon className="h-5 w-5" />
              Availability
            </Link>
            <Link
              href="/dashboard/my-bookings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
              prefetch={false}
              onClick={() => setIsOpen(!isOpen)}
            >
              <BookAIcon className="h-5 w-5" />
              Bookings
            </Link>
          </nav>
        </div>

        {/* Overlay when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
          ></div>
        )}
      </div>
    )
  );
}

function BookAIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="m8 13 4-7 4 7" />
      <path d="M9.1 11h5.7" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
