import { Mic, MicOff, User } from "lucide-react";
import { AIState } from "../../../utils";

interface ParticipantTileProps {
  name: string;
  role?: string;
  isAI?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  aiState?: AIState;
  isLarge?: boolean;
}

export function ParticipantTile({
  name,
  isAI,
  isSpeaking,
  isMuted,
  aiState,
}: ParticipantTileProps) {
  const speaking = isAI ? aiState === "speaking" : isSpeaking;

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden aspect-video
        ${speaking ? "ring-2 ring-success" : "ring-1 ring-border"}
        transition-all duration-300
      `}
    >
      {/* Background */}
      <div className={`
        absolute inset-0
        ${isAI
          ? "bg-gradient-to-br from-primary-lightest via-primary-lighter to-primary-lightest"
          : "bg-gradient-to-br from-background-subtle via-background to-background-subtle"
        }
      `} />

      {/* Ambient animation for AI when speaking */}
      {isAI && aiState === "speaking" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/30 to-transparent animate-pulse" />
        </div>
      )}

      {/* Listening indicator for AI */}
      {isAI && aiState === "listening" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-success/20 via-transparent to-transparent" />
        </div>
      )}

      {/* Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isAI ? (
          <div className="relative">
            {/* Sound waves when speaking */}
            {aiState === "speaking" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full border-2 border-primary/30 animate-ping" />
                <div className="absolute w-28 h-28 rounded-full border-2 border-primary/20 animate-ping [animation-delay:0.2s]" />
              </div>
            )}
            <div className={`
              w-24 h-24 sm:w-28 sm:h-28 rounded-full
              bg-gradient-to-br from-primary to-primary-dark
              flex items-center justify-center shadow-2xl
              ${aiState === "idle" ? "animate-breathe" : ""}
              ${aiState === "speaking" ? "scale-105" : ""}
              transition-transform duration-300
            `}>
              <span className="text-white text-3xl sm:text-4xl font-bold">A</span>
            </div>
          </div>
        ) : (
          <div className={`
            w-20 h-20 sm:w-24 sm:h-24 rounded-full
            bg-gradient-to-br from-text-tertiary to-text-secondary
            flex items-center justify-center
            ${isSpeaking && !isMuted ? "ring-4 ring-success/50" : ""}
            transition-all duration-300
          `}>
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
        )}
      </div>

      {/* Name badge */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-body-sm font-medium text-text-primary">{name}</span>
          {isAI && (
            <span className="text-[10px] text-primary bg-primary/20 px-1.5 py-0.5 rounded font-medium">AI</span>
          )}
        </div>

        {/* Audio indicator */}
        <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1.5">
          {isMuted ? (
            <MicOff className="w-4 h-4 text-error" />
          ) : speaking ? (
            <div className="flex items-center gap-0.5">
              <div className="w-0.5 h-3 bg-success rounded-full animate-pulse" />
              <div className="w-0.5 h-4 bg-success rounded-full animate-pulse [animation-delay:0.1s]" />
              <div className="w-0.5 h-2 bg-success rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-0.5 h-4 bg-success rounded-full animate-pulse [animation-delay:0.3s]" />
              <div className="w-0.5 h-3 bg-success rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          ) : (
            <Mic className="w-4 h-4 text-text-tertiary" />
          )}
        </div>
      </div>

      {/* Speaking border glow effect */}
      {speaking && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-success ring-inset pointer-events-none" />
      )}
    </div>
  );
}
