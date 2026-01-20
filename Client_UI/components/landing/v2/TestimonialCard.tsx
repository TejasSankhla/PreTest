"use client";

import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  college: string;
  quote: string;
  outcome: string;
  company: string;
  avatar: string;
}

export default function TestimonialCard({
  name,
  college,
  quote,
  outcome,
  company,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-background-subtle border border-border rounded-2xl p-8 hover:shadow-md transition-all h-full flex flex-col">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-secondary mb-4 opacity-50" />

      {/* Quote Text */}
      <p className="text-base text-text-primary leading-relaxed mb-6 flex-1">
        &quot;{quote}&quot;
      </p>

      {/* Student Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-border bg-background"
        />
        <div>
          <h4 className="text-sm font-bold text-text-primary">{name}</h4>
          <p className="text-xs text-text-tertiary">{college}</p>
        </div>
      </div>

      {/* Outcome Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-secondary-dark rounded-full w-fit">
        <span className="text-sm font-bold text-white">{outcome}</span>
      </div>
    </div>
  );
}
