import { Theme } from "../../../utils";

interface StageProgressPillProps {
  stages: string[];
  currentIndex: number;
  theme: Theme;
}

export function StageProgressPill({
  stages,
  currentIndex,
  theme,
}: StageProgressPillProps) {
  const isLight = theme === "light";

  return (
    <div className={`flex items-center gap-1 ${isLight ? "bg-gray-100" : "bg-white/10"} backdrop-blur-sm rounded-full px-3 py-2`}>
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center">
          <div
            className={`
              w-2 h-2 rounded-full transition-all
              ${index < currentIndex ? "bg-green-500" : ""}
              ${index === currentIndex ? `${isLight ? "bg-blue-500" : "bg-white"} w-6 rounded-full` : ""}
              ${index > currentIndex ? `${isLight ? "bg-gray-300" : "bg-white/30"}` : ""}
            `}
            title={stage}
          />
          {index < stages.length - 1 && (
            <div className={`w-2 h-0.5 mx-0.5 ${
              index < currentIndex ? "bg-green-500" : isLight ? "bg-gray-300" : "bg-white/20"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
