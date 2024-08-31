import React, { memo } from "react";
import userPlaceholder from "../../../public/user-placeholder.png";
import {
  LocationIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/constants/icons";
import ToggleLikeButton from "@/components/constants/toggleLikeButton";
import { Button } from "../button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import Link from "next/link";

function ProfileCard({ mentor }) {
  const optimizedProfilePic = mentor.profile_pic
    ? mentor.profile_pic.replace(
        "/upload/",
        "/upload/c_fill,w_400,h_400,q_auto,f_auto/"
      )
    : userPlaceholder;

  // Truncate the "about" text to 25 words
  const truncatedAbout = mentor?.about
    ? mentor.about.split(" ").slice(0, 25).join(" ") +
      (mentor.about.split(" ").length > 25 ? "..." : "")
    : "";

  return (
    <div className="w-full p-2 box-border border-gray-200 rounded-lg border-2 flex-row">
      <div className="mentor-info flex p-4">
        <div className="mentor-pic flex-shrink-0">
          <Avatar className="h-20 w-20 sm:h-32 sm:w-32 md:h-44 md:w-44">
            <AvatarImage
              className="object-cover w-full h-full"
              src={optimizedProfilePic}
              alt="User avatar"
              loading="lazy"
            />
            <AvatarFallback className="object-cover w-full h-full" />
          </Avatar>
        </div>
        <div className="mentor-details ml-4 w-full relative flex flex-col md:mt-4 sm:gap-y-1">
          <div className="mentor-name flex text-lg sm:text-2xl">
            {mentor.name}
          </div>
          <div className="mentor-college flex text-gray-400 items-center gap-x-2 text-xs sm:text-base">
            <LocationIcon props="h-4 w-4 sm:h-5 sm:w-5" />
            {mentor.location}
          </div>
          <div className="mentor-bio flex ml-1 font-serif text-gray-700 text-sm sm:text-lg">
            {mentor.college}
          </div>
          <div className="mentor-about ml-1 w-full text-gray-700 text-xs sm:text-sm">
            {truncatedAbout}
          </div>
        </div>
      </div>
      <hr />
      <div className="mentor-actions items-center px-4 py-2 flex gap-x-4">
        {mentor.linkedin_url && (
          <Link href={mentor.linkedin_url || "#"}>
            <LinkedinIcon />
          </Link>
        )}
        {mentor.insta_url && (
          <Link href={mentor.insta_url || "#"}>
            <InstagramIcon />
          </Link>
        )}
        <ToggleLikeButton />
        <Link href={`/mentor/${mentor._id}`} className="ml-auto">
          <Button className="bg-blue-500 hover:bg-blue-300 text-white">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
