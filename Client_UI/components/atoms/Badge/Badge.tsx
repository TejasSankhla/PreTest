import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-background-subtle text-text-secondary border border-border",
        primary:
          "bg-primary-lightest text-primary border border-primary-lighter",
        secondary:
          "bg-secondary-lightest text-secondary border border-orange-200",
        success: "bg-success-light text-success border border-green-200",
        info: "bg-info-light text-info border border-blue-200",
        warning: "bg-warning-light text-warning border border-yellow-200",
        error: "bg-error-light text-error border border-red-200",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
