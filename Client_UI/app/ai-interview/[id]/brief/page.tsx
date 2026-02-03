"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { Difficulty } from "../../types";
import {
  AIInterviewWithAgent,
  GetInterviewResponse,
  transformInterview,
  SessionStartResponse,
  CreateAttemptResponse,
  AIState,
  formatTime,
} from "../../utils";
import { apiClient, API_ROUTES } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { buildLoginUrl, getCurrentPathForReturn } from "@/lib/auth-redirect";
import { useConversation } from "@elevenlabs/react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  BarChart3,
  Mic,
  MicOff,
  Sparkles,
  Info,
  ListOrdered,
  MessageSquare,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  PhoneOff,
  Volume2,
  HelpCircle,
} from "lucide-react";

// Import session components
import {
  ParticipantTile,
  StageProgressPill,
  ConnectionOverlay,
  AIStateIndicator,
  InterviewBriefBanner,
  HelpPanel,
  EndConfirmationModal,
} from "../session/components";

// Difficulty badge config
const difficultyConfig: Record<
  Difficulty,
  { label: string; variant: "success" | "warning" | "error" }
> = {
  [Difficulty.EASY]: { label: "Easy", variant: "success" },
  [Difficulty.MEDIUM]: { label: "Medium", variant: "warning" },
  [Difficulty.HARD]: { label: "Hard", variant: "error" },
};

// Page mode
type PageMode = "brief" | "session";

// Session state
interface SessionPageState {
  connectionStatus: "connecting" | "connected" | "reconnecting" | "error" | "ended";
  errorMessage?: string;
  aiState: AIState;
  currentStageIndex: number;
  elapsedSeconds: number;
  showEndConfirmation: boolean;
  showHelpPanel: boolean;
}

// Loading skeleton component
function BriefPageSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="border-b border-border bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-6">
          <div className="md:col-span-3 bg-white rounded-2xl border border-border p-6 h-64" />
          <div className="md:col-span-2 bg-gray-100 rounded-2xl border border-border p-6 h-64" />
        </div>
        <div className="bg-white rounded-2xl border border-border p-6 h-32 mb-6" />
        <div className="bg-gray-50 rounded-2xl p-6 h-40" />
      </main>
    </div>
  );
}

