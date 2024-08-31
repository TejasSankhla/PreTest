"use client";
import React, { useState } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
function SignUpPage() {
  const { signUp, ErrorMessage, setErrorMessage } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    location: "",
    branch: "",
    grad_year: "",
    about: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setSuccessMessage("");
      return;
    }

    try {
      await signUp(formData);
      setSuccessMessage("Sign-up successful!, Log in to continue");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        college: "",
        location: "",
        branch: "",
        grad_year: "",
        about: "",
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Sign-up failed");
      setSuccessMessage("");
    }
  };

  return (
    <form className="w-full sm:w-3/5 mx-auto my-8 px-4" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <div className="">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly, so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  aria-hidden="true"
                  className="h-12 w-12 text-gray-300"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="janesmith"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
            <div className="sm:col-span-3 col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="sm:col-span-3 col-span-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.password}
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3 col-span-full">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.confirmPassword}
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="college"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                College
              </label>
              <div className="mt-2">
                <select
                  id="college"
                  name="college"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="">Select your college</option>
                  <option value="IIT">IIT</option>
                  <option value="NIT">NIT</option>
                  <option value="IIIT">IIIT</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="branch"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Branch
              </label>
              <div className="mt-2">
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.branch}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="grad_year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Graduation Year
              </label>
              <div className="mt-2">
                <input
                  id="grad_year"
                  name="grad_year"
                  type="text"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.grad_year}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
            <div className="sm:col-span-2 col-span-full">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                location
              </label>
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.location}
                  onChange={handleChange}
                  required={true}
                />
              </div>
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
                  required={true}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>
        {ErrorMessage && (
          <p className="text-red-500 text-sm mt-2">{ErrorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpPage;
