"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";
import Image from "next/image";
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
    <header className="bg-secondary sticky top-0 z-50 text-black py-4 shadow border-b border-gray">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center text-xl font-bold"
          prefetch={false}
        >
          <Image
            src="/logo_bg.png"
            width={150}
            height={50}
            alt="Logo"
            className="mr-2"
          />
        </Link>
        <nav className="hidden md:flex justify-center space-x-6 items-center">
          <Link
            href="/"
            className="hover:underline  transition-colors"
            prefetch={false}
          >
            Home
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 ">
                  <AvatarImage src="/user-placeholder.png" alt="User avatar" />
                  <AvatarFallback />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-sm bg-white z-50">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile/my-bookings")}>Bookings</DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-slate-200"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                className="p-4 shadow-2xl bg-blue-500 text-white hover:bg-blue-300 font-sans"
                variant="outline"
              >
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
              <Button
                asChild
                className="p-4 shadow-2xl text-black hover:bg-gray-100 font-sans"
                variant="outline"
              >
                <Link href="/auth/log-in">Log in </Link>
              </Button>
            </>
          )}
        </nav>
        <Button
          variant="secondary"
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 right-0 w-1/2 rounded-lg bg-white shadow-lg border-2 border-gray-200"
        >
          <nav className="flex flex-col gap-y-4 p-2 justify-center divide-y-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="hover:underline text-center flex py-2 font-medium items-center justify-center transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false); // Close menu on link click
                  }}
                >
                  My Account
                </Link>
                <Link
                  href="/profile/my-bookings"
                  className="hover:underline text-center flex py-2 font-medium items-center justify-center transition-colors"
                  onClick={() => {
                    console.log("bookings clicked");
                    
                    setIsMobileMenuOpen(false); // Close menu on link click
                  }}
                >
                  Bookings
                </Link>
                <Link
                  href="#"
                  className="hover:underline text-center flex py-2 font-medium items-center justify-center transition-colors"
                  onClick={() => {
                    // setIsMobileMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Button
                  asChild
                  className="p-4 shadow-2xl bg-blue-500 text-white hover:bg-blue-300 font-sans"
                  variant="outline"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
                <Button
                  asChild
                  className="p-4 shadow-2xl text-black hover:bg-gray-100 font-sans"
                  variant="outline"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Link href="/auth/log-in">Log in</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
