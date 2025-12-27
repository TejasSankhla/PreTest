"use client";
import React, { useState } from "react";
import { ArrowRight, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { Button, Input, Spinner } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import {
  validateEmail,
  validatePasswordLogin,
  isValidEmail,
} from "@/lib/validation";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  ErrorMessage: string;
  setErrorMessage: (message: string) => void;
  onEmailFocus: () => void;
  onFieldBlur: () => void;
  onEmailChange?: (email: string) => void;
  isLoading: boolean;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

/**
 * LoginForm Component
 *
 * Handles user login with email/password authentication.
 * Includes field validation, error handling, and loading states.
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  ErrorMessage,
  setErrorMessage,
  onEmailFocus,
  onFieldBlur,
  onEmailChange,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Check if form is valid
  const isFormValid = isValidEmail(email) && password.length > 0 && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrorMessage("");
    setFieldErrors({});

    // Validate all fields using shared validation
    const emailError = validateEmail(email);
    const passwordError = validatePasswordLogin(password);

    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    await onSubmit(email.trim(), password);
  };

  // Clear field error on input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    onEmailChange?.(value);
    if (fieldErrors.email || ErrorMessage) {
      setFieldErrors((prev) => ({ ...prev, email: "" }));
      setErrorMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (fieldErrors.password || ErrorMessage) {
      setFieldErrors((prev) => ({ ...prev, password: "" }));
      setErrorMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-4">
        {/* Email Field */}
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onFocus={onEmailFocus}
          onBlur={onFieldBlur}
          error={fieldErrors.email}
          disabled={isLoading}
          autoComplete="off"
          inputSize="md"
        />

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="text-body-sm font-medium text-text-primary"
            >
              Password
            </label>
            <Link
              href={ROUTES.auth.forgotPassword}
              className="text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={onEmailFocus}
            onBlur={onFieldBlur}
            error={fieldErrors.password}
            disabled={isLoading}
            autoComplete="off"
            showPasswordToggle
            inputSize="md"
          />
        </div>

        {/* Form-level Error Message */}
        {ErrorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-error/10 border border-error/20 rounded-md p-3 flex items-start gap-2"
          >
            <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-error font-medium">{ErrorMessage}</p>
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
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
