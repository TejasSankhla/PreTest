import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse bg-white/60", {
  variants: {
    variant: {
      default: "bg-white/60",
      subtle: "bg-background-subtle",
      solid: "bg-border/50",
    },
    shape: {
      box: "rounded-md",
      circle: "rounded-full",
      text: "rounded-md h-4",
      pill: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    shape: "box",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, shape, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, shape }), className)}
      aria-hidden="true"
      {...props}
    />
  );
}

// Convenient preset components for common use cases

interface SkeletonTextProps extends Omit<SkeletonProps, "shape"> {
  lines?: number;
  lastLineWidth?: string;
}

function SkeletonText({
  lines = 3,
  lastLineWidth = "w-2/3",
  className,
  variant,
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          shape="text"
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? lastLineWidth : "w-full"
          )}
        />
      ))}
    </div>
  );
}

interface SkeletonAvatarProps extends Omit<SkeletonProps, "shape"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

function SkeletonAvatar({
  size = "md",
  className,
  variant,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant={variant}
      shape="circle"
      className={cn(avatarSizes[size], className)}
      {...props}
    />
  );
}

interface SkeletonButtonProps extends Omit<SkeletonProps, "shape"> {
  size?: "sm" | "md" | "lg";
  rounded?: "default" | "full";
}

const buttonSizes = {
  sm: "h-8 w-20",
  md: "h-10 w-24",
  lg: "h-11 w-28",
};

function SkeletonButton({
  size = "md",
  rounded = "default",
  className,
  variant,
  ...props
}: SkeletonButtonProps) {
  return (
    <Skeleton
      variant={variant}
      shape={rounded === "full" ? "pill" : "box"}
      className={cn(buttonSizes[size], className)}
      {...props}
    />
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  skeletonVariants,
};
