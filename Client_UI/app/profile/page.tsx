"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile_banner from "../../public/profile-banner.png";
import Image from "next/image";
import { Container, Spinner } from "@/components/atoms";
import { useAuthGuard } from "@/hooks";

export default function Component() {
  const { user, isLoading, isAuthenticated } = useAuthGuard();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Will redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full flex-col items-center justify-center">
      <section className="profile-header">
        <div className="relative h-[250px] sm:h-[300px]">
          <Image
            src={profile_banner}
            width={800}
            height={200}
            alt="Banner"
            className="sm:h-3/4 w-full object-cover"
            style={{ aspectRatio: "1200/400", objectFit: "cover" }}
          />
          <div className="absolute left-4 sm:left-32 top-[%] -translate-y-1/2 w-[150px] z-20">
            <Avatar className="h-36 w-36 sm:h-48 sm:w-48 border-8 border-background border-secondary">
              <AvatarImage src="/user-placeholder.png" alt="Profile" />
              <AvatarFallback className="bg-secondary-lightest text-secondary text-heading-lg">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
      <section className="md:my-20">
        <Container size="lg">
          <div className="bg-background border border-border shadow-sm rounded-xl p-6">
            <h2 className="text-heading-lg text-text-primary mb-4">{user?.name}</h2>
            <div className="mb-4">
              <h3 className="text-heading-sm text-text-primary">Email</h3>
              <p className="text-body-md text-text-secondary">{user?.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-heading-sm text-text-primary">Phone Number</h3>
              <p className="text-body-md text-text-secondary">{user?.mobile_number || "Not provided"}</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
