import React, { memo } from "react";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Button, Badge } from "@/components/atoms";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { cn, getMockRating, getMockSessionCount } from "@/lib/utils";

interface Mentor {
  _id: string;
  name: string;
  profile_pic?: string;
  currentCompany?: string;
  role?: string;
  college?: string;
  location?: string;
  branch?: string;
  grad_year?: number;
  tagline?: string;
  linkedin_url?: string;
  insta_url?: string;
}

interface ProfileCardProps {
  mentor: Mentor;
}

function ProfileCard({ mentor }: ProfileCardProps) {
  const optimizedProfilePic = mentor.profile_pic
    ? mentor.profile_pic.replace(
        "/upload/",
        "/upload/c_fill,w_400,h_400,q_auto,f_auto/"
      )
    : "/user-placeholder.png";

  // Mock data for Phase 1
  const rating = getMockRating(mentor._id);
  const sessionCount = getMockSessionCount(mentor._id);

  return (
    <div className="w-full bg-background border-border rounded-xl border hover:shadow-lg transition-shadow duration-200">
      {/* Main Content */}
      <div className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage
                className="object-cover w-full h-full"
                src={optimizedProfilePic}
                alt={`${mentor.name}'s avatar`}
                loading="lazy"
              />
              <AvatarFallback className="bg-background-subtle text-text-secondary font-semibold">
                {mentor.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Line 1: Name + Rating */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary truncate">
                {mentor.name}
              </h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-text-secondary">
                <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                <span className="font-medium">{rating}</span>
                <span className="text-text-tertiary">•</span>
                <span>{sessionCount} sessions</span>
              </div>
            </div>

            {/* Line 2: Company + Role (Most Important) */}
            {mentor.currentCompany && mentor.role && (
              <div className="flex items-start gap-2">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-semibold text-text-primary truncate">
                    {mentor.role}
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary truncate">
                    {mentor.currentCompany}
                  </p>
                </div>
              </div>
            )}

            {/* Line 3: College + Grad Year */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">
                {mentor.college}
                {mentor.grad_year && ` • ${mentor.grad_year}`}
              </span>
            </div>

            {/* Line 4: Tagline */}
            {mentor.tagline && (
              <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                {mentor.tagline}
              </p>
            )}

            {/* Line 5: Branch Badge (optional) */}
            {mentor.branch && (
              <div>
                <Badge variant="default" size="sm">
                  {mentor.branch}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {mentor.linkedin_url && (
            <Link
              href={mentor.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="LinkedIn profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          )}
          {mentor.insta_url && (
            <Link
              href={mentor.insta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-secondary transition-colors"
              aria-label="Instagram profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          )}
        </div>

        <Button asChild variant="primary" size="sm" rounded="default">
          <Link href={`/mentor/${mentor._id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
