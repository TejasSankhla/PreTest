"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConversation } from "@elevenlabs/react";
import { ROUTES } from "@/lib/routes";
import { apiClient, API_ROUTES } from "@/lib/api";
import {
  SessionStartResponse,
  SessionState,
  AIState,
  formatTime,
  AIInterviewWithAgent,
  CreateAttemptResponse,
} from "../../utils";
import {
  ParticipantTile,
  StageProgressPill,
  ConnectionOverlay,
  AIStateIndicator,
  InterviewBriefBanner,
  HelpPanel,
  EndConfirmationModal,
} from "./components";
import {
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  Volume2,
  Sun,
  Moon,
  HelpCircle,
} from "lucide-react";

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState<AIInterviewWithAgent | null>(null);
  const conversationStarted = useRef(false);
  const conversationIdRef = useRef<string | null>(null);
  const attemptIdRef = useRef<string | null>(null);

  // Microphone mute state - controlled by ElevenLabs hook
  const [micMuted, setMicMuted] = useState(false);

  const [state, setState] = useState<Omit<SessionState, "isMuted">>({
    connectionStatus: "connecting",
    aiState: "idle",
    currentStageIndex: 0,
    elapsedSeconds: 0,
    showEndConfirmation: false,
    showHelpPanel: false,
    theme: "light",
  });

  const isLight = state.theme === "light";

  // ElevenLabs conversation hook - micMuted controls the microphone
  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      setState((prev) => ({ ...prev, connectionStatus: "connected" }));
    },
    onDisconnect: () => {
      // Use functional update to avoid stale closure
      setState((prev) => {
        if (prev.connectionStatus === "connected") {
          return { ...prev, connectionStatus: "ended" };
        }
        return prev;
      });
    },
    onError: (error) => {
      console.error("[ElevenLabs] Error:", error);
      setState((prev) => ({
        ...prev,
        connectionStatus: "error",
        errorMessage: typeof error === "string" ? error : "Connection failed",
      }));
    },
    onModeChange: (mode) => {
      const modeMap: Record<string, AIState> = {
        speaking: "speaking",
        listening: "listening",
        idle: "idle",
      };
      setState((prev) => ({
        ...prev,
        aiState: modeMap[mode.mode] || "idle",
      }));
    },
  });

  const toggleTheme = useCallback(() => {
    setState((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }));
  }, []);

  const toggleHelpPanel = useCallback(() => {
    setState((prev) => ({ ...prev, showHelpPanel: !prev.showHelpPanel }));
  }, []);

  // Start interview session - fetches data and connects to ElevenLabs
  const initSession = useCallback(async () => {
    const id = params.id as string;
    if (!id || conversationStarted.current) return;

    conversationStarted.current = true;

    try {
      const response = await apiClient.post<SessionStartResponse>(
        API_ROUTES.aiInterview.startSession(id)
      );

      if (!response.data.success) {
        throw new Error(response.data.msg || "Failed to start session");
      }

      const { signedUrl } = response.data.data;

      const interviewResponse = await apiClient.get(API_ROUTES.aiInterview.detail(id));
      if (interviewResponse.data.success) {
        const interviewData = interviewResponse.data.data.interview;
        setInterview({
          id: interviewData._id,
          title: interviewData.name,
          role: interviewData.role || "Technical Interview",
          description: interviewData.description,
          difficulty: interviewData.difficulty,
          duration: interviewData.durationMins,
          stages: interviewData.stages || [],
          focusAreas: interviewData.tags || [],
          totalTaken: interviewData.totalAttempts || 0,
          avgScore: interviewData.avgScore || 0,
          status: "available",
          createdAt: interviewData.createdAt,
        });
      }

      const conversationId = await conversation.startSession({ signedUrl });
      if (conversationId) {
        conversationIdRef.current = conversationId;

        // Create attempt record in the backend
        try {
          const attemptResponse = await apiClient.post<CreateAttemptResponse>(
            API_ROUTES.attempts.create(id),
            { conversationId }
          );
          if (attemptResponse.data.success) {
            attemptIdRef.current = attemptResponse.data.data.attemptId;
          }
        } catch (attemptError) {
          // Log but don't fail the session - attempt tracking is non-critical
          console.error("Failed to create attempt record:", attemptError);
        }
      }
    } catch (error) {
      console.error("Failed to start session:", error);
      conversationStarted.current = false;
      setState((prev) => ({
        ...prev,
        connectionStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Failed to start interview session",
      }));
    }
  }, [params.id, conversation]);

  // Initialize session on mount
  useEffect(() => {
    initSession();
  }, [initSession]);

  // Timer effect
  useEffect(() => {
    if (state.connectionStatus !== "connected") return;

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.connectionStatus]);

  // Toggle microphone mute - uses controlled state via ElevenLabs hook
  const toggleMute = useCallback(() => {
    setMicMuted((prev) => !prev);
  }, []);

  const handleEndClick = useCallback(() => {
    setState((prev) => ({ ...prev, showEndConfirmation: true }));
  }, []);

  const handleContinue = useCallback(() => {
    setState((prev) => ({ ...prev, showEndConfirmation: false }));
  }, []);

  const handleEndInterview = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end session:", error);
    }

    // End the attempt record
    if (attemptIdRef.current) {
      try {
        await apiClient.post(API_ROUTES.attempts.end(attemptIdRef.current));
      } catch (error) {
        console.error("Failed to end attempt:", error);
      }
    }

    // Navigate to results page with conversationId
    const resultsUrl = conversationIdRef.current
      ? `${ROUTES.aiInterview.results(params.id as string)}?conversationId=${conversationIdRef.current}`
      : ROUTES.aiInterview.results(params.id as string);
    router.push(resultsUrl);
  }, [router, params.id, conversation]);

  const handleRetry = useCallback(() => {
    // Reset all session state
    conversationStarted.current = false;
    conversationIdRef.current = null;
    attemptIdRef.current = null;
    setInterview(null);
    setMicMuted(false);
    setState({
      connectionStatus: "connecting",
      aiState: "idle",
      currentStageIndex: 0,
      elapsedSeconds: 0,
      showEndConfirmation: false,
      showHelpPanel: false,
      theme: state.theme, // Preserve theme preference
    });
    // Re-initialize session
    initSession();
  }, [initSession, state.theme]);

  const handleGoBack = useCallback(() => {
    if (conversation.status === "connected") {
      conversation.endSession();
    }
    router.push(ROUTES.aiInterview.brief(params.id as string));
  }, [router, params.id, conversation]);

  // Show error state if connection failed
  if (state.connectionStatus === "error") {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-gray-50" : "bg-[#1a1a2e]"} flex flex-col`}>
        <ConnectionOverlay
          status="error"
          errorMessage={state.errorMessage}
          onRetry={handleRetry}
          onGoBack={handleGoBack}
          theme={state.theme}
        />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-gray-50" : "bg-[#1a1a2e]"} flex items-center justify-center`}>
        <ConnectionOverlay
          status="connecting"
          onRetry={handleRetry}
          onGoBack={handleGoBack}
          theme={state.theme}
        />
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

      {/* Header */}
      <header className={`flex items-center justify-between px-4 sm:px-6 py-3 ${isLight ? "bg-white border-gray-200" : "bg-[#242438]/80 border-white/5"} backdrop-blur-sm border-b transition-colors duration-300`}>
        <div className="flex items-center gap-4">
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
          <button
            onClick={toggleHelpPanel}
            className={`p-2 rounded-lg ${isLight ? "hover:bg-gray-100 text-gray-500 hover:text-gray-700" : "hover:bg-white/10 text-white/60 hover:text-white"} transition-colors`}
            title="Interview guide & help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isLight ? "hover:bg-gray-100 text-gray-500 hover:text-gray-700" : "hover:bg-white/10 text-white/60 hover:text-white"} transition-colors`}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-auto">
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
          <InterviewBriefBanner
            interview={interview}
            currentStageIndex={state.currentStageIndex}
            theme={state.theme}
          />

          {/* Video grid */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <ParticipantTile
                  name={interview.agent?.name || "AI Interviewer"}
                  role="AI Interviewer"
                  isAI
                  aiState={state.aiState}
                  theme={state.theme}
                />
                <ParticipantTile
                  name="You"
                  role="Candidate"
                  isSpeaking={state.aiState === "listening"}
                  isMuted={micMuted}
                  theme={state.theme}
                />
              </div>

              <div className="mt-6 flex items-center justify-center">
                <AIStateIndicator
                  aiState={state.aiState}
                  isMuted={micMuted}
                  theme={state.theme}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Control bar */}
      <footer className="py-4 px-4 sm:px-6">
        <div className={`max-w-xl mx-auto ${isLight ? "bg-white border border-gray-200 shadow-lg" : "bg-[#242438]/90"} backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between transition-colors duration-300`}>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${micMuted
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : isLight
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button className={`w-12 h-12 rounded-xl ${isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"} flex items-center justify-center transition-colors`}>
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleEndClick}
            className="h-12 px-8 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-600/25"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="hidden sm:inline">End Interview</span>
          </button>

          <div className="flex items-center gap-2">
            <button className={`w-12 h-12 rounded-xl ${isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"} flex items-center justify-center transition-colors`}>
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EndConfirmationModal
        isOpen={state.showEndConfirmation}
        stageName={interview.stages[state.currentStageIndex]}
        stageNumber={state.currentStageIndex + 1}
        totalStages={interview.stages.length}
        onContinue={handleContinue}
        onEnd={handleEndInterview}
        theme={state.theme}
      />

      <HelpPanel
        isOpen={state.showHelpPanel}
        onClose={toggleHelpPanel}
        stages={interview.stages}
        currentStageIndex={state.currentStageIndex}
        theme={state.theme}
      />
    </div>
  );
}
