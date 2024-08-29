"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Backend_Base_URL } from "@/context/constants";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const [mentor, setMentor] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    college: "",
    branch: "",
    grad_year: "",
    linkedin: "",
    instagram: "",
    about: "",
  });

  useEffect(() => {
    const mentorId = JSON.parse(localStorage.getItem("mentor"))?.id;
    if (!mentorId) {
      alert("please Login again");
      router.push("/");
    }

    async function fetchMentorDetails() {
      try {
        const response = await fetch(
          `${Backend_Base_URL}/api/mentor/${mentorId}`
        );
        const data = await response.json();

        const mentor = data.data;

        setMentor({
          id: mentor._id,
          name: mentor.name,
          username: mentor.username,
          email: mentor.email,
          college: mentor.college,
          branch: mentor.branch,
          grad_year: mentor.grad_year,
          linkedin: mentor.linkedin_url,
          instagram: mentor.insta_url,
          about: mentor.about,
        });
      } catch (error) {
        console.error("Failed to fetch mentor data", error);
      }
    }

    if (mentorId) {
      fetchMentorDetails();
    }
  }, []);

  async function handleSaveChanges() {
    const mentorId = mentor.id;
    if (!mentorId || mentorId === "") {
      alert("Please login again");
      return;
    }

    try {
      const response = await axios.patch(
        `${Backend_Base_URL}/api/mentor/update/${mentorId}`,
        mentor,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedMentor = response.data.data;
        alert("Changes saved successfully");
        setMentor({ ...updatedMentor, id: updatedMentor._id });
      } else {
        console.error("Failed to update mentor:", response.statusText);
        alert("Failed to save changes");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);

          if (error.response.status === 400) {
            alert("Bad Request: Please check the data you have entered.");
          } else if (error.response.status === 404) {
            alert("Mentor not found: Please check the mentor ID.");
          } else if (error.response.status === 500) {
            alert("Server error: Please try again later.");
          } else {
            alert(`Failed to save changes: ${error.response.statusText}`);
          }
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert(
            "No response from server: Please check your network connection."
          );
        } else {
          console.error("Error message:", error.message);
          alert("An unexpected error occurred: " + error.message);
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <main className="flex-1 w-full sm:w-4/5 mx-auto">
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
                  value={mentor.grad_year}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      grad_year: e.target.value,
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
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={mentor.about}
                    onChange={(e) =>
                      setMentor((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
