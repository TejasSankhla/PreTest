"use client";
import { useEffect, useState } from "react";
import MentorProfile from "../../../components/ui/mentor/profile";
import { usePathname } from "next/navigation";
import { apiClient, API_ROUTES, Mentor } from "@/lib/api";
import { Spinner, Container } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";

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
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <Spinner size="lg" variant="primary" />
        <p className="text-body-lg text-text-secondary">Loading profile...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <Container size="lg" className="py-16">
        <EmptyState
          icon="user"
          title="Mentor not found"
          description="We couldn't find the mentor you're looking for. They may have been removed or the link is incorrect."
          action={{
            label: "Browse Mentors",
            href: "/explore-mentors",
          }}
        />
      </Container>
    );
  }

  return <MentorProfile mentor={mentor} />;
};

export default MentorDetails;
