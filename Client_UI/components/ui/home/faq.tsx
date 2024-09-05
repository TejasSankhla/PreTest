"use client";
import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-0">
      <div>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
          {/* 1 faq */}
          <div className="rounded-md border border-gray-400 shadow-lg transition-all duration-200">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(0)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-black">
                What is PreTest?
              </span>
              {openIndex === 0 ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === 0 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-gray-500">
                  Pretest is a free platform that connects students with mentors
                  from top colleges and industries to prepare for mock
                  interviews and peer learning sessions. Whether you're looking
                  to polish your interview skills or learn from peers, Pretest
                  provides a supportive environment to help you succeed.
                </p>
              </div>
            )}
          </div>
          {/* 2 faq */}
          <div className="rounded-md border border-gray-400 shadow-lg transition-all duration-200">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(1)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-black">
                Who can be a mentor on Pretest, and how do I book an
                appointment?
              </span>
              {openIndex === 1 ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === 1 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-gray-500">
                  Mentors on Pretest include students from top colleges and
                  working professionals. You can book an appointment by browsing
                  available mentors, selecting a time that fits your schedule,
                  and receiving your meeting details via email.
                </p>
              </div>
            )}
          </div>
          {/* 3 faq */}
          <div className="rounded-md border border-gray-400 shadow-lg transition-all duration-200">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              onClick={() => toggleOpen(2)}
            >
              <span className="flex text-base sm:text-lg font-semibold text-black">
                Do I need to pay for sessions on Pretest?
              </span>
              {openIndex === 2 ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === 2 && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-sm sm:text-base text-gray-500">
                  No, Pretest is completely free to use. You can book sessions
                  with mentors, participate in peer learning, and access all
                  features without any cost. Our goal is to make high-quality
                  mentorship and interview preparation accessible to everyone.
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-base mt-6 text-center text-gray-600">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a
            href="#"
            title=""
            className="font-semibold text-black hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
}

export default Faq;
