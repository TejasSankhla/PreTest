import { Mic, MicOff, User } from "lucide-react";
import { AIState, Theme } from "../../../utils";

interface ParticipantTileProps {
  name: string;
  role?: string;
  isAI?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  aiState?: AIState;
  isLarge?: boolean;
  theme: Theme;
}

export function ParticipantTile({
  name,
  isAI,
  isSpeaking,
  isMuted,
  aiState,
  theme,
}: ParticipantTileProps) {
  const speaking = isAI ? aiState === "speaking" : isSpeaking;
  const isLight = theme === "light";

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden aspect-video
        ${speaking ? "ring-2 ring-green-500" : isLight ? "ring-1 ring-gray-200" : "ring-1 ring-white/10"}
        transition-all duration-300
      `}
    >
      {/* Background */}
      <div className={`
        absolute inset-0
        ${isLight
          ? isAI
            ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50"
            : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
          : isAI
            ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800"
            : "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700"
        }
      `} />

      {/* Ambient animation for AI when speaking */}
      {isAI && aiState === "speaking" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? "from-blue-200/40" : "from-blue-600/20"} via-transparent to-transparent`} />
          <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isLight ? "from-blue-300/40" : "from-blue-500/30"} to-transparent animate-pulse`} />
        </div>
      )}

      {/* Listening indicator for AI */}
      {isAI && aiState === "listening" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? "from-green-200/30" : "from-green-600/10"} via-transparent to-transparent`} />
        </div>
      )}

      {/* Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isAI ? (
          <div className="relative">
            {/* Sound waves when speaking */}
            {aiState === "speaking" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-32 h-32 rounded-full border-2 ${isLight ? "border-blue-400/40" : "border-blue-400/30"} animate-ping`} />
                <div className={`absolute w-28 h-28 rounded-full border-2 ${isLight ? "border-blue-400/30" : "border-blue-400/20"} animate-ping [animation-delay:0.2s]`} />
              </div>
            )}
            <div className={`
              w-24 h-24 sm:w-28 sm:h-28 rounded-full
              bg-gradient-to-br from-blue-500 to-indigo-600
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
            ${isLight ? "bg-gradient-to-br from-gray-300 to-gray-400" : "bg-gradient-to-br from-gray-500 to-gray-600"}
            flex items-center justify-center
            ${isSpeaking && !isMuted ? "ring-4 ring-green-500/50" : ""}
            transition-all duration-300
          `}>
            <User className={`w-10 h-10 sm:w-12 sm:h-12 ${isLight ? "text-white" : "text-white/80"}`} />
          </div>
        )}
      </div>

      {/* Name badge */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${isLight ? "bg-white/80" : "bg-black/50"} backdrop-blur-sm rounded-lg px-3 py-1.5`}>
          <span className={`text-sm font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{name}</span>
          {isAI && (
            <span className="text-[10px] text-blue-500 bg-blue-500/20 px-1.5 py-0.5 rounded font-medium">AI</span>
          )}
        </div>

        {/* Audio indicator */}
        <div className={`flex items-center gap-1 ${isLight ? "bg-white/80" : "bg-black/50"} backdrop-blur-sm rounded-lg px-2 py-1.5`}>
          {isMuted ? (
            <MicOff className="w-4 h-4 text-red-500" />
          ) : speaking ? (
            <div className="flex items-center gap-0.5">
              <div className="w-0.5 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="w-0.5 h-4 bg-green-500 rounded-full animate-pulse [animation-delay:0.1s]" />
              <div className="w-0.5 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-0.5 h-4 bg-green-500 rounded-full animate-pulse [animation-delay:0.3s]" />
              <div className="w-0.5 h-3 bg-green-500 rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          ) : (
            <Mic className={`w-4 h-4 ${isLight ? "text-gray-400" : "text-white/60"}`} />
          )}
        </div>
      </div>

      {/* Speaking border glow effect */}
      {speaking && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-green-500 ring-inset pointer-events-none" />
      )}
    </div>
  );
}
