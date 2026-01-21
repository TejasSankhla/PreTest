import { Mic, MicOff } from "lucide-react";
import { AIState } from "../../../utils";

interface AIStateIndicatorProps {
  aiState: AIState;
  isMuted: boolean;
}

export function AIStateIndicator({
  aiState,
  isMuted,
}: AIStateIndicatorProps) {
  const stateConfig = {
    idle: {
      message: "Alex is thinking...",
      subtext: "Preparing the next question",
      bgColor: "bg-info-light",
      textColor: "text-info",
      borderColor: "border-info/30",
    },
    speaking: {
      message: "Alex is speaking",
      subtext: "Listen carefully to the question",
      bgColor: "bg-info-light",
      textColor: "text-info",
      borderColor: "border-info/30",
    },
    listening: {
      message: isMuted ? "You are muted" : "Your turn to speak",
      subtext: isMuted ? "Unmute to respond" : "Alex is listening to your response",
      bgColor: isMuted ? "bg-error-light" : "bg-success-light",
      textColor: isMuted ? "text-error" : "text-success",
      borderColor: isMuted ? "border-error/30" : "border-success/30",
    },
  };

  const config = stateConfig[aiState];

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300`}>
      <div className="flex items-center gap-2">
        {aiState === "speaking" && (
          <div className="flex items-center gap-0.5">
            <div className="w-1 h-3 bg-info rounded-full animate-pulse" />
            <div className="w-1 h-4 bg-info rounded-full animate-pulse [animation-delay:0.1s]" />
            <div className="w-1 h-2 bg-info rounded-full animate-pulse [animation-delay:0.2s]" />
          </div>
        )}
        {aiState === "listening" && !isMuted && (
          <Mic className="w-4 h-4 text-success" />
        )}
        {aiState === "listening" && isMuted && (
          <MicOff className="w-4 h-4 text-error" />
        )}
        {aiState === "idle" && (
          <div className="w-4 h-4 border-2 border-info border-t-transparent rounded-full animate-spin" />
        )}
      </div>
      <div>
        <p className={`${config.textColor} text-body-sm font-medium`}>{config.message}</p>
        <p className="text-text-secondary text-body-xs">{config.subtext}</p>
      </div>
    </div>
  );
}
