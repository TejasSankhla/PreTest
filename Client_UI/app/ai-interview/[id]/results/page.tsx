"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { apiClient, API_ROUTES } from "@/lib/api";
import { AIInterview, Difficulty } from "../../types";
import {
  GetInterviewResponse,
  transformInterview,
  SessionSummary,
  AttemptStatusResponse,
  FullAttemptResponse,
  FullEvaluation,
  RubricScore,
  FeedbackPoint,
  EvaluationPhase,
  TranscriptItem,
} from "../../utils";
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  RotateCcw,
  Home,
  Sparkles,
  Timer,
  Target,
  MessageSquare,
  TrendingUp,
  Star,
  ChevronRight,
  Calendar,
  ChevronDown,
  Check,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

// ============================================
// CONSTANTS
// ============================================

const POLLING_INTERVAL_MS = 3000; // Poll every 3 seconds
const MAX_POLLING_DURATION_MS = 5 * 60 * 1000; // 5 minute timeout

const POLLING_STEPS = [
  "Processing transcript...",
  "Analyzing communication...",
  "Evaluating responses...",
  "Generating feedback...",
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getScoreColor(score: number): {
  text: string;
  bg: string;
  ring: string;
  label: string;
} {
  if (score >= 80) {
    return {
      text: "text-green-600",
      bg: "bg-green-500",
      ring: "stroke-green-500",
      label: "Excellent",
    };
  }
  if (score >= 70) {
    return {
      text: "text-green-600",
      bg: "bg-green-500",
      ring: "stroke-green-500",
      label: "Good",
    };
  }
  if (score >= 60) {
    return {
      text: "text-yellow-600",
      bg: "bg-yellow-500",
      ring: "stroke-yellow-500",
      label: "Fair",
    };
  }
  return {
    text: "text-red-600",
    bg: "bg-red-500",
    ring: "stroke-red-500",
    label: "Needs Work",
  };
}

const difficultyConfig: Record<
  Difficulty,
  { label: string; variant: "success" | "warning" | "error" }
> = {
  [Difficulty.EASY]: { label: "Easy", variant: "success" },
  [Difficulty.MEDIUM]: { label: "Medium", variant: "warning" },
  [Difficulty.HARD]: { label: "Hard", variant: "error" },
};

// ============================================
// UI COMPONENTS
// ============================================

// Score Ring Component
function ScoreRing({
  score,
  size = 100,
  showLabel = true,
}: {
  score: number;
  size?: number;
  showLabel?: boolean;
}) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const colors = getScoreColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colors.ring} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${colors.text}`}>{score}</span>
        {showLabel && (
          <span className="text-xs text-gray-400">/100</span>
        )}
      </div>
    </div>
  );
}

// Feedback Item Component
function FeedbackItemDisplay({ item }: { item: FeedbackPoint }) {
  return (
    <li className="flex gap-3">
      <span className="text-gray-400 mt-1.5 flex-shrink-0">•</span>
      <div className="flex-1">
        <p className="text-sm text-gray-700 leading-relaxed">
          {item.point}
        </p>
        {item.evidence && (
          <p className="text-xs text-gray-500 mt-1.5 pl-3 border-l-2 border-gray-200 italic">
            {item.evidence}
          </p>
        )}
      </div>
    </li>
  );
}

// Rubric Accordion Component
function RubricAccordion({
  rubric,
  defaultOpen = false,
}: {
  rubric: RubricScore;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colors = getScoreColor(rubric.score);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-base font-medium text-gray-900">
          {rubric.rubricName}
        </span>
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-semibold px-2.5 py-0.5 rounded-md ${colors.text} ${
              rubric.score >= 70 ? "bg-green-100" : rubric.score >= 60 ? "bg-yellow-100" : "bg-red-100"
            }`}
          >
            {rubric.score}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Strengths Column */}
            <div className="p-5 bg-green-50/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
                <h4 className="text-sm font-medium text-green-700">
                  Strengths
                </h4>
              </div>
              {rubric.strengths.length > 0 ? (
                <ul className="space-y-3">
                  {rubric.strengths.map((item, idx) => (
                    <FeedbackItemDisplay key={idx} item={item} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No specific strengths noted
                </p>
              )}
            </div>

            {/* Areas to Improve Column */}
            <div className="p-5 bg-yellow-50/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
                </div>
                <h4 className="text-sm font-medium text-yellow-700">
                  Areas to Improve
                </h4>
              </div>
              {rubric.feedbacks.length > 0 ? (
                <ul className="space-y-3">
                  {rubric.feedbacks.map((item, idx) => (
                    <FeedbackItemDisplay key={idx} item={item} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No specific areas for improvement noted
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stat card component
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-gray-500 text-sm">{label}</span>
      </div>
      <p className="text-gray-900 text-xl font-semibold">{value}</p>
      {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
    </div>
  );
}

// Call ended animation component
function CallEndedAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75" />
          <div className="relative w-full h-full rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-gray-900 text-2xl font-semibold mb-2">
          Interview Ended
        </h2>
        <p className="text-gray-500">Preparing your results...</p>
      </div>
    </div>
  );
}

// Scoring in progress component (with real progress)
function ScoringProgress({
  interview,
  progress,
  currentStep,
}: {
  interview: AIInterview;
  progress: number;
  currentStep: number;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-gray-900 text-2xl font-bold mb-2">
            Analyzing Your Interview
          </h1>
          <p className="text-gray-500">{interview.title}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 text-sm font-medium">Processing</span>
            <span className="text-blue-600 text-sm font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {POLLING_STEPS[currentStep % POLLING_STEPS.length]}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            What we&apos;re evaluating
          </h3>
          <div className="space-y-3">
            {interview.focusAreas.slice(0, 4).map((area, index) => (
              <div key={area} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= currentStep
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index <= currentStep ? "✓" : index + 1}
                </div>
                <span
                  className={`text-sm ${
                    index <= currentStep ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-6">
          <Clock className="w-4 h-4" />
          <span>This usually takes 1-2 minutes</span>
        </div>
      </div>
    </div>
  );
}

// Evaluation Results component (with full evaluation data)
function EvaluationResults({
  interview,
  evaluation,
  sessionSummary,
}: {
  interview: AIInterview;
  evaluation: FullEvaluation;
  sessionSummary: SessionSummary;
}) {
  const colors = getScoreColor(evaluation.overallScore);
  const difficulty = difficultyConfig[interview.difficulty as Difficulty] || difficultyConfig[Difficulty.MEDIUM];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href={ROUTES.aiInterview.history}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to My Interviews</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(sessionSummary.completedAt)}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success banner with score */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-lg shadow-green-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">Interview Completed!</h1>
              <p className="text-white/80">{interview.title}</p>
              <Badge variant={difficulty.variant} size="sm" className="mt-2">
                {difficulty.label}
              </Badge>
            </div>
            <div className="flex flex-col items-center">
              <ScoreRing score={evaluation.overallScore} size={80} />
              <span className={`text-sm font-medium mt-2 text-white/90`}>
                {colors.label}
              </span>
            </div>
          </div>
        </div>

        {/* Session stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Timer}
            label="Duration"
            value={formatDuration(sessionSummary.duration)}
            subtext={`of ${interview.duration} min`}
          />
          <StatCard
            icon={Target}
            label="Stages"
            value={`${sessionSummary.stagesCompleted}/${sessionSummary.totalStages}`}
            subtext="completed"
          />
          <StatCard
            icon={MessageSquare}
            label="Questions"
            value={sessionSummary.questionsAnswered.toString()}
            subtext="answered"
          />
          <StatCard
            icon={TrendingUp}
            label="Score"
            value={evaluation.overallScore.toString()}
            subtext="out of 100"
          />
        </div>

        {/* Overall Feedback */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <header className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Overall Feedback
            </h2>
          </header>
          <div className="px-6 py-6">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {evaluation.overallFeedback}
            </p>
          </div>
        </section>

        {/* Rubric Breakdown */}
        {evaluation.rubricScores.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detailed Breakdown
            </h2>
            <div className="space-y-4">
              {evaluation.rubricScores.map((rubric, idx) => (
                <RubricAccordion
                  key={rubric.rubricId}
                  rubric={rubric}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* What's next section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            What&apos;s Next?
          </h3>
          <div className="space-y-3">
            <Link
              href={ROUTES.aiInterview.brief(interview.id)}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Practice Again</p>
                  <p className="text-gray-500 text-sm">
                    Retake this interview to improve
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>

            <Link
              href={ROUTES.aiInterview.index}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <Home className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Explore More</p>
                  <p className="text-gray-500 text-sm">
                    Try different interview types
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={ROUTES.aiInterview.brief(interview.id)} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Interview
            </Button>
          </Link>
          <Link href={ROUTES.aiInterview.index} className="flex-1">
            <Button variant="primary" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Browse Interviews
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

// Evaluation Failed component
function EvaluationFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold mb-2">Evaluation Failed</h1>
        <p className="text-gray-500 mb-6">
          Something went wrong while evaluating your interview.
          Please try again or contact support if the issue persists.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href={ROUTES.aiInterview.index}>
            <Button variant="primary">Back to Interviews</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Evaluation Timeout component
function EvaluationTimeout() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
          <Clock className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold mb-2">Taking Longer Than Expected</h1>
        <p className="text-gray-500 mb-6">
          Your evaluation is still processing. Check your interview history later
          to see the results.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href={ROUTES.aiInterview.history}>
            <Button variant="outline">View History</Button>
          </Link>
          <Link href={ROUTES.aiInterview.index}>
            <Button variant="primary">Back to Interviews</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Legacy Results Ready component (when no attemptId available)
function ResultsReadyLegacy({
  interview,
  sessionSummary,
}: {
  interview: AIInterview;
  sessionSummary: SessionSummary;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href={ROUTES.aiInterview.index}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Interviews</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(sessionSummary.completedAt)}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-lg shadow-green-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">Interview Completed!</h1>
              <p className="text-white/80">{interview.title}</p>
            </div>
          </div>
        </div>

        {/* Session stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Timer}
            label="Duration"
            value={formatDuration(sessionSummary.duration)}
            subtext={`of ${interview.duration} min`}
          />
          <StatCard
            icon={Target}
            label="Stages"
            value={`${sessionSummary.stagesCompleted}/${sessionSummary.totalStages}`}
            subtext="completed"
          />
          <StatCard
            icon={MessageSquare}
            label="Questions"
            value={sessionSummary.questionsAnswered.toString()}
            subtext="answered"
          />
          <StatCard
            icon={TrendingUp}
            label="Focus Areas"
            value={interview.focusAreas.length.toString()}
            subtext="covered"
          />
        </div>

        {/* Feedback coming soon card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
                Detailed Feedback Coming Soon
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  Beta
                </span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;re working on AI-powered feedback that will provide personalized
                scores, improvement suggestions, and detailed analysis of your
                interview performance. Stay tuned!
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={ROUTES.aiInterview.brief(interview.id)} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Interview
            </Button>
          </Link>
          <Link href={ROUTES.aiInterview.index} className="flex-1">
            <Button variant="primary" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Browse Interviews
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

interface ResultsPageState {
  phase: EvaluationPhase;
  interview: AIInterview | null;
  sessionSummary: SessionSummary | null;
  evaluation: FullEvaluation | null;
  transcript: TranscriptItem[] | null;
  error: string | null;
  pollingProgress: number;
  currentPollingStep: number;
}

function InterviewResultsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [state, setState] = useState<ResultsPageState>({
    phase: "call_ended",
    interview: null,
    sessionSummary: null,
    evaluation: null,
    transcript: null,
    error: null,
    pollingProgress: 0,
    currentPollingStep: 0,
  });

  // Fetch full attempt data when evaluation is complete
  const fetchFullAttempt = useCallback(async (attemptId: string) => {
    try {
      const response = await apiClient.get<FullAttemptResponse>(
        API_ROUTES.attempts.detail(attemptId)
      );

      if (response.data.success && response.data.data.attempt.evaluation) {
        const attempt = response.data.data.attempt;
        setState((prev) => ({
          ...prev,
          phase: "evaluated",
          evaluation: attempt.evaluation!,
          transcript: attempt.transcript?.transcript || null,
          pollingProgress: 100,
          sessionSummary: prev.sessionSummary
            ? {
                ...prev.sessionSummary,
                duration: attempt.durationSeconds || prev.sessionSummary.duration,
                completedAt: attempt.completedAt
                  ? new Date(attempt.completedAt)
                  : prev.sessionSummary.completedAt,
              }
            : prev.sessionSummary,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch full attempt:", error);
      setState((prev) => ({
        ...prev,
        phase: "failed",
        error: "Failed to load evaluation results.",
      }));
    }
  }, []);

  // Load interview data
  useEffect(() => {
    const id = params.id as string;
    if (!id) return;

    const fetchData = async () => {
      try {
        const interviewResponse = await apiClient.get<GetInterviewResponse>(
          API_ROUTES.aiInterview.detail(id)
        );

        if (interviewResponse.data.success) {
          const transformed = transformInterview(interviewResponse.data.data.interview);

          // Default session summary (will be updated when full attempt is fetched)
          const sessionSummary: SessionSummary = {
            duration: 0,
            stagesCompleted: transformed.stages.length,
            totalStages: transformed.stages.length,
            questionsAnswered: 0,
            completedAt: new Date(),
          };

          setState((prev) => ({
            ...prev,
            interview: transformed,
            sessionSummary,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch interview:", error);
      }
    };

    fetchData();
  }, [params.id]);

  // Polling effect - only runs when we have an attemptId and are in polling phase
  useEffect(() => {
    if (!attemptId || state.phase !== "polling") return;

    let isCancelled = false;
    const startTime = Date.now();

    const poll = async () => {
      if (isCancelled) return;

      // Check timeout
      if (Date.now() - startTime > MAX_POLLING_DURATION_MS) {
        setState((prev) => ({ ...prev, phase: "timeout" }));
        return;
      }

      try {
        const response = await apiClient.get<AttemptStatusResponse>(
          API_ROUTES.attempts.status(attemptId)
        );

        if (!response.data.success) {
          throw new Error(response.data.msg);
        }

        const { status } = response.data.data;

        if (status === "evaluated") {
          await fetchFullAttempt(attemptId);
        } else if (status === "failed") {
          setState((prev) => ({
            ...prev,
            phase: "failed",
            error: "Evaluation failed",
          }));
        } else {
          // Update progress and continue polling
          const elapsed = Date.now() - startTime;
          const progress = Math.min(95, (elapsed / MAX_POLLING_DURATION_MS) * 100);
          setState((prev) => ({
            ...prev,
            pollingProgress: progress,
            currentPollingStep: Math.floor((elapsed / 10000) % POLLING_STEPS.length),
          }));

          // Schedule next poll
          setTimeout(poll, POLLING_INTERVAL_MS);
        }
      } catch (error) {
        console.error("Polling error:", error);
        // On error, retry unless cancelled
        if (!isCancelled) {
          setTimeout(poll, POLLING_INTERVAL_MS);
        }
      }
    };

    // Start polling
    poll();

    return () => {
      isCancelled = true;
    };
  }, [attemptId, state.phase, fetchFullAttempt]);

  // Handle call ended animation complete
  const handleCallEndedComplete = useCallback(() => {
    // If we have an attemptId, start polling; otherwise use legacy flow
    if (attemptId) {
      setState((prev) => ({ ...prev, phase: "polling" }));
    } else {
      // Legacy flow - just show results without evaluation
      setState((prev) => ({ ...prev, phase: "evaluated" }));
    }
  }, [attemptId]);

  // Handle retry
  const handleRetry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "polling",
      error: null,
      pollingProgress: 0,
      currentPollingStep: 0,
    }));
  }, []);

  // Loading state
  if (!state.interview || !state.sessionSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Render based on phase
  switch (state.phase) {
    case "call_ended":
      return <CallEndedAnimation onComplete={handleCallEndedComplete} />;

    case "polling":
      return (
        <ScoringProgress
          interview={state.interview}
          progress={state.pollingProgress}
          currentStep={state.currentPollingStep}
        />
      );

    case "evaluated":
      // If we have evaluation data, show full results; otherwise show legacy
      if (state.evaluation) {
        return (
          <EvaluationResults
            interview={state.interview}
            evaluation={state.evaluation}
            sessionSummary={state.sessionSummary}
          />
        );
      }
      // Legacy flow - no evaluation data
      return (
        <ResultsReadyLegacy
          interview={state.interview}
          sessionSummary={state.sessionSummary}
        />
      );

    case "failed":
      return <EvaluationFailed onRetry={handleRetry} />;

    case "timeout":
      return <EvaluationTimeout />;

    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
  }
}

export default function InterviewResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InterviewResultsContent />
    </Suspense>
  );
}
