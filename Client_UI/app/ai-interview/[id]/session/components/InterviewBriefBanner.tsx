import { Check } from "lucide-react";
import { AIInterview } from "../../../types";
import { Theme } from "../../../utils";

interface InterviewBriefBannerProps {
  interview: AIInterview;
  currentStageIndex: number;
  theme: Theme;
}

export function InterviewBriefBanner({
  interview,
  currentStageIndex,
  theme,
}: InterviewBriefBannerProps) {
  const isLight = theme === "light";

  return (
    <div className={`
      ${isLight
        ? "bg-gradient-to-r from-white to-gray-50/80 border-gray-200/80"
        : "bg-gradient-to-r from-[#242438] to-[#1e1e2e] border-white/5"}
      border rounded-2xl mb-6 overflow-hidden
    `}>
      {/* Main content row */}
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* Left: Interview info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              ${isLight
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
                : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20"}
            `}>
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className={`${isLight ? "text-gray-900" : "text-white"} font-semibold text-base`}>
                  {interview.title}
                </h2>
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide flex-shrink-0 ${
                  interview.difficulty === "Easy"
                    ? isLight ? "bg-emerald-100 text-emerald-700" : "bg-emerald-500/20 text-emerald-400"
                    : interview.difficulty === "Medium"
                    ? isLight ? "bg-amber-100 text-amber-700" : "bg-amber-500/20 text-amber-400"
                    : isLight ? "bg-rose-100 text-rose-700" : "bg-rose-500/20 text-rose-400"
                }`}>
                  {interview.difficulty}
                </span>
              </div>
              <p className={`${isLight ? "text-gray-500" : "text-white/50"} text-sm mt-1`}>
                {interview.role} <span className={isLight ? "text-gray-300" : "text-white/20"}>•</span> {interview.duration} min interview
              </p>
            </div>
          </div>

          {/* Right: Focus areas (visible on larger screens) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {interview.focusAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isLight
                    ? "bg-gray-100/80 text-gray-600 border border-gray-200/50"
                    : "bg-white/5 text-white/60 border border-white/5"
                }`}
              >
                {area}
              </span>
            ))}
            {interview.focusAreas.length > 3 && (
              <span className={`${isLight ? "text-gray-400" : "text-white/40"} text-xs font-medium`}>
                +{interview.focusAreas.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stage progress bar - Full width below */}
      <div className={`
        px-5 py-3 sm:px-6
        ${isLight ? "bg-gray-50/80 border-t border-gray-100" : "bg-white/[0.02] border-t border-white/5"}
      `}>
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
          {interview.stages.map((stage, index) => (
            <div key={stage} className="flex items-center flex-shrink-0">
              {/* Stage pill */}
              <div
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all
                  ${index === currentStageIndex
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                    : index < currentStageIndex
                    ? isLight
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-emerald-500/10 text-emerald-400"
                    : isLight
                      ? "bg-white text-gray-400 border border-gray-200"
                      : "bg-white/5 text-white/30 border border-white/5"
                  }
                `}
              >
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold
                  ${index === currentStageIndex
                    ? "bg-white/20 text-white"
                    : index < currentStageIndex
                    ? "bg-emerald-500 text-white"
                    : isLight ? "bg-gray-200 text-gray-500" : "bg-white/10 text-white/40"
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
                  ${index < currentStageIndex
                    ? isLight ? "bg-emerald-300" : "bg-emerald-500/40"
                    : isLight ? "bg-gray-200" : "bg-white/10"
                  }
                `} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
