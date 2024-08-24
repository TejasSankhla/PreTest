"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [mentor, setMentor] = useState({
    name: "",
    username: "",
    email: "",
    college: "",
    branch: "",
    graduationYear: "",
    linkedin: "",
    instagram: "",
  });

  useEffect(() => {
    const mentorId = JSON.parse(localStorage.getItem("mentor"))?.id;
    if (!mentorId) {
      alert("please Login again");
    }
    async function fetchMentorDetails() {
      try {
        const response = await fetch(
          `http://localhost:5500/api/mentor/${mentorId}`
        );
        const data = await response.json();

        const mentor = data.data;
        console.log(mentor);

        setMentor({
          name: mentor.name,
          username: mentor.username,
          email: mentor.email,
          college: mentor.college,
          branch: mentor.branch,
          graduationYear: mentor.grad_year,
          linkedin: mentor.linkedin_url,
          instagram: mentor.insta_url,
        });
      } catch (error) {
        console.error("Failed to fetch mentor data", error);
      }
    }

    if (mentorId) {
      fetchMentorDetails();
    }
  }, []);

  return (
    <main className="flex-1  w-full sm:w-4/5 mx-auto">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              {/* Form fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={mentor.name}
                    onChange={(e) =>
                      setMentor((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={mentor.username}
                    onChange={(e) =>
                      setMentor((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={mentor.email}
                  onChange={(e) =>
                    setMentor((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  value={mentor.college}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      college: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={mentor.branch}
                  onChange={(e) =>
                    setMentor((prev) => ({ ...prev, branch: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduation-year">Graduation Year</Label>
                <Input
                  id="graduation-year"
                  value={mentor.graduationYear}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      graduationYear: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={mentor.linkedin}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      linkedin: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={mentor.instagram}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
