"use client";
import { useState } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

function ToggleLikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center justify-center p-2 transition-colors duration-200 
        `}
    >
      {liked ? (
        <SolidHeartIcon className="h-6 w-6" />
      ) : (
        <OutlineHeartIcon className="h-6 w-6" />
      )}
    </button>
  );
}

export default ToggleLikeButton;
