interface StageProgressPillProps {
  stages: string[];
  currentIndex: number;
}

export function StageProgressPill({
  stages,
  currentIndex,
}: StageProgressPillProps) {
  return (
    <div className="flex items-center gap-1 bg-background-subtle backdrop-blur-sm rounded-full px-3 py-2">
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center">
          <div
            className={`
              w-2 h-2 rounded-full transition-all
              ${index < currentIndex ? "bg-success" : ""}
              ${index === currentIndex ? "bg-primary w-6 rounded-full" : ""}
              ${index > currentIndex ? "bg-border" : ""}
            `}
            title={stage}
          />
          {index < stages.length - 1 && (
            <div className={`w-2 h-0.5 mx-0.5 ${
              index < currentIndex ? "bg-success" : "bg-border"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
