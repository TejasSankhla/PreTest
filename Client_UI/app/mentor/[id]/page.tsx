"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import MentorProfile from "../../../components/ui/mentor/profile";
import { usePathname } from "next/navigation";
import { Backend_Base_URL } from "@/context/constants";
const MentorDetails = () => {
  const id = usePathname().split("/").pop();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Check if ID exists before making API call
      setLoading(true);
      axios
        .get(`${Backend_Base_URL}/api/mentor/${id}`)
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