// Not found state
function NotFoundState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
        <h1 className="text-heading-lg font-bold text-text-primary mb-2">
          Interview Not Found
        </h1>
        <p className="text-body-md text-text-secondary mb-6">
          The interview you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href={ROUTES.aiInterview.index}>
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function InterviewBriefPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  // Page state
  const [mode, setMode] = useState<PageMode>("brief");
  const [interview, setInterview] = useState<AIInterviewWithAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTips, setShowTips] = useState(false);

  // Session state
  const conversationStarted = useRef(false);
  const conversationIdRef = useRef<string | null>(null);
  const attemptIdRef = useRef<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [sessionState, setSessionState] = useState<SessionPageState>({
    connectionStatus: "connecting",
    aiState: "idle",
    currentStageIndex: 0,
    elapsedSeconds: 0,
    showEndConfirmation: false,
    showHelpPanel: false,
  });

  // ElevenLabs conversation hook
  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      setSessionState((prev) => ({ ...prev, connectionStatus: "connected" }));
    },
    onDisconnect: () => {
      setSessionState((prev) => {
        if (prev.connectionStatus === "connected") {
          return { ...prev, connectionStatus: "ended" };
        }
        return prev;
      });
    },
    onError: (error) => {
      console.error("[ElevenLabs] Error:", error);
      setSessionState((prev) => ({
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
      setSessionState((prev) => ({
        ...prev,
        aiState: modeMap[mode.mode] || "idle",
      }));
    },
  });

  // Fetch interview data from API
  useEffect(() => {
    const id = params.id as string;
    if (!id) return;

    const fetchInterview = async () => {
      try {
        const response = await apiClient.get<GetInterviewResponse>(API_ROUTES.aiInterview.detail(id));
        if (response.data.success) {
          const transformed = transformInterview(response.data.data.interview);
          setInterview(transformed);
        } else {
          setInterview(null);
        }
      } catch (error) {
        console.error("Failed to fetch interview:", error);
        setInterview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [params.id]);

  // Timer effect for session
  useEffect(() => {
    if (mode !== "session" || sessionState.connectionStatus !== "connected") return;

    const interval = setInterval(() => {
      setSessionState((prev) => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, sessionState.connectionStatus]);

  // Start interview session
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
          console.error("Failed to create attempt record:", attemptError);
        }
      }
    } catch (error) {
      console.error("Failed to start session:", error);
      conversationStarted.current = false;
      setSessionState((prev) => ({
        ...prev,
        connectionStatus: "error",
        errorMessage: error instanceof Error ? error.message : "Failed to start interview session",
      }));
    }
  }, [params.id, conversation]);

  const handleStartInterview = () => {
    // Require login to start interview
    if (!user) {
      const returnPath = getCurrentPathForReturn();
      router.push(buildLoginUrl(returnPath));
      return;
    }

    // Switch to session mode and initialize
    setMode("session");
    initSession();
  };

  const toggleHelpPanel = useCallback(() => {
    setSessionState((prev) => ({ ...prev, showHelpPanel: !prev.showHelpPanel }));
  }, []);

  const toggleMute = useCallback(() => {
    setMicMuted((prev) => !prev);
  }, []);

  const handleEndClick = useCallback(() => {
    setSessionState((prev) => ({ ...prev, showEndConfirmation: true }));
  }, []);

  const handleContinue = useCallback(() => {
    setSessionState((prev) => ({ ...prev, showEndConfirmation: false }));
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

    // Navigate to results page with attemptId
    const resultsUrl = ROUTES.aiInterview.results(params.id as string);
    if (attemptIdRef.current) {
      router.push(`${resultsUrl}?attemptId=${attemptIdRef.current}`);
    } else {
      router.push(resultsUrl);
    }
  }, [router, params.id, conversation]);

  const handleRetry = useCallback(() => {
    // Reset all session state
    conversationStarted.current = false;
    conversationIdRef.current = null;
    attemptIdRef.current = null;
    setMicMuted(false);
    setSessionState({
      connectionStatus: "connecting",
      aiState: "idle",
      currentStageIndex: 0,
      elapsedSeconds: 0,
      showEndConfirmation: false,
      showHelpPanel: false,
    });
    // Re-initialize session
    initSession();
  }, [initSession]);

  const handleGoBack = useCallback(() => {
    if (conversation.status === "connected") {
      conversation.endSession();
    }
    // Go back to brief mode
    setMode("brief");
    conversationStarted.current = false;
    conversationIdRef.current = null;
    attemptIdRef.current = null;
    setMicMuted(false);
    setSessionState({
      connectionStatus: "connecting",
      aiState: "idle",
      currentStageIndex: 0,
      elapsedSeconds: 0,
      showEndConfirmation: false,
      showHelpPanel: false,
    });
  }, [conversation]);

  if (loading) return <BriefPageSkeleton />;
  if (!interview) return <NotFoundState />;

  const difficulty = difficultyConfig[interview.difficulty as Difficulty];

  // Render session mode
  if (mode === "session") {
    // Show error state if connection failed
    if (sessionState.connectionStatus === "error") {
      return (
        <div className="fixed inset-0 bg-background flex flex-col">
          <ConnectionOverlay
            status="error"
            errorMessage={sessionState.errorMessage}
            onRetry={handleRetry}
            onGoBack={handleGoBack}
          />
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        {/* Connection overlay */}
        <ConnectionOverlay
          status={sessionState.connectionStatus}
          errorMessage={sessionState.errorMessage}
          onRetry={handleRetry}
          onGoBack={handleGoBack}
        />

        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-background backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white text-body-xs font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-text-primary text-body-sm font-medium truncate max-w-[200px]">
                  {interview.title}
                </h1>
                <p className="text-text-tertiary text-body-xs">{interview.role}</p>
              </div>
            </div>
          </div>

          {/* Center - Timer and Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-error-light px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
              <span className="text-error text-body-xs font-semibold">REC</span>
            </div>
            <div className="font-mono text-body-sm bg-background-subtle text-text-primary px-3 py-1.5 rounded-lg">
              {formatTime(sessionState.elapsedSeconds)}
            </div>
            <StageProgressPill stages={interview.stages} currentIndex={sessionState.currentStageIndex} />
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleHelpPanel}
              className="p-2 rounded-lg hover:bg-background-subtle text-text-tertiary hover:text-text-primary transition-colors"
              title="Interview guide & help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-auto">
          <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
            <InterviewBriefBanner
              interview={interview}
              currentStageIndex={sessionState.currentStageIndex}
            />

            {/* Video grid */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <ParticipantTile
                    name={interview.agent?.name || "AI Interviewer"}
                    role="AI Interviewer"
                    isAI
                    aiState={sessionState.aiState}
                  />
                  <ParticipantTile
                    name="You"
                    role="Candidate"
                    isSpeaking={sessionState.aiState === "listening"}
                    isMuted={micMuted}
                  />
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <AIStateIndicator
                    aiState={sessionState.aiState}
                    isMuted={micMuted}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Control bar */}
        <footer className="py-4 px-4 sm:px-6">
          <div className="max-w-xl mx-auto bg-background border border-border shadow-lg backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all
                  ${micMuted
                    ? "bg-error text-white hover:bg-error/90"
                    : "bg-background-subtle text-text-secondary hover:bg-border"
                  }
                `}
              >
                {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button className="w-12 h-12 rounded-xl bg-background-subtle text-text-secondary hover:bg-border flex items-center justify-center transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleEndClick}
              className="h-12 px-8 rounded-xl bg-error hover:bg-error/90 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-error/25"
            >
              <PhoneOff className="w-5 h-5" />
              <span className="hidden sm:inline">End Interview</span>
            </button>

            <div className="flex items-center gap-2">
              <button className="w-12 h-12 rounded-xl bg-background-subtle text-text-secondary hover:bg-border flex items-center justify-center transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <EndConfirmationModal
          isOpen={sessionState.showEndConfirmation}
          stageName={interview.stages[sessionState.currentStageIndex]}
          stageNumber={sessionState.currentStageIndex + 1}
          totalStages={interview.stages.length}
          onContinue={handleContinue}
          onEnd={handleEndInterview}
        />

        <HelpPanel
          isOpen={sessionState.showHelpPanel}
          onClose={toggleHelpPanel}
          stages={interview.stages}
          currentStageIndex={sessionState.currentStageIndex}
        />
      </div>
    );
  }

  // Render brief mode (original UI)
  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-0">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.aiInterview.index}
              className="p-1.5 rounded-lg hover:bg-background-subtle transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-text-tertiary" />
            </Link>
            <span className="text-body-sm text-text-secondary">
              AI Mock Interview
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-6">
          {/* Interview Details Card */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-border p-5 sm:p-6 relative">
            {/* Difficulty Badge - top right */}
            <div className="absolute top-4 right-4">
              <Badge variant={difficulty.variant} size="sm">
                {difficulty.label}
              </Badge>
            </div>

            {/* Title & Role */}
            <div className="mb-4 pr-16">
              <h1 className="text-heading-lg font-bold text-text-primary mb-1">
                {interview.title}
              </h1>
              <p className="text-body-md text-text-secondary">{interview.role}</p>
            </div>

            {/* Description */}
            <p className="text-body-md text-text-secondary mb-4 leading-relaxed">
              {interview.description}
            </p>

            {/* Divider */}
            <div className="border-t border-border my-4" />

            {/* Focus Areas */}
            <div className="mb-4">
              <p className="text-body-xs text-text-tertiary uppercase tracking-wide mb-2">
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {interview.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2 py-0.5 bg-background-subtle rounded-full text-body-xs text-text-tertiary"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-body-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-text-tertiary" />
                <span>{interview.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-text-tertiary" />
                <span>{interview.totalTaken.toLocaleString()} taken</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-text-tertiary" />
                <span>{interview.avgScore}% avg</span>
              </div>
            </div>
          </div>

          {/* Interviewer Persona Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl border border-border p-5 sm:p-6 text-center">
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
              <Mic className="w-8 h-8 text-white" />
            </div>

            {/* Name & Role */}
            <h3 className="text-heading-md font-semibold text-text-primary mb-1">
              {interview.agent?.name || "AI Interviewer"}
            </h3>
            <p className="text-body-sm text-text-secondary mb-2">
              {interview.agent?.role || "Technical Interviewer"}
            </p>
            <p className="text-body-xs text-text-tertiary italic mb-4">
              {interview.agent?.company ? `at ${interview.agent.company}` : "Professional, supportive, thorough"}
            </p>

            {/* Features */}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-body-xs text-text-secondary">
                <Mic className="w-3.5 h-3.5 text-secondary" />
                <span>Voice Conversation</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-body-xs text-text-secondary">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>AI-Powered Feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Stages */}
        <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 mb-6">
          <h2 className="text-heading-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-secondary" />
            Interview Stages
          </h2>

          {/* Desktop: Horizontal stepper */}
          <div className="hidden sm:flex items-start justify-between">
            {interview.stages.map((stage, index) => (
              <div key={stage} className="flex-1 relative">
                {/* Connector line */}
                {index < interview.stages.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-border" />
                )}

                {/* Stage circle */}
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-body-xs font-semibold text-secondary z-10 bg-white">
                    {index + 1}
                  </div>
                  <span className="mt-2 text-body-xs font-medium text-text-primary text-center px-1">
                    {stage}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical list */}
          <div className="sm:hidden space-y-3">
            {interview.stages.map((stage, index) => (
              <div key={stage} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-[10px] font-semibold text-secondary flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">
                    {stage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div className="bg-background-subtle rounded-2xl p-5 sm:p-6 mb-6">
          <h2 className="text-heading-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-secondary" />
            What to Expect
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <Mic className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  Voice Conversation
                </p>
                <p className="text-body-xs text-text-tertiary">
                  Speak naturally with {interview.agent?.name || "your AI interviewer"} using your microphone
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  Single Session
                </p>
                <p className="text-body-xs text-text-tertiary">
                  Complete in one sitting, no pause/resume
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  Detailed Feedback
                </p>
                <p className="text-body-xs text-text-tertiary">
                  Receive scores and insights after completion
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  Unlimited Retakes
                </p>
                <p className="text-body-xs text-text-tertiary">
                  Practice as many times as you need
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-background-subtle transition-colors"
          >
            <span className="flex items-center gap-2 text-body-sm font-medium text-text-primary">
              <Lightbulb className="w-4 h-4 text-warning" />
              Tips for Success
            </span>
            <ChevronDown
              className={`w-4 h-4 text-text-tertiary transition-transform ${
                showTips ? "rotate-180" : ""
              }`}
            />
          </button>

          {showTips && (
            <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-border">
              <ul className="space-y-2 text-body-sm text-text-secondary pt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Find a quiet environment with stable internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Test your microphone before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Speak clearly and take your time to think</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Have your resume or portfolio nearby for reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Treat it like a real interview for best results</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center justify-between pt-4">
          <Link href={ROUTES.aiInterview.index}>
            <Button variant="ghost" size="md">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>
          </Link>

          <Button
            variant="primary"
            size="lg"
            className="min-w-[180px]"
            onClick={handleStartInterview}
          >
            {user ? "Start Interview" : "Sign in to Start"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
        <div className="h-6 bg-gradient-to-t from-background to-transparent" />
        <div className="bg-background/95 backdrop-blur-lg border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between mb-2 text-body-xs text-text-secondary">
            <span>{interview.duration} min interview</span>
            <span className="font-medium text-text-primary">Ready when you are</span>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleStartInterview}
          >
            {user ? "Start Interview" : "Sign in to Start"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
