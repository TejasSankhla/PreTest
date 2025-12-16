"use client";
import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import pretestLogo from "../../icon.png";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms";
function SignUp() {
  const { signUp, ErrorMessage } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ name, email, password });
      toast.success("Sign-up successful");
    } catch {
      // Error is already handled by useAuth
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
            <h2 className="text-center text-2xl font-bold leading-tight text-text-primary">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-text-secondary">
              Already have an account?{" "}
              <a
                href="/auth/log-in"
                title=""
                className="font-medium text-text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-text-primary"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      autoComplete="name"
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-text-primary"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-text-primary"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 pr-10 text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    ></input>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {ErrorMessage && (
                  <div role="alert" className="error-message text-center text-lg font-medium text-error">
                    {ErrorMessage}
                  </div>
                )}
                <div>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full"
                    rightIcon={<ArrowRight className="ml-2" size={16} />}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                leftIcon={
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                }
              >
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
