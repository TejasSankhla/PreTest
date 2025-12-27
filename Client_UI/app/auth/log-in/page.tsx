"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { LoginForm } from "./components/LoginForm";

function LogIn() {
  const { user, login, ErrorMessage, setErrorMessage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect authenticated users to explore mentors
  useEffect(() => {
    if (user) {
      router.push(ROUTES.exploreMentors);
    }
  }, [user, router]);

  // Handle login form submission
  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      // Error is already handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <main className="flex-1 min-h-screen bg-background relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
          }}
        />
        {/* Blur Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-30" />

        {/* Back to Home - Top Left */}
        <Link
          href={ROUTES.home}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors group"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-body-sm font-medium group-hover:underline">Back to home</span>
        </Link>

        <div className="grid lg:grid-cols-2 min-h-screen relative">
          {/* Left Side - Form */}
          <section className="flex items-center justify-center px-6 py-16 lg:px-12 lg:py-16 relative">

            <div className="w-full max-w-md relative z-10">
              {/* Card Wrapper */}
              <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border border-secondary/10 shadow-sm p-5 sm:p-6 lg:p-8">
                {/* Badge */}
                <Badge variant="secondary" size="sm" className="mb-6 gap-2 uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="hidden sm:inline">Secure Platform</span>
                  <span className="sm:hidden">Secure</span>
                </Badge>

                {/* Headline */}
                <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
                  Welcome back
                </h1>
                <p className="text-body-md text-text-secondary mb-4">
                  Continue your interview preparation journey
                </p>

                <p className="text-body-sm text-text-secondary mb-6">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={ROUTES.auth.signUp}
                    className="font-semibold text-text-primary transition-all duration-200 hover:underline"
                  >
                    Create a free account
                  </Link>
                </p>

                <LoginForm
                  onSubmit={handleLoginSubmit}
                  ErrorMessage={ErrorMessage}
                  setErrorMessage={setErrorMessage}
                  onEmailFocus={() => {}}
                  onFieldBlur={() => {}}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </section>

          {/* Right Side - Mentor Discovery */}
          <aside className="hidden lg:block relative">
            <div className="relative w-full h-full min-h-screen bg-background flex flex-col overflow-hidden">
              {/* Background - Matching Landing Page */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundSize: "40px 40px",
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                    `,
                  }}
                />
                {/* Orange Gradient Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] opacity-60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 blur-[80px] rounded-[100%] opacity-40" />
              </div>

              {/* Main content area */}
              <div className="flex-1 flex items-center justify-center px-8 py-16 relative z-10">
                <div className="w-full max-w-sm">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Meet Your Mentors
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      12 mentors ready to help you succeed
                    </p>
                  </div>

                  {/* Mentor Cards */}
                  <div className="space-y-3">
                    {/* Mentor 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: -4 }}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
                          alt=""
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-text-primary text-body-sm">Rahul Kumar</p>
                          <p className="text-body-xs text-text-secondary">SDE-2 @ Google</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-body-xs text-secondary font-medium mb-0.5">
                            <CheckCircle className="w-3 h-3" />
                            4.9
                          </div>
                          <p className="text-label-sm text-text-tertiary">85 sessions</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mentor 2 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: -4 }}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
                          alt=""
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-text-primary text-body-sm">Priya Singh</p>
                          <p className="text-body-xs text-text-secondary">SDE-3 @ Amazon</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-body-xs text-secondary font-medium mb-0.5">
                            <CheckCircle className="w-3 h-3" />
                            4.8
                          </div>
                          <p className="text-label-sm text-text-tertiary">120 sessions</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mentor 3 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: -4 }}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
                          alt=""
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-text-primary text-body-sm">Arjun Patel</p>
                          <p className="text-body-xs text-text-secondary">SDE @ Microsoft</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-body-xs text-secondary font-medium mb-0.5">
                            <CheckCircle className="w-3 h-3" />
                            4.9
                          </div>
                          <p className="text-label-sm text-text-tertiary">62 sessions</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mentor 4 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: -4 }}
                      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
                          alt=""
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-text-primary text-body-sm">Sneha Reddy</p>
                          <p className="text-body-xs text-text-secondary">SDE-2 @ Flipkart</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-body-xs text-secondary font-medium mb-0.5">
                            <CheckCircle className="w-3 h-3" />
                            5.0
                          </div>
                          <p className="text-label-sm text-text-tertiary">95 sessions</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* View All CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-body-xs text-text-tertiary">
                      +8 more mentors available after sign in
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Bottom tagline */}
              <motion.div
                className="relative z-10 pb-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-body-sm text-text-tertiary font-medium">
                  Practice makes perfect. PreTest makes it happen.
                </p>
              </motion.div>
            </div>
          </aside>
        </div>
      </main>
  );
}

export default LogIn;
