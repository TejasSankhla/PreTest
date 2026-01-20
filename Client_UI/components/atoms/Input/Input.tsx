"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full border bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-border focus:border-secondary",
        error: "border-error focus:border-error",
        success: "border-success focus:border-success",
      },
      inputSize: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-10 px-3 text-sm rounded-md",
        lg: "h-11 px-3 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string;
  /** Icon displayed on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Whether to show password toggle for password inputs */
  showPasswordToggle?: boolean;
  /** Container className for the wrapper div */
  containerClassName?: string;
  /** Label className */
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      variant,
      inputSize,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // Determine if we should show the password toggle
    const isPasswordType = type === "password";
    const shouldShowToggle = isPasswordType && showPasswordToggle;

    // Determine the actual input type
    const inputType = isPasswordType && showPassword ? "text" : type;

    // Determine variant based on error state
    const effectiveVariant = error ? "error" : variant;

    // Calculate padding based on icons
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon || shouldShowToggle;

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-body-sm font-medium text-text-primary mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {hasLeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={cn(
              inputVariants({ variant: effectiveVariant, inputSize }),
              hasLeftIcon && "pl-10",
              hasRightIcon && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {/* Right icon or password toggle */}
          {(hasRightIcon) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {shouldShowToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-tertiary hover:text-text-secondary transition-colors disabled:opacity-50"
                  disabled={disabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              ) : rightIcon ? (
                <div className="text-text-tertiary pointer-events-none">
                  {rightIcon}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text (only shown when no error) */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-xs text-text-tertiary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
