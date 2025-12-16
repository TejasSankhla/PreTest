"use client";

import { Star } from "lucide-react";

interface MentorCardProps {
  name: string;
  role: string;
  college: string;
  rating: number;
  sessions: number;
  expertise: string[];
  avatar: string;
  company: string;
}

export default function MentorCard({
  name,
  role,
  college,
  rating,
  sessions,
  expertise,
  avatar,
  company,
}: MentorCardProps) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 hover:shadow-lg hover:border-border transition-all group">
      {/* Avatar + Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full bg-background-subtle border-2 border-border"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-text-primary mb-1 truncate">
            {name}
          </h3>
          <p className="text-sm font-semibold text-text-secondary mb-0.5">
            {role}
          </p>
          <p className="text-xs text-text-tertiary">{college}</p>
        </div>
      </div>

      {/* Company Badge */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background-subtle rounded-full border border-border">
          <span className="text-xs font-bold text-text-primary">{company}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-bold text-text-primary">{rating}</span>
          <span className="text-xs text-text-tertiary ml-0.5">rating</span>
        </div>
        <div className="text-xs text-text-tertiary">
          <span className="font-semibold text-text-secondary">{sessions}</span> sessions
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2">
        {expertise.map((skill, index) => (
          <span
            key={index}
            className="text-xs font-medium text-text-secondary bg-background-subtle px-2.5 py-1 rounded-full border border-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
