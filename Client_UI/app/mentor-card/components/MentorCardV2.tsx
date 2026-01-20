"use client";

import { memo } from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/atoms";
import { Mentor, MentorCardVariant } from "../types";
import {
  Star,
  Clock,
  Users,
  ArrowRight,
  RotateCcw,
  Award,
  Calendar,
} from "lucide-react";

interface MentorCardV2Props {
  mentor: Mentor;
  variant?: MentorCardVariant;
}

function MentorCardV2Component({ mentor, variant = "browse" }: MentorCardV2Props) {
  const renderFeatured = () => (
    <div className="group relative bg-white rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:border-secondary/40 hover:shadow-lg flex flex-col h-[340px] w-full">
      {/* Gradient Header */}
      <div className="h-16 bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/5 relative">
        {mentor.isTopMentor && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" size="sm">
              <Award className="w-3 h-3 mr-1" />
              Top Mentor
            </Badge>
          </div>
        )}
      </div>

      {/* Avatar - Overlapping header */}
      <div className="flex flex-col items-center -mt-10 px-5">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-20 h-20 rounded-full bg-background-subtle border-4 border-white shadow-sm object-cover"
        />

        {/* Rating beside avatar */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-bold text-text-primary">{mentor.rating}</span>
        </div>
      </div>

      {/* Name & Info - Centered */}
      <div className="text-center px-5 mt-2">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-secondary transition-colors truncate">
          {mentor.name}
        </h3>
        <p className="text-body-sm text-text-secondary mt-0.5">
          {mentor.role} @ {mentor.company}
        </p>
        <p className="text-body-xs text-text-tertiary">{mentor.college}</p>
      </div>

      {/* Expertise - Horizontal strip */}
      <div className="flex justify-center gap-2 px-5 mt-3">
        {mentor.expertise.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-background-subtle rounded-full text-body-xs text-text-tertiary"
          >
            {skill}
          </span>
        ))}
        {mentor.expertise.length > 3 && (
          <span className="px-2 py-0.5 bg-secondary/10 rounded-full text-body-xs text-secondary">
            +{mentor.expertise.length - 3}
          </span>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Stats */}
      <div className="flex justify-center items-center gap-4 text-body-sm text-text-secondary px-5 mb-3">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-text-tertiary" />
          <span>{mentor.totalSessions} sessions</span>
        </div>
        <span className="text-text-tertiary">•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-text-tertiary" />
          <span>{mentor.sessionDuration} min</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link href={`/mentor/${mentor.id}/book`}>
          <Button variant="primary" size="md" className="w-full group/btn">
            Book for ₹{mentor.price}
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="group relative bg-white rounded-xl border border-border p-4 transition-all duration-200 hover:border-secondary/40 hover:shadow-md flex flex-col w-full">
      {/* Header - Left aligned, scannable */}
      <div className="flex items-start gap-3">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-xl bg-background-subtle border border-border object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-text-primary group-hover:text-secondary transition-colors truncate">
              {mentor.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="text-sm font-semibold text-text-primary">{mentor.rating}</span>
            </div>
          </div>
          <p className="text-sm text-text-secondary mt-0.5 truncate">
            {mentor.role} @ {mentor.company}
          </p>
          <p className="text-xs text-text-tertiary truncate">{mentor.college}</p>
        </div>
      </div>

      {/* About/Description */}
      {mentor.about && (
        <p className="text-sm text-text-secondary mt-3 line-clamp-2 leading-relaxed">
          {mentor.about}
        </p>
      )}

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {mentor.expertise.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-background-subtle rounded text-xs text-text-tertiary"
          >
            {skill}
          </span>
        ))}
        {mentor.expertise.length > 3 && (
          <span className="px-2 py-0.5 bg-secondary/10 rounded text-xs text-secondary">
            +{mentor.expertise.length - 3}
          </span>
        )}
      </div>

      {/* Stats + CTA Row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {mentor.sessionDuration} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {mentor.totalSessions} sessions
          </span>
        </div>
        <Link href={`/mentor/${mentor.id}`}>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary-dark transition-colors group/link">
            View Profile
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );

  const renderPast = () => (
    <div className="group relative bg-white rounded-2xl border border-border p-5 transition-all duration-200 hover:border-secondary/40 hover:shadow-md flex flex-col h-[340px] w-full">
      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-14 h-14 rounded-full bg-background-subtle border-2 border-border object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-text-primary group-hover:text-secondary transition-colors truncate">
              {mentor.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-bold text-text-primary">{mentor.rating}</span>
            </div>
          </div>
          <p className="text-body-sm text-text-secondary mt-0.5 truncate">
            {mentor.role} @ {mentor.company}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border my-2" />

      {/* Session History Context */}
      <div className="space-y-2 mb-3">
        {mentor.lastSessionDate && (
          <div className="flex items-center gap-2 text-body-sm text-text-secondary">
            <Calendar className="w-4 h-4 text-text-tertiary" />
            <span>Last session: {mentor.lastSessionDate}</span>
          </div>
        )}
        {mentor.userSessionCount && (
          <div className="flex items-center gap-2 text-body-sm text-text-secondary">
            <Users className="w-4 h-4 text-text-tertiary" />
            <span>Your sessions: {mentor.userSessionCount}</span>
          </div>
        )}
        {mentor.userRating && (
          <div className="flex items-center gap-2 text-body-sm text-text-secondary">
            <span className="text-text-tertiary">Your rating:</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < mentor.userRating!
                      ? "fill-secondary text-secondary"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expertise - Minimal */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {mentor.expertise.slice(0, 2).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-background-subtle rounded-full text-body-xs text-text-tertiary"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Dual CTA */}
      <div className="flex gap-3">
        <Link href={`/mentor/${mentor.id}/book`} className="flex-1">
          <Button variant="primary" size="md" className="w-full group/btn">
            <RotateCcw className="w-4 h-4 mr-1" />
            Book Again
          </Button>
        </Link>
        <Link href={`/mentor/${mentor.id}/feedback`}>
          <Button variant="outline" size="md" className="px-4">
            Feedback
          </Button>
        </Link>
      </div>
    </div>
  );

  switch (variant) {
    case "featured":
      return renderFeatured();
    case "past":
      return renderPast();
    case "browse":
    default:
      return renderBrowse();
  }
}

// Memoize to prevent unnecessary re-renders
export const MentorCardV2 = memo(MentorCardV2Component);
