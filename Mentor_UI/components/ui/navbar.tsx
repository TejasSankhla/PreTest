"use client";
import React from "react";
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

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-secondary sticky top-0 z-50 text-black py-4 shadow border-b border-gray">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* // navbar logo */}
        <Link
          href="/dashboard/profile"
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

        <nav className="flex justify-center space-x-6 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="object-cover h-full w-full"
                    src={user.profile_pic}
                    alt="User avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-sm bg-white z-50">
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
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button
                asChild
                className="p-4 shadow-2xl text-black hover:bg-gray-100 font-sans"
                variant="outline"
              >
                <Link href="/">Log in </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
