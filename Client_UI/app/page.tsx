import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import InfiniteScroll from "@/components/ui/home/scrollBar";
import Faq from "@/components/ui/home/faq";
import React from "react";
import { Copy, Code, Heart } from "lucide-react";

export default function Component() {
  const stats = [
    { id: 1, name: "Students mentored by our experts", value: "200+" },
    { id: 2, name: "Mentors from top colleges", value: "47+" },
    { id: 3, name: "positive feedback for mentors", value: "100%" },
  ];

  return (
    <main className="flex-1 ">
      <section className="pt-10 md:pt-20  bg-secondary">
        <div className="container flex flex-col  items-center justify-center mx-auto px-4 md:px-6">
          <div className="text-3xl sm:text-5xl  md:text-6xl  text-black mb-4 font-medium text-center ">
            Build Your Career The
          </div>
          <div className=" text-textp text-3xl md:text-6xl  sm:text-5xl italic font-serif   mb-4">
            <span className="line-through">Random Way</span> Right Way
          </div>
          <p className="text-lg text-justify sm:text-xl md:text-center  text-gray-600 mb-8">
            Connect with top college students and professionals to prepare for
            mock interviews and peer learning – all for free.
          </p>
          {/* // actions  */}
          <div className="flex flex-col w-full sm:flex-row sm:justify-center  gap-4 mb-8">
            <Button asChild className="p-4 shadow-2xl" variant="outline">
              <Link href="/explore-mentors">Book a free trial</Link>
            </Button>
            <Button asChild className=" bg-gray-900 text-white p-4  shadow-2xl">
              <Link href="/explore-mentors">Find your mentor</Link>
            </Button>
          </div>
          {/* // features  */}
          <div className="hidden sm:flex mb-8">
            <div className="flex gap-4">
              <span className=" text-sm flex gap-2">
                <CheckIcon
                  className="bg-blue-500  rounded-full p-1 text-white"
                  height={20}
                  width={20}
                />
                No payment required
              </span>
              <span className=" text-sm flex gap-2">
                <CheckIcon
                  className="bg-blue-500  rounded-full p-1 text-white"
                  height={20}
                  width={20}
                />
                Verified Mentors Only
              </span>
              <span className=" text-sm flex gap-2">
                <CheckIcon
                  className="bg-blue-500  rounded-full p-1 text-white"
                  height={20}
                  width={20}
                />
                Reschedule Anytime
              </span>
            </div>
          </div>
          {/* // scroll animation  */}
          <div className=" w-4/5 flex  flex-col gap-6 mt-4 items-center justify-center">
            <span className=" text-orange-400 font-bold text-xl md:text-2xl mb-2">
              Mentors from top colleges
            </span>
            <div className=" max-w-full  ">
              <InfiniteScroll />
            </div>
          </div>
          <div className="feature mt-8 py-4 w-full text-ce ">
            {/* // how pretest works */}
            <div className="mx-auto max-w-7xl  px-2 my-16 lg:px-8">
              <div className="mb-4 max-w-lg">
                <p className="text-sm font-semibold  text uppercase tracking-widest text-black">
                  Get Started in 3 Easy Steps
                </p>
                <h2 className="mt-6 text-2xl md:text-3xl flex gap-2 font-bold leading-tight text-black">
                  How <div className="orange text-orange-400"> Pretest </div>{" "}
                  Works
                </h2>
              </div>
              <hr />

              <div className="mt-8  grid grid-cols-1 items-center gap-6 md:grid-cols-2 ">
                <div className="flex items-start">
                  <Copy className="h-5 w-5 md:h-9 md:w-9 text-gray-700" />
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-black">
                      Sign Up
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Create your free account in minutes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="h-5 w-5 md:h-9 md:w-9md:h-9 md:w-9 text-gray-700" />
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-black">
                      Book a Mentor
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Choose from top students and professionals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 md:h-9 md:w-9 text-gray-700" />
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-black">
                      Prepare & Learn
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Schedule your mock interview and receive expert feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 md:h-9 md:w-9 text-gray-700" />
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-black">
                      Get Notified
                    </h3>
                    <p className="mt-3 text-base text-gray-600">
                      Receive your meeting schedule via email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="bg-orange-50 py-8 sm:py-16">
          <div className=" flex justify-center mb-8 text-lg  md:text-2xl  text-blue-950 font-semibold items-center">
            How we have helped other students
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="mx-auto flex max-w-xs flex-col gap-y-2 md:gap-y-4"
                >
                  <dt className="text-base leading-7 text-gray-600">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      {/* FAQS */}
      <Faq />
    </main>
  );
}
