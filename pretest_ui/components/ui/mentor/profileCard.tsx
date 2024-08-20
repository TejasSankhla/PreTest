import React from "react";
import Image from "next/image";
import userPlaceholder from "../../../public/user-placeholder.png";
import {
  TwitterIcon,
  LocationIcon,
  LinkedinIcon,
} from "@/components/constants/icons";
import ToggleLikeButton from "@/components/constants/toggleLikeButton";
import { Button } from "../button";
function ProfileCard() {
  return (
    <div className=" w-full p-2 box-border border-gray-200 rounded-lg border-2 flex-row ">
      <div className="mentor-info flex p-4">
        <div className="mentor-pic flex-shrink-0 ">
          <Image
            src={userPlaceholder}
            className=" h-20 w-20 sm:h-32 sm:w-32 md:h-48 md:w-48 "
            alt="user"
          />
        </div>
        <div className="mentor-details ml-4 w-full relative flex flex-col  md:mt-4 sm:gap-y-1  ">
          <div className="mentor-name flex text-lg sm:text-4xl">
            Tejas Sankhla
          </div>
          <div className="mentor-college flex text-gray-400 items-center gap-x-2  text-xs sm:text-base">
            <LocationIcon props="h-4 w-4 sm:h-5  sm:w-5 " />
            Jodhpur, Rajasthan
          </div>
          <div className="mentor-bio flex ml-1 font-serif  text-gray-700 text-sm sm:text-lg">
            IIIT Lucknow
          </div>
          <div className="mentor-bio ml-1 w-full text-gray-700 text-xs sm:text-sm    ">
            Coordinator @AfterDark | Ex-Backend-Intern @SkillMate | Ex-Research
            Intern @IIIT'L
          </div>
        </div>
      </div>
      <hr />
      <div className="mentor-actions items-center px-4  py-2 flex gap-x-4">
        <TwitterIcon />
        <LinkedinIcon />
        <ToggleLikeButton />
        <Button className="bg-blue-500 hover:bg-blue-300 text-white ml-auto ">
          View Profile
        </Button>
      </div>
    </div>
  );
}

export default ProfileCard;
