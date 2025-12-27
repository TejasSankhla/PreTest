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
import { useRouter, usePathname } from "next/navigation";
import { Button, Container, Logo } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Navigation links
  const navLinks = [
    { href: ROUTES.exploreMentors, label: "Find Mentors" },
    { href: ROUTES.anchors.howItWorks, label: "How It Works" },
  ];


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
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border/50">
      <Container size="full" padding="default" className="h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={ROUTES.home}
          className="flex items-center"
          prefetch={false}
        >
          <Logo variant="variant1" size="md" mode="full" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-text-primary ${
                pathname === link.href
                  ? "text-text-primary"
                  : "text-text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-secondary/20 transition-all">
                  <AvatarImage src="/user-placeholder.png" alt="User avatar" />
                  <AvatarFallback className="bg-background-subtle text-text-secondary text-xs font-medium" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-[13px] bg-background z-50 shadow-lg border border-border rounded-xl p-1">
                <DropdownMenuItem onClick={() => router.push(ROUTES.profile.index)} className="cursor-pointer rounded-lg px-3 py-2">
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(ROUTES.profile.bookings)} className="cursor-pointer rounded-lg px-3 py-2">
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
            <>
              {/* Sign in - Text link */}
              <Link
                href={ROUTES.auth.logIn}
                className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign in
              </Link>
              {/* Get Started - Dark button */}
              <Button asChild variant="secondary" size="sm" rounded="full">
                <Link href={ROUTES.auth.signUp}>
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          rounded="lg"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-5 w-5 text-text-secondary" />
          ) : (
            <MenuIcon className="h-5 w-5 text-text-secondary" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </Container>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-14 right-4 w-56 rounded-xl bg-background/95 backdrop-blur-md shadow-xl border border-border overflow-hidden"
        >
          <nav className="flex flex-col p-2">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium rounded-lg px-4 py-2.5 transition-colors ${
                  pathname === link.href
                    ? "text-text-primary bg-background-subtle"
                    : "text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border my-1" />

            {user ? (
              <>
                <Link
                  href={ROUTES.profile.index}
                  className="text-[13px] font-medium text-text-primary hover:bg-background-subtle rounded-lg px-4 py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href={ROUTES.profile.bookings}
                  className="text-[13px] font-medium text-text-primary hover:bg-background-subtle rounded-lg px-4 py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
                <div className="border-t border-border my-1" />
                <Button
                  variant="danger-ghost"
                  size="sm"
                  rounded="lg"
                  className="justify-start w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-2">
                <Link
                  href={ROUTES.auth.logIn}
                  className="text-[13px] font-medium text-text-secondary hover:text-text-primary text-center py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Button asChild variant="secondary" size="sm" rounded="full" className="w-full">
                  <Link
                    href={ROUTES.auth.signUp}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
