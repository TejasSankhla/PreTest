"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { useState } from "react";
import { Button, buttonVariants } from "./button";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
function Navbar() {
  const [isSignedIn, setisSignedIn] = useState(false);
  return (
    <header className=" bg-secondary sticky top-0 z-20  text-black py-4 shadow border-b border-gray">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link
          href="#"
          className="flex items-center  text-xl font-bold"
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
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            href="#"
            className="hover:underline transition-colors"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:underline transition-colors"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:underline transition-colors"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#"
            className="hover:underline transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
          {isSignedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/user-placeholder.png" alt="User avatar" />
                  <AvatarFallback />F
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-sm bg-white z-30">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Bookings</DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isSignedIn && (
            <Button
              asChild
              className="p-4 shadow-2xl bg-blue-500 text-white hover:bg-blue-300 font-sans"
              variant="outline"
            >
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          )}{" "}
          {!isSignedIn && (
            <Button
              asChild
              className="p-4 shadow-2xl  text-black hover:bg-gray-100 font-sans"
              variant="outline"
            >
              <Link href="/auth/log-in">Log in </Link>
            </Button>
          )}
        </nav>
        <Button variant="secondary" className="md:hidden flex items-center">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
