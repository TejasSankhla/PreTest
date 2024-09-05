import { ChevronRight } from "lucide-react";
import React from "react";
import logo_bg from "../../public/logo_bg.png";
import Image from "next/image";
import Link from "next/link";
import pretest_icon from "../../public/icon.png";
function Footer() {
  return (
    <footer className="w-full p-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-0">
        <div className="inline-flex items-center ">
          <Link
            href="/"
            className="flex items-center text-xl font-bold"
            prefetch={false}
          >
            <Image
              src={pretest_icon}
              width={60}
              height={20}
              alt="Logo"
              className="mr-2"
            />
          </Link>
        </div>
        <div className="hidden items-center md:inline-flex">
          <span className="text-sm font-medium text-black">
            Ready to Get Started?
          </span>
          <Link
            href="/"
            className="ml-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </Link>
        </div>
      </div>
      <hr className="my-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
        <div className="w-full px-4 md:w-1/2 lg:px-0">
          <h1 className="max-w-sm text-3xl font-bold">
            Subscribe to our Newsletter
          </h1>
          <form
            action=""
            className="mt-4 inline-flex w-full items-center md:w-3/4"
          >
            <input
              className="flex h-10 w-full rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
            ></input>
            <button
              type="button"
              className="ml-4 rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-gray-700">About</p>
            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
              <li>
                <Link href="/#">About us</Link>
              </li>
              <li>
                <Link href="/#">Our Team</Link>
              </li>
              <li>
                <Link href="/#">Our Vision</Link>
              </li>
            </ul>
          </div>

          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-gray-700">Socials</p>
            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
              <li>
                <Link href="https://www.instagram.com/_txjas/" target="_blank">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://x.com/SankhlaTejas" target="_blank">
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/tejasdev/"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-gray-700">Policies</p>
            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refunds">Cancellation & Refund</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
