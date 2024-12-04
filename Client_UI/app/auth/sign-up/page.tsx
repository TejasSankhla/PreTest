"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import pretestLogo from "../../icon.png";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { toast } from "react-toastify";
function LogIn() {
  const { signUp, ErrorMessage, setErrorMessage } = useAuth();
  const [userMessage, setuserMessage] = useState("");
  const [name, setname] = useState("Tejas Sankhla");
  const [email, setEmail] = useState("tejashsankhla@gmail.com");
  const [password, setPassword] = useState("123456");
  const [mobile_number, setmobile_number] = useState("7976676481");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ name, email, password, mobile_number });
      toast.success("Sign-up successful");
    } catch (error) {
      if (error) console.error("Login failed:", error);
      setuserMessage(String(ErrorMessage));
    }
  };

  return (
    <main className="flex-1 ">
      <section className=" flex-1 items-center justify-center">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <Image
                src={pretestLogo}
                alt="pretest logo"
                className="h-20 w-20"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      id="name"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                {ErrorMessage ? (
                  <div className="error-message text-center text-lg font-medium text-red-600">
                    {ErrorMessage}
                  </div>
                ) : (
                  <div className="success-message text-center text-lg font-medium text-green-500">
                    {userMessage}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LogIn;
