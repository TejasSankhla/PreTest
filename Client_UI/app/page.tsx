"use client";

import { useState, useEffect } from "react";
import { Copy, Code, Heart } from "lucide-react";
import Faq from "@/components/ui/home/faq";

// V1 Components (Original)
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";

// V2 Components (Minimal/Modern) - Default
import {
  HeroSectionV2,
  TrustBarV2,
  HowItWorksV2,
  StatsSectionV2,
} from "@/components/landing/v2";

// Variant Switcher
import VariantSwitcher, {
  LandingVariant,
} from "@/components/landing/VariantSwitcher";

// V1 Stats Data
const V1_STATS = [
  { id: 1, name: "Mock interviews completed", value: "200+" },
  { id: 2, name: "Verified mentors", value: "47+" },
  { id: 3, name: "Would recommend", value: "100%" },
];

export default function Component() {
  const [variant, setVariant] = useState<LandingVariant>("v2");

  // Persist variant choice in localStorage
  useEffect(() => {
    const savedVariant = localStorage.getItem(
      "landing-variant"
    ) as LandingVariant | null;
    if (savedVariant && (savedVariant === "v1" || savedVariant === "v2")) {
      setVariant(savedVariant);
    }
  }, []);

  const handleVariantChange = (newVariant: LandingVariant) => {
    setVariant(newVariant);
    localStorage.setItem("landing-variant", newVariant);
  };

  // V2 Landing Page (Minimal/Modern) - Default
  if (variant === "v2") {
    return (
      <main className="flex-1">
        <HeroSectionV2 />
        <TrustBarV2 />
        <HowItWorksV2 />
        <StatsSectionV2 />
        <Faq />

        {/* Variant Switcher */}
        <VariantSwitcher variant={variant} onVariantChange={handleVariantChange} />
      </main>
    );
  }

  // V1 Landing Page (Original)
  return (
    <main className="flex-1">
      {/* New Hero Section */}
      <HeroSection />

      {/* New Trust Bar - Colleges + Companies */}
      <TrustBar />

      {/* How PreTest Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                How It Works
              </p>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-text-primary">
                From nervous to confident in{" "}
                <span className="text-orange-500">3 steps</span>
              </h2>
            </div>
            <hr className="mb-8" />

            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
              <div className="flex flex-col items-start p-6 rounded-2xl bg-background-subtle hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Copy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Sign Up Free
                </h3>
                <p className="text-base text-text-secondary">
                  Create your account in 2 minutes. No payment required.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 rounded-2xl bg-background-subtle hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Pick Your Mentor
                </h3>
                <p className="text-base text-text-secondary">
                  Browse by company, role, or expertise. Book a time that works
                  for you.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 rounded-2xl bg-background-subtle hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Practice & Get Feedback
                </h3>
                <p className="text-base text-text-secondary">
                  Experience a real mock interview. Get honest feedback. Repeat
                  until ready.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-text-secondary">
              Most students book 2-3 sessions before their real interview. Start
              early.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100/50 py-16 sm:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-text-primary mb-4">
            200+ Students Stopped Guessing
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            &quot;I thought I was ready after 3 months of prep. My first mock
            interview showed me I wasn&apos;t. Glad I found out here, not at
            Google.&quot;
            <span className="block mt-2 text-sm font-medium text-text-secondary">
              — Rahul, Now at Amazon
            </span>
          </p>

          <div className="mx-auto max-w-4xl">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              {V1_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col gap-2 p-6 rounded-2xl bg-white/60 backdrop-blur-sm"
                >
                  <dd className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                    {stat.value}
                  </dd>
                  <dt className="text-base text-text-secondary">{stat.name}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <Faq />

      {/* Variant Switcher */}
      <VariantSwitcher variant={variant} onVariantChange={handleVariantChange} />
    </main>
  );
}
