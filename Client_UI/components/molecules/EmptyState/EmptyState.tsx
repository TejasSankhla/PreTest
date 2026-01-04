import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/atoms";
import {
  Search,
  FileQuestion,
  Users,
  Calendar,
  Inbox,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

const emptyStateVariants = cva("text-center", {
  variants: {
    size: {
      sm: "py-8 px-4",
      md: "py-12 px-6",
      lg: "py-16 px-8",
    },
    variant: {
      default: "bg-background-subtle rounded-2xl border border-border",
      glass: "bg-white/50 backdrop-blur-sm rounded-2xl border border-border/30",
      minimal: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

// Preset icons for common empty states
const presetIcons: Record<string, LucideIcon> = {
  search: Search,
  notFound: FileQuestion,
  noUsers: Users,
  noBookings: Calendar,
  inbox: Inbox,
  error: AlertCircle,
};

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon to display - can be a preset name or custom icon */
  icon?: keyof typeof presetIcons | React.ReactNode;
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Primary action button */
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: ButtonProps["variant"];
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Custom icon container classes */
  iconContainerClassName?: string;
}

function EmptyState({
  className,
  size,
  variant,
  icon = "search",
  title,
  description,
  action,
  secondaryAction,
  iconContainerClassName,
  ...props
}: EmptyStateProps) {
  // Determine which icon to render
  const IconComponent =
    typeof icon === "string" ? presetIcons[icon] || Search : null;

  return (
    <div
      className={cn(emptyStateVariants({ size, variant }), className)}
      {...props}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-16 h-16 bg-secondary-lightest rounded-full flex items-center justify-center mx-auto mb-4",
          iconContainerClassName
        )}
      >
        {IconComponent ? (
          <IconComponent className="w-8 h-8 text-secondary" />
        ) : (
          icon
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-text-secondary mb-6 max-w-md mx-auto">{description}</p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {action && (
            <Button
              variant={action.variant || "primary"}
              onClick={action.onClick}
              asChild={!!action.href}
            >
              {action.href ? <a href={action.href}>{action.label}</a> : action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
            >
              {secondaryAction.href ? (
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              ) : (
                secondaryAction.label
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { EmptyState, emptyStateVariants, presetIcons };
