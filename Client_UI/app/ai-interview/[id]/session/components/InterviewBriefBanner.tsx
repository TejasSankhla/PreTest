import { Check } from "lucide-react";
import { AIInterview } from "../../../types";

interface InterviewBriefBannerProps {
  interview: AIInterview;
  currentStageIndex: number;
}

export function InterviewBriefBanner({
  interview,
  currentStageIndex,
}: InterviewBriefBannerProps) {
  return (
    <div className="bg-background border border-border rounded-2xl mb-6 overflow-hidden">
      {/* Main content row */}
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* Left: Interview info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/25">
              <span className="text-white text-body-sm font-bold">AI</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-text-primary font-semibold text-body-md">
                  {interview.title}
                </h2>
                <span className={`px-2.5 py-1 rounded-md text-body-xs font-semibold uppercase tracking-wide flex-shrink-0 ${
                  interview.difficulty === "Easy"
                    ? "bg-success-light text-success"
                    : interview.difficulty === "Medium"
                    ? "bg-warning-light text-warning"
                    : "bg-error-light text-error"
                }`}>
                  {interview.difficulty}
                </span>
              </div>
              <p className="text-text-secondary text-body-sm mt-1">
                {interview.role} <span className="text-text-tertiary">•</span> {interview.duration} min interview
              </p>
            </div>
          </div>

          {/* Right: Focus areas (visible on larger screens) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {interview.focusAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 rounded-lg text-body-xs font-medium bg-background-subtle text-text-secondary border border-border"
              >
                {area}
              </span>
            ))}
            {interview.focusAreas.length > 3 && (
              <span className="text-text-tertiary text-body-xs font-medium">
                +{interview.focusAreas.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stage progress bar - Full width below */}
      <div className="px-5 py-3 sm:px-6 bg-background-subtle border-t border-border">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
          {interview.stages.map((stage, index) => (
            <div key={stage} className="flex items-center flex-shrink-0">
              {/* Stage pill */}
              <div
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl text-body-xs transition-all
                  ${index === currentStageIndex
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : index < currentStageIndex
                    ? "bg-success-light text-success"
                    : "bg-background text-text-tertiary border border-border"
                  }
                `}
              >
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold
                  ${index === currentStageIndex
                    ? "bg-white/20 text-white"
                    : index < currentStageIndex
                    ? "bg-success text-white"
                    : "bg-border text-text-tertiary"
                  }
                `}>
                  {index < currentStageIndex ? <Check className="w-3 h-3" /> : index + 1}
                </div>
                <span className={`hidden sm:inline font-medium ${
                  index === currentStageIndex ? "text-white" : ""
                }`}>
                  {stage}
                </span>
              </div>

              {/* Connector line */}
              {index < interview.stages.length - 1 && (
                <div className={`
                  w-4 sm:w-6 h-0.5 mx-1
                  ${index < currentStageIndex ? "bg-success/40" : "bg-border"}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
