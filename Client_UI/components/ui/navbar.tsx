"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          prefetch={false}
        >
          <div className="w-6 h-6 bg-secondary rounded-md flex items-center justify-center text-white text-xs font-bold tracking-tighter">
            P
          </div>
          <span className="text-sm font-semibold tracking-tight text-text-primary">PreTest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-secondary/20 transition-all">
                  <AvatarImage src="/user-placeholder.png" alt="User avatar" />
                  <AvatarFallback className="bg-background-subtle text-text-secondary text-xs font-medium" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-[13px] bg-background z-50 shadow-lg border border-border rounded-xl p-1">
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer rounded-lg px-3 py-2">
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile/my-bookings")} className="cursor-pointer rounded-lg px-3 py-2">
                  Bookings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg px-3 py-2"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              {/* Sign in - Text link */}
              <Link
                href="/auth/log-in"
                className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign in
              </Link>
              {/* Get Started - Dark button */}
              <Link
                href="/auth/sign-up"
                className="bg-gray-900 hover:bg-black text-white text-[13px] font-medium px-3 py-1.5 rounded-full shadow-sm transition-all hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-5 w-5 text-text-secondary" />
          ) : (
            <MenuIcon className="h-5 w-5 text-text-secondary" />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-14 right-4 w-56 rounded-xl bg-background/95 backdrop-blur-md shadow-xl border border-border overflow-hidden"
        >
          <nav className="flex flex-col p-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-[13px] font-medium text-text-primary hover:bg-background-subtle rounded-lg px-4 py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/profile/my-bookings"
                  className="text-[13px] font-medium text-text-primary hover:bg-background-subtle rounded-lg px-4 py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
                <div className="border-t border-border my-1" />
                <button
                  className="text-[13px] font-medium text-red-500 hover:bg-red-50 rounded-lg px-4 py-2.5 text-left transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-2">
                <Link
                  href="/auth/log-in"
                  className="text-[13px] font-medium text-text-secondary hover:text-text-primary text-center py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="bg-gray-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-full text-center transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
