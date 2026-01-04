import React, { memo } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { getMockRating, getMockSessionCount } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { Mentor } from "@/lib/api";

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

  // Calculate years of experience from grad_year
  const currentYear = new Date().getFullYear();
  const yearsOfExp = mentor.grad_year
    ? Math.max(0, currentYear - mentor.grad_year)
    : null;

  return (
    <Link
      href={ROUTES.mentor.profile(mentor._id)}
      className="block w-full bg-white rounded-2xl border border-border hover:border-secondary/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer"
    >
      {/* Main Content */}
      <div className="p-4 sm:p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-xl ring-1 ring-border group-hover:ring-secondary/30 transition-all">
              <AvatarImage
                className="object-cover w-full h-full rounded-xl"
                src={optimizedProfilePic}
                alt={`${mentor.name}'s avatar`}
                loading="lazy"
              />
              <AvatarFallback className="bg-secondary-lightest text-secondary font-bold text-lg sm:text-xl rounded-xl">
                {mentor.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
            {/* Name - Primary */}
            <h3 className="text-base sm:text-lg font-semibold text-text-primary truncate group-hover:text-secondary transition-colors">
              {mentor.name}
            </h3>

            {/* Company + Role */}
            {mentor.currentCompany && (
              <p className="text-sm text-text-secondary truncate">
                {mentor.currentCompany}
                {mentor.role && (
                  <span className="text-text-tertiary"> · {mentor.role}</span>
                )}
              </p>
            )}

            {/* College */}
            {mentor.college && (
              <p className="text-sm text-text-tertiary truncate">
                {mentor.college}
              </p>
            )}

            {/* Trust Signals */}
            <div className="flex items-center gap-2 text-sm mt-0.5">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-text-primary">{rating}</span>
              </div>
              <span className="text-text-tertiary">·</span>
              <span className="text-text-secondary">{sessionCount} sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 sm:px-5 py-3 flex items-center justify-end border-t border-border/50">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:text-secondary-dark transition-colors">
          Book Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default memo(ProfileCard);
