"use client";
import { useEffect, useState } from "react";
import MentorProfile from "../../../components/ui/mentor/profile";
import { usePathname } from "next/navigation";
import { apiClient, API_ROUTES, Mentor } from "@/lib/api";

const MentorDetails = () => {
  const id = usePathname().split("/").pop();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      apiClient
        .get(API_ROUTES.mentor.detail(id))
        .then((response) => {
          setMentor(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center ">
          <div className="text-2xl flex text-center items-center justify-center font-semibold">
            Loading profile...
          </div>
        </div>
      ) : mentor ? (
        <MentorProfile mentor={mentor} />
      ) : (
        <p>No mentor found.</p>
      )}
    </div>
  );
};

export default MentorDetails;
