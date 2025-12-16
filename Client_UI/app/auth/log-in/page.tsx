"use client";
import React from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import pretestLogo from "../../icon.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
function LogIn() {
  const { login, ErrorMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };
  return (
    <main className="flex flex-1">
      <section className="flex-1 items-center justify-center ">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <Image
                src={pretestLogo}
                className="h-20 w-20"
                alt="pretest logo"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-text-primary">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.auth.signUp}
                className="font-semibold text-text-primary transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-text-primary"
                  >
                    Email
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
                      autoComplete="current-password"
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
                  <div role="alert" className="err-msg text-error text-center font-medium text-lg">
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
                    Sign in
                  </Button>
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
