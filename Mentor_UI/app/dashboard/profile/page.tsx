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
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Dashboard() {
  const router = useRouter();
  const [mentor, setMentor] = useState({
    profile_pic: "",
    id: "",
    name: "",
    username: "",
    email: "",
    college: "",
    branch: "",
    grad_year: "",
    linkedin_url: "",
    insta_url: "",
    about: "",
  });
  async function handleImageUpload(event) {
    const file = event.target.files[0];

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pretest-cloudinary"); // Set your Cloudinary upload preset here
    formData.append("cloud_name", String(cloudName));
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const data = response.data;

      const imageUrl = data.secure_url;

      // Update mentor's profile picture URL
      setMentor((prev) => ({ ...prev, profile_pic: imageUrl }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Invalid image size");
        } else {
          toast.error("Image upload failed");
        }
      } else toast.error("Image upload failed");
    }
  }

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
          profile_pic: mentor.profile_pic,
          id: mentor._id,
          name: mentor.name,
          username: mentor.username,
          email: mentor.email,
          college: mentor.college,
          branch: mentor.branch,
          grad_year: mentor.grad_year,
          linkedin_url: mentor.linkedin_url,
          insta_url: mentor.insta_url,
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
        toast.success("Changes saved");
        setMentor({ ...updatedMentor, id: updatedMentor._id });
      } else {
        console.error("Failed to update mentor:", response.statusText);
        toast.error("Failed to save changes");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);

          if (error.response.status === 400) {
            toast.error("Bad Request: Please check the data you have entered.");
          } else if (error.response.status === 404) {
            toast.error("Mentor not found: Please check the mentor ID.");
          } else if (error.response.status === 500) {
            toast.error("Server error: Please try again later.");
          } else {
            toast.error("Failed to save changes");
          }
        } else if (error.request) {
          console.error("Error request:", error.request);
          toast.error("No response from server");
        } else {
          console.error("Error message:", error.message);
          toast.error("An unexpected error occurred: ");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred: ");
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
              <div className="col-span-full">
                <div className="mt-2 flex items-center gap-x-3">
                  <Avatar className="h-36 w-36 object-fit">
                    <AvatarImage
                      className="object-cover w-full h-full"
                      src={mentor.profile_pic}
                      alt="User avatar"
                    />
                    <AvatarFallback />
                  </Avatar>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => document.getElementById("photo").click()}
                  >
                    Change
                  </button>
                </div>
              </div>
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
                  value={mentor.linkedin_url}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      linkedin_url: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={mentor.insta_url}
                  onChange={(e) =>
                    setMentor((prev) => ({
                      ...prev,
                      insta_url: e.target.value,
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
      <ToastContainer />
    </main>
  );
}
