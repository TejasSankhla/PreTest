"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ArrowRight, AlertCircle, X, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Badge, Input, Spinner } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import {
  validateName,
  validateEmail,
  validatePasswordSignup,
  isValidName,
  isValidEmail,
  isValidPassword,
} from "@/lib/validation";
import { checkPasswordStrength, getStrengthColorClasses } from "@/utils/passwordStrength";
import { LevelUpJourney } from "./components/LevelUpJourney";

function SignUp() {
  const { user, signUp, ErrorMessage, setErrorMessage } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to explore mentors
  useEffect(() => {
    if (user) {
      router.push(ROUTES.exploreMentors);
    }
  }, [user, router]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return null;
    return checkPasswordStrength(password);
  }, [password]);

  // Calculate current stage for the journey visualization
  const currentStage = useMemo(() => {
    if (showCelebration) return 4;
    if (isValidPassword(password)) return 3;
    if (email && isValidEmail(email)) return 2;
    if (isValidName(name)) return 1;
    return 0;
  }, [name, email, password, showCelebration]);

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return (
      isValidName(name) &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      !isLoading
    );
  }, [name, email, password, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrorMessage("");
    setFieldErrors({});

    // Validate all fields using shared validation
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePasswordSignup(password);

    if (nameError || emailError || passwordError) {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    try {
      setShowCelebration(true);
      await signUp({ name: name.trim(), email: email.trim(), password });
      toast.success("Welcome to PreTest!");
      // Auto-login handles redirect to explore mentors
    } catch (error) {
      setShowCelebration(false);
      // Error is already handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };

  // Clear field error on input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (fieldErrors.name) {
      setFieldErrors(prev => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: "" }));
    }
    if (ErrorMessage) setErrorMessage("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: "" }));
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid Pattern - Full page background matching landing page */}
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
      {/* Orange Gradient Blur - Top center */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] pointer-events-none opacity-50" />

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
            {/* Mobile Progress Indicator */}
            <div className="flex justify-center gap-2 mb-6 lg:hidden">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentStage >= 1 ? 'bg-secondary' : 'bg-gray-200'}`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentStage >= 2 ? 'bg-secondary' : 'bg-gray-200'}`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentStage >= 3 ? 'bg-secondary' : 'bg-gray-200'}`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${showCelebration ? 'bg-green-500' : 'bg-gray-200'}`}>
                {showCelebration && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
            </div>

            {/* Card Wrapper */}
            <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border border-secondary/10 shadow-sm p-5 sm:p-6 lg:p-8">
              {/* Badge */}
              <Badge variant="secondary" size="sm" className="mb-6 gap-2 uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="hidden sm:inline">500+ Active Students</span>
                <span className="sm:hidden">500+ Active</span>
              </Badge>

              {/* Headline */}
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
                Join PreTest
              </h1>
              <p className="text-body-md text-text-secondary mb-4">
                Practice with recently placed peer mentors
              </p>

              <p className="text-body-sm text-text-secondary mb-6">
                Already have an account?{" "}
                <Link
                  href={ROUTES.auth.logIn}
                  className="font-semibold text-text-primary transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="space-y-4">
                  {/* Name Field */}
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={handleNameChange}
                    error={fieldErrors.name}
                    disabled={isLoading}
                    autoComplete="name"
                    inputSize="md"
                  />

                  {/* Email Field */}
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    error={fieldErrors.email}
                    disabled={isLoading}
                    autoComplete="email"
                    inputSize="md"
                  />

                  {/* Password Field */}
                  <div>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a password (8+ chars)"
                      value={password}
                      onChange={handlePasswordChange}
                      error={fieldErrors.password}
                      disabled={isLoading}
                      autoComplete="new-password"
                      showPasswordToggle
                      inputSize="md"
                    />
                    {/* Password Strength Indicator */}
                    {password && passwordStrength && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          <div className={`h-1 flex-1 rounded transition-colors ${passwordStrength.score >= 1 ? getStrengthColorClasses(passwordStrength.strength).bg : 'bg-border'}`} />
                          <div className={`h-1 flex-1 rounded transition-colors ${passwordStrength.score >= 2 ? getStrengthColorClasses(passwordStrength.strength).bg : 'bg-border'}`} />
                          <div className={`h-1 flex-1 rounded transition-colors ${passwordStrength.score >= 3 ? getStrengthColorClasses(passwordStrength.strength).bg : 'bg-border'}`} />
                          <div className={`h-1 flex-1 rounded transition-colors ${passwordStrength.score >= 4 ? getStrengthColorClasses(passwordStrength.strength).bg : 'bg-border'}`} />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-body-xs font-medium capitalize ${getStrengthColorClasses(passwordStrength.strength).text}`}>
                            {passwordStrength.strength} password
                          </p>
                          {passwordStrength.feedback.length > 0 && (
                            <p className="text-body-xs text-text-tertiary">
                              {passwordStrength.feedback[0]}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {ErrorMessage && (
                    <div role="alert" aria-live="polite" className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-body-sm text-error font-medium">{ErrorMessage}</p>
                      </div>
                      <button
                        onClick={() => setErrorMessage("")}
                        className="text-error hover:text-error/80 transition-colors"
                        aria-label="Dismiss error"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      rounded="full"
                      className="w-full"
                      disabled={!isFormValid || isLoading}
                      rightIcon={isLoading ? null : <ArrowRight className="ml-2" size={16} />}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Spinner size="xs" variant="white" />
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Google Sign Up (Coming Soon) */}
              <div>
                <div className="relative group">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    rounded="full"
                    className="w-full opacity-50 cursor-not-allowed"
                    disabled
                    leftIcon={
                      <svg
                        className="h-5 w-5 text-rose-500"
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
                  <span className="text-body-xs text-text-tertiary text-center block mt-2">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Level Up Journey (Full Bleed) */}
        <aside className="hidden lg:block relative">
          <LevelUpJourney
            currentStage={currentStage}
            name={name}
            email={email}
            showCelebration={showCelebration}
          />
        </aside>
      </div>
    </main>
  );
}

export default SignUp;
