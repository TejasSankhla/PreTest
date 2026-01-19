"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { AIInterview, Difficulty } from "../types";
import { Badge, Button } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import {
  Clock,
  Users,
  BarChart3,
  Sparkles,
  ArrowRight,
  Lock,
  RotateCcw,
  Trophy,
} from "lucide-react";

interface InterviewCardProps {
  interview: AIInterview;
}

const difficultyConfig: Record<Difficulty, { label: string; variant: "success" | "warning" | "error" }> = {
  [Difficulty.EASY]: {
    label: "Easy",
    variant: "success",
  },
  [Difficulty.MEDIUM]: {
    label: "Medium",
    variant: "warning",
  },
  [Difficulty.HARD]: {
    label: "Hard",
    variant: "error",
  },
};

function InterviewCardComponent({ interview }: InterviewCardProps) {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const isComingSoon = interview.status === "coming_soon";
  const difficulty = difficultyConfig[interview.difficulty];
  const hiddenTopics = interview.focusAreas.slice(3);

  // User state (only not_taken or completed)
  const isCompleted = interview.userState === "completed";

  // Determine CTA based on state
  const getCTA = () => {
    if (isComingSoon) {
      return {
        label: "Notify Me",
        icon: <Sparkles className="w-4 h-4 mr-2" />,
        variant: "outline" as const,
        disabled: true,
      };
    }
    if (isCompleted) {
      return {
        label: "Retake",
        icon: <RotateCcw className="w-4 h-4 mr-2" />,
        variant: "outline" as const,
        disabled: false,
      };
    }
    return {
      label: "Start Interview",
      icon: <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />,
      variant: "primary" as const,
      disabled: false,
      iconAfter: true,
    };
  };

  const cta = getCTA();

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border border-border p-5 sm:p-6
        transition-all duration-200 hover:border-secondary/40 hover:shadow-md
        flex flex-col h-[340px] w-full
        ${isComingSoon ? "opacity-75" : ""}
      `}
    >
      {/* Top Right Badge */}
      <div className="absolute top-4 right-4">
        {isComingSoon ? (
          <Badge variant="secondary" size="sm">
            <Lock className="w-3 h-3 mr-1" />
            Coming Soon
          </Badge>
        ) : (
          <Badge variant={difficulty.variant} size="sm">
            {difficulty.label}
          </Badge>
        )}
      </div>

      {/* Header */}
      <div className="mb-3 pr-16">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-secondary transition-colors line-clamp-1">
          {interview.title}
        </h3>
        <p className="text-body-sm text-text-secondary mt-1">{interview.role}</p>
      </div>

      {/* Description - 3 lines */}
      <p className="text-body-sm text-text-secondary mb-4 line-clamp-3 flex-shrink-0">
        {interview.description}
      </p>

      {/* Focus Areas with Hover Tooltip */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative flex-shrink-0">
        {interview.focusAreas.slice(0, 3).map((area) => (
          <span
            key={area}
            className="px-2 py-0.5 bg-background-subtle rounded-full text-body-xs text-text-tertiary"
          >
            {area}
          </span>
        ))}
        {hiddenTopics.length > 0 && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowAllTopics(true)}
              onMouseLeave={() => setShowAllTopics(false)}
              onFocus={() => setShowAllTopics(true)}
              onBlur={() => setShowAllTopics(false)}
              className="px-2 py-0.5 bg-secondary/10 rounded-full text-body-xs text-secondary hover:bg-secondary/20 focus:bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-colors cursor-pointer"
            >
              +{hiddenTopics.length} more
            </button>
            {showAllTopics && (
              <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg shadow-lg border border-border z-10 min-w-max">
                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                  {hiddenTopics.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 bg-background-subtle rounded-full text-body-xs text-text-tertiary whitespace-nowrap"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-body-sm text-text-secondary mb-4">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-text-tertiary" />
          <span>{interview.duration} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-text-tertiary" />
          <span>{interview.totalTaken.toLocaleString()}</span>
        </div>
        {isCompleted && interview.userScore !== undefined ? (
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-text-primary">{interview.userScore}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-text-tertiary" />
            <span>{interview.avgScore}%</span>
          </div>
        )}
      </div>

      {/* CTA */}
      {cta.disabled ? (
        <Button variant={cta.variant} size="md" className="w-full" disabled>
          {cta.icon}
          {cta.label}
        </Button>
      ) : (
        <Link href={ROUTES.aiInterview.brief(interview.id)}>
          <Button variant={cta.variant} size="md" className="w-full group/btn">
            {!("iconAfter" in cta) && cta.icon}
            {cta.label}
            {"iconAfter" in cta && cta.icon}
          </Button>
        </Link>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const InterviewCard = memo(InterviewCardComponent);
