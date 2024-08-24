"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import profile_banner from "../../public/profile-banner.png";
import Image from "next/image";
import avatar from "../../public/user-placeholder.png";
import { useAuth } from "@/context/AuthContext";
export default function Component() {
  const { user } = useAuth();
  return (
    <div className="w-full flex-col  items-center justify-center   ">
      <section className="profile-header">
        <div className="relative h-[250px] sm:h-[300px] ">
          <Image
            src={profile_banner}
            width={800}
            height={200}
            alt="Banner"
            className="sm:h-3/4  w-full object-cover"
            style={{ aspectRatio: "1200/400", objectFit: "cover" }}
          />
          <div className="absolute left-4 sm:left-32 top-[%] -translate-y-1/2 w-[150px] z-20">
            <Avatar className=" h-36 w-36 sm:h-48 sm:w-48 border-8 border-background border-orange-400">
              <AvatarImage src="/user-placeholder.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
      <section className="md:my-20  ">
        <div className="w-[80%] mx-auto border-2  bg-white shadow-lg rounded-lg p-6">
          <h2 className=" text-xl md:text-2xl font-bold mb-4">{user?.name}</h2>
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">Email</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl  font-semibold">Phone Number</h3>
            <p className="text-gray-600">{user?.mobile_number}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
