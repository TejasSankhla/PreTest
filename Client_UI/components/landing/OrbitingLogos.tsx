"use client";

import { ReactNode } from "react";
import Image from "next/image";

// Company logos
import Google from "@/public/companies/google.png";
import Amazon from "@/public/companies/amazon.png";
import Microsoft from "@/public/companies/microsoft.png";
import Flipkart from "@/public/companies/flipkart.png";
import Razorpay from "@/public/companies/razorpay.png";
import Swiggy from "@/public/companies/swiggy.png";

const outerOrbitLogos = [
  { src: Google, alt: "Google" },
  { src: Amazon, alt: "Amazon" },
  { src: Microsoft, alt: "Microsoft" },
];

const innerOrbitLogos = [
  { src: Flipkart, alt: "Flipkart" },
  { src: Razorpay, alt: "Razorpay" },
  { src: Swiggy, alt: "Swiggy" },
];

interface OrbitingLogosProps {
  children: ReactNode;
}

export default function OrbitingLogos({ children }: OrbitingLogosProps) {
  // Orbit dimensions - outer orbit is the container size
  const outerSize = 800;
  const innerSize = 560;
  const innerOffset = (outerSize - innerSize) / 2; // Center the inner orbit

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: `${outerSize}px` }}>
      {/* Orbit System - Desktop only */}
      <div className="hidden lg:block absolute" style={{ width: `${outerSize}px`, height: `${outerSize}px` }}>
        {/* Outer orbit ring - VISIBLE */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px dashed rgba(59, 130, 246, 0.35)',
          }}
        />

        {/* Inner orbit ring - VISIBLE */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            top: `${innerOffset}px`,
            left: `${innerOffset}px`,
            border: '2px dashed rgba(249, 115, 22, 0.35)',
          }}
        />

        {/* Outer orbit - rotating container */}
        <div
          className="absolute animate-orbit-slow"
          style={{
            width: `${outerSize}px`,
            height: `${outerSize}px`,
            top: '0',
            left: '0',
          }}
        >
          {outerOrbitLogos.map((logo, index) => {
            const angle = (index * 120) - 90; // Evenly spaced, starting from top
            const radius = outerSize / 2;
            const logoSize = 72;
            const x = radius + radius * Math.cos((angle * Math.PI) / 180) - logoSize / 2;
            const y = radius + radius * Math.sin((angle * Math.PI) / 180) - logoSize / 2;
            return (
              <div
                key={logo.alt}
                className="absolute animate-counter-rotate-slow"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                <div className="w-full h-full bg-white rounded-2xl shadow-lg p-3 border border-gray-100 hover:scale-110 hover:shadow-xl transition-all duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inner orbit - rotating opposite direction */}
        <div
          className="absolute animate-orbit-fast"
          style={{
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            top: `${innerOffset}px`,
            left: `${innerOffset}px`,
          }}
        >
          {innerOrbitLogos.map((logo, index) => {
            const angle = (index * 120) + 30; // Offset from outer orbit
            const radius = innerSize / 2;
            const logoSize = 60;
            const x = radius + radius * Math.cos((angle * Math.PI) / 180) - logoSize / 2;
            const y = radius + radius * Math.sin((angle * Math.PI) / 180) - logoSize / 2;
            return (
              <div
                key={logo.alt}
                className="absolute animate-counter-rotate-fast"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                <div className="w-full h-full bg-white rounded-2xl shadow-lg p-2.5 border border-gray-100 hover:scale-110 hover:shadow-xl transition-all duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center glow effect */}
        <div
          className="absolute rounded-full bg-gradient-radial from-blue-100/40 via-transparent to-transparent blur-3xl"
          style={{
            width: '450px',
            height: '450px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Center content - THE SUN */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>

      {/* Mobile: Static company logos */}
      <div className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        {[...outerOrbitLogos, ...innerOrbitLogos].slice(0, 4).map((logo) => (
          <div
            key={logo.alt}
            className="w-12 h-12 bg-white rounded-xl shadow-md p-2 border border-gray-100"
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
