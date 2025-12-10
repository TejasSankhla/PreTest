"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

// College logos
import IITK from "@/public/colleges/IITK.png";
import IITD from "@/public/colleges/IITD.png";
import IITM from "@/public/colleges/IITM.png";
import IITB from "@/public/colleges/IITB.png";
import IITH from "@/public/colleges/IITH.png";
import IIITL from "@/public/colleges/IIITL.png";
import IIITR from "@/public/colleges/IIITR.png";

// Company logos
import Google from "@/public/companies/google.png";
import Amazon from "@/public/companies/amazon.png";
import Microsoft from "@/public/companies/microsoft.png";
import Flipkart from "@/public/companies/flipkart.png";
import Razorpay from "@/public/companies/razorpay.png";
import Swiggy from "@/public/companies/swiggy.png";

const collegeLogos = [
  { src: IITK, alt: "IIT Kanpur" },
  { src: IITD, alt: "IIT Delhi" },
  { src: IITM, alt: "IIT Madras" },
  { src: IITB, alt: "IIT Bombay" },
  { src: IITH, alt: "IIT Hyderabad" },
  { src: IIITL, alt: "IIIT Lucknow" },
  { src: IIITR, alt: "IIIT Ranchi" },
];

const companyLogos = [
  { src: Google, alt: "Google" },
  { src: Amazon, alt: "Amazon" },
  { src: Microsoft, alt: "Microsoft" },
  { src: Flipkart, alt: "Flipkart" },
  { src: Razorpay, alt: "Razorpay" },
  { src: Swiggy, alt: "Swiggy" },
];

interface LogoScrollProps {
  logos: typeof collegeLogos;
  direction?: "left" | "right";
}

function LogoScroll({ logos, direction = "left" }: LogoScrollProps) {
  const animationClass =
    direction === "left" ? "animate-infinite-scroll" : "animate-infinite-scroll-reverse";

  return (
    <div className="max-w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
      <ul className={`flex items-center justify-center md:justify-start flex-shrink-0 [&_li]:mx-6 md:[&_li]:mx-8 [&_img]:max-w-none ${animationClass}`}>
        {logos.map((logo, index) => (
          <li key={index} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={60}
              width={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            />
          </li>
        ))}
      </ul>
      <ul
        className={`flex items-center justify-center md:justify-start flex-shrink-0 [&_li]:mx-6 md:[&_li]:mx-8 [&_img]:max-w-none ${animationClass}`}
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <li key={index} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={60}
              width={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Colleges Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 md:mb-12"
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Mentors from Top Colleges
          </p>
          <LogoScroll logos={collegeLogos} direction="left" />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10 md:mb-12">
          <div className="h-px w-16 bg-gray-200" />
          <span className="text-gray-300 text-sm">×</span>
          <div className="h-px w-16 bg-gray-200" />
        </div>

        {/* Companies Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Now Working At
          </p>
          <LogoScroll logos={companyLogos} direction="right" />
        </motion.div>
      </div>
    </section>
  );
}
