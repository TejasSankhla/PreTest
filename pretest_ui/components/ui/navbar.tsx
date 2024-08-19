import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Button } from "./button";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
function Navbar() {
  return (
    <header className=" bg-secondary text-black py-4 shadow border-b border-gray">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/user-placeholder.png" alt="User avatar" />
                <AvatarFallback />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-sm z-10">
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Bookings</DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
