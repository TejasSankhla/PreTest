"use client";

import React from "react";

const colleges = [
  "IIT Bombay",
  "BITS Pilani",
  "IIT Delhi",
  "NIT Trichy",
  "IIIT Hyderabad",
  "DTU",
  "VIT",
];

export default function TrustBarV2() {
  return (
    <section className="py-10 border-y border-gray-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Trusted by students from
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-infinite-scroll w-[200%]">
          {/* Set 1 */}
          <div className="flex items-center justify-around w-full gap-16 px-6">
            {colleges.map((college, index) => (
              <span
                key={`set1-${index}`}
                className="text-lg font-bold text-gray-300 tracking-tight hover:text-gray-500 transition-colors cursor-default whitespace-nowrap"
              >
                {college}
              </span>
            ))}
          </div>
          {/* Set 2 (duplicate for seamless scroll) */}
          <div className="flex items-center justify-around w-full gap-16 px-6">
            {colleges.map((college, index) => (
              <span
                key={`set2-${index}`}
                className="text-lg font-bold text-gray-300 tracking-tight hover:text-gray-500 transition-colors cursor-default whitespace-nowrap"
              >
                {college}
              </span>
            ))}
          </div>
        </div>

        {/* Fade masks */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
