"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { getInterviewById } from "../../data";
import { AIInterview } from "../../types";
import {
  Mic,
  MicOff,
  PhoneOff,
  AlertTriangle,
  ArrowLeft,
  User,
  MessageSquare,
  Volume2,
  Check,
  Sun,
  Moon,
} from "lucide-react";

// Connection states
type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "error" | "ended";

// AI Avatar states
type AIState = "idle" | "speaking" | "listening";

// Theme type
type Theme = "light" | "dark";

// Session state interface
interface SessionState {
  connectionStatus: ConnectionStatus;
  errorMessage?: string;
  isMuted: boolean;
  aiState: AIState;
  currentStageIndex: number;
  elapsedSeconds: number;
  showEndConfirmation: boolean;
  theme: Theme;
}

// Format seconds to MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Participant video tile component
function ParticipantTile({
  name,
  isAI,
  isSpeaking,
  isMuted,
  aiState,
  theme,
}: {
  name: string;
  role?: string;
  isAI?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  aiState?: AIState;
  isLarge?: boolean;
  theme: Theme;
}) {
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

// Stage progress pill component
function StageProgressPill({
  stages,
  currentIndex,
  theme,
}: {
  stages: string[];
  currentIndex: number;
  theme: Theme;
}) {
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

// Connection overlay component - Meeting style
function ConnectionOverlay({
  status,
  errorMessage,
  onRetry,
  onGoBack,
  theme,
}: {
  status: ConnectionStatus;
  errorMessage?: string;
  onRetry: () => void;
  onGoBack: () => void;
  theme: Theme;
}) {
  const isLight = theme === "light";

  if (status === "connecting") {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-white" : "bg-[#1a1a2e]"} flex items-center justify-center z-50`}>
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-blue-500/10 animate-ping [animation-delay:0.3s]" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              <span className="text-white text-4xl font-bold">A</span>
            </div>
          </div>
          <p className={`${isLight ? "text-gray-900" : "text-white"} text-xl font-semibold mb-2`}>Joining Interview...</p>
          <p className={`${isLight ? "text-gray-500" : "text-white/60"} text-sm`}>Connecting you with Alex, your AI interviewer</p>
          <div className="flex items-center justify-center gap-1 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-white" : "bg-[#1a1a2e]"} flex items-center justify-center z-50`}>
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className={`${isLight ? "text-gray-900" : "text-white"} text-2xl font-semibold mb-3`}>Connection Failed</h2>
          <p className={`${isLight ? "text-gray-500" : "text-white/60"} mb-8`}>
            {errorMessage || "We couldn't connect to the interview. Please check your internet and microphone permissions."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onGoBack}
              className={`px-6 py-3 rounded-xl ${isLight ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"} font-medium transition-colors flex items-center gap-2`}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "reconnecting") {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className={`${isLight ? "bg-yellow-100 border-yellow-300" : "bg-yellow-500/20 border-yellow-500/30"} backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-2`}>
          <div className={`w-4 h-4 border-2 ${isLight ? "border-yellow-600" : "border-yellow-400"} border-t-transparent rounded-full animate-spin`} />
          <span className={`${isLight ? "text-yellow-700" : "text-yellow-400"} text-sm font-medium`}>Reconnecting...</span>
        </div>
      </div>
    );
  }

  return null;
}

// End confirmation modal - Meeting style
function EndConfirmationModal({
  isOpen,
  stageName,
  stageNumber,
  totalStages,
  onContinue,
  onEnd,
  theme,
}: {
  isOpen: boolean;
  stageName: string;
  stageNumber: number;
  totalStages: number;
  onContinue: () => void;
  onEnd: () => void;
  theme: Theme;
}) {
  if (!isOpen) return null;
  const isLight = theme === "light";

  return (
    <div className={`fixed inset-0 ${isLight ? "bg-black/40" : "bg-black/70"} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className={`${isLight ? "bg-white border-gray-200" : "bg-[#242438] border-white/10"} border rounded-2xl max-w-md w-full p-6 shadow-2xl`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <PhoneOff className="w-5 h-5 text-red-500" />
          </div>
          <h2 className={`${isLight ? "text-gray-900" : "text-white"} text-xl font-semibold`}>Leave Interview?</h2>
        </div>

        <p className={`${isLight ? "text-gray-500" : "text-white/60"} mb-4`}>
          You&apos;re currently in Stage {stageNumber} of {totalStages} ({stageName})
        </p>

        <div className={`${isLight ? "bg-yellow-50 border-yellow-200" : "bg-yellow-500/10 border-yellow-500/20"} border rounded-xl p-4 mb-6`}>
          <p className={`${isLight ? "text-yellow-700" : "text-yellow-400"} text-sm font-medium mb-3`}>If you leave now:</p>
          <ul className="space-y-2">
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <Check className="w-4 h-4 text-green-500" />
              Your progress will be saved
            </li>
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <Check className="w-4 h-4 text-green-500" />
              You&apos;ll receive partial feedback
            </li>
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <AlertTriangle className={`w-4 h-4 ${isLight ? "text-yellow-600" : "text-yellow-400"}`} />
              Interview marked as incomplete
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className={`flex-1 px-4 py-3 rounded-xl ${isLight ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"} font-medium transition-colors`}
          >
            Stay in Interview
          </button>
          <button
            onClick={onEnd}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
          >
            Leave & Get Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState<AIInterview | null>(null);

  const [state, setState] = useState<SessionState>({
    connectionStatus: "connecting",
    isMuted: false,
    aiState: "idle",
    currentStageIndex: 0,
    elapsedSeconds: 0,
    showEndConfirmation: false,
    theme: "light", // Default to light theme
  });

  const isLight = state.theme === "light";

  const toggleTheme = useCallback(() => {
    setState((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }));
  }, []);

  // Load interview data
  useEffect(() => {
    const id = params.id as string;
    const data = getInterviewById(id);
    if (data) {
      setInterview(data);
    } else {
      router.push(ROUTES.aiInterview.index);
    }
  }, [params.id, router]);

  // Simulate connection (stub for now)
  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, connectionStatus: "connected" }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.connectionStatus !== "connected") return;

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.connectionStatus]);

  // Simulate AI state changes (stub for demo)
  useEffect(() => {
    if (state.connectionStatus !== "connected") return;

    // Cycle through AI states for demo
    const stateInterval = setInterval(() => {
      setState((prev) => {
        const states: AIState[] = ["idle", "speaking", "listening"];
        const currentIndex = states.indexOf(prev.aiState);
        const nextIndex = (currentIndex + 1) % states.length;
        return { ...prev, aiState: states[nextIndex] };
      });
    }, 4000);

    return () => clearInterval(stateInterval);
  }, [state.connectionStatus]);

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const handleEndClick = useCallback(() => {
    setState((prev) => ({ ...prev, showEndConfirmation: true }));
  }, []);

  const handleContinue = useCallback(() => {
    setState((prev) => ({ ...prev, showEndConfirmation: false }));
  }, []);

  const handleEndInterview = useCallback(() => {
    router.push(ROUTES.aiInterview.results(params.id as string));
  }, [router, params.id]);

  const handleRetry = useCallback(() => {
    setState((prev) => ({ ...prev, connectionStatus: "connecting" }));
    // Simulate reconnection
    setTimeout(() => {
      setState((prev) => ({ ...prev, connectionStatus: "connected" }));
    }, 2000);
  }, []);

  const handleGoBack = useCallback(() => {
    router.push(ROUTES.aiInterview.brief(params.id as string));
  }, [router, params.id]);

  if (!interview) {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-gray-50" : "bg-[#1a1a2e]"} flex items-center justify-center`}>
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${isLight ? "bg-gray-50" : "bg-[#1a1a2e]"} flex flex-col transition-colors duration-300`}>
      {/* Connection overlay */}
      <ConnectionOverlay
        status={state.connectionStatus}
        errorMessage={state.errorMessage}
        onRetry={handleRetry}
        onGoBack={handleGoBack}
        theme={state.theme}
      />

      {/* Header - Meeting style */}
      <header className={`flex items-center justify-between px-4 sm:px-6 py-3 ${isLight ? "bg-white border-gray-200" : "bg-[#242438]/80 border-white/5"} backdrop-blur-sm border-b transition-colors duration-300`}>
        <div className="flex items-center gap-4">
          {/* Meeting info */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div>
              <h1 className={`${isLight ? "text-gray-900" : "text-white"} text-sm font-medium truncate max-w-[200px]`}>
                {interview.title}
              </h1>
              <p className={`${isLight ? "text-gray-500" : "text-white/50"} text-xs`}>{interview.role}</p>
            </div>
          </div>
        </div>

        {/* Center - Timer and Status */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${isLight ? "bg-red-100" : "bg-red-500/20"} px-3 py-1.5 rounded-full`}>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className={`${isLight ? "text-red-600" : "text-red-400"} text-xs font-semibold`}>REC</span>
          </div>
          <div className={`font-mono text-sm ${isLight ? "bg-gray-100 text-gray-700" : "bg-white/10 text-white"} px-3 py-1.5 rounded-lg`}>
            {formatTime(state.elapsedSeconds)}
          </div>
          <StageProgressPill stages={interview.stages} currentIndex={state.currentStageIndex} theme={state.theme} />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isLight ? "hover:bg-gray-100 text-gray-500 hover:text-gray-700" : "hover:bg-white/10 text-white/60 hover:text-white"} transition-colors`}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main content - Video grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
        <div className="w-full max-w-6xl">
          {/* Video grid - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* AI Interviewer Tile - Large */}
            <ParticipantTile
              name="Alex"
              role="AI Interviewer"
              isAI
              aiState={state.aiState}
              theme={state.theme}
            />

            {/* User Tile */}
            <ParticipantTile
              name="You"
              role="Candidate"
              isSpeaking={state.aiState === "listening"}
              isMuted={state.isMuted}
              theme={state.theme}
            />
          </div>

          {/* Current stage indicator */}
          <div className="mt-6 flex items-center justify-center">
            <div className={`${isLight ? "bg-white border border-gray-200" : "bg-white/5"} backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3`}>
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {state.currentStageIndex + 1}
              </div>
              <span className={`${isLight ? "text-gray-700" : "text-white/80"} text-sm font-medium`}>
                {interview.stages[state.currentStageIndex]}
              </span>
              <span className={`${isLight ? "text-gray-400" : "text-white/40"} text-sm`}>
                • {interview.stages.length - state.currentStageIndex - 1} stages remaining
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Control bar - Meeting style bottom bar */}
      <footer className="py-4 px-4 sm:px-6">
        <div className={`max-w-xl mx-auto ${isLight ? "bg-white border border-gray-200 shadow-lg" : "bg-[#242438]/90"} backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between transition-colors duration-300`}>
          {/* Left controls */}
          <div className="flex items-center gap-2">
            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${state.isMuted
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : isLight
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {state.isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            {/* Speaker/Audio indicator */}
            <button className={`w-12 h-12 rounded-xl ${isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"} flex items-center justify-center transition-colors`}>
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Center - End call button */}
          <button
            onClick={handleEndClick}
            className="h-12 px-8 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-600/25"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="hidden sm:inline">End Interview</span>
          </button>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Chat (placeholder) */}
            <button className={`w-12 h-12 rounded-xl ${isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"} flex items-center justify-center transition-colors`}>
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>

      {/* End confirmation modal */}
      <EndConfirmationModal
        isOpen={state.showEndConfirmation}
        stageName={interview.stages[state.currentStageIndex]}
        stageNumber={state.currentStageIndex + 1}
        totalStages={interview.stages.length}
        onContinue={handleContinue}
        onEnd={handleEndInterview}
        theme={state.theme}
      />
    </div>
  );
}
