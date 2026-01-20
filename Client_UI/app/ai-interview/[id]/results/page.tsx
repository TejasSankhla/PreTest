"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { getInterviewById } from "../../data";
import { AIInterview } from "../../types";
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
  User,
} from "lucide-react";

// Mock session data - this would come from the actual session
interface SessionSummary {
  duration: number; // in seconds
  stagesCompleted: number;
  totalStages: number;
  questionsAnswered: number;
  completedAt: Date;
}

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

// Progress ring component
function ProgressRing({
  progress,
  size = 120,
}: {
  progress: number;
  size?: number;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-green-500 transition-all duration-1000 ease-out"
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900">{progress}%</span>
          <p className="text-xs text-gray-400">Complete</p>
        </div>
      </div>
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
        {/* Animated checkmark */}
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

// Scoring in progress component
function ScoringProgress({ interview }: { interview: AIInterview }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Transcribing responses...",
    "Analyzing communication skills...",
    "Evaluating technical knowledge...",
    "Generating personalized feedback...",
  ];

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 3;
      });
    }, 200);

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
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

        {/* Progress bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 text-sm font-medium">Processing</span>
            <span className="text-blue-600 text-sm font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {steps[currentStep]}
          </p>
        </div>

        {/* What&apos;s being analyzed */}
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

        {/* Estimated time */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-6">
          <Clock className="w-4 h-4" />
          <span>Results ready in ~30 seconds</span>
        </div>
      </div>
    </div>
  );
}

// Results ready component
function ResultsReady({
  interview,
  sessionSummary,
}: {
  interview: AIInterview;
  sessionSummary: SessionSummary;
}) {
  const completionPercentage = Math.round(
    (sessionSummary.stagesCompleted / sessionSummary.totalStages) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <ProgressRing progress={completionPercentage} size={80} />
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

        {/* Interview details card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 font-semibold text-lg mb-1">
                  {interview.title}
                </h2>
                <p className="text-gray-500 text-sm">{interview.role}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  interview.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : interview.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {interview.difficulty}
              </span>
            </div>
          </div>

          {/* Stages completed */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-gray-900 font-medium mb-4">
              Stages Completed
            </h3>
            <div className="flex flex-wrap gap-2">
              {interview.stages.map((stage, index) => (
                <div
                  key={stage}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    index < sessionSummary.stagesCompleted
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      index < sessionSummary.stagesCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < sessionSummary.stagesCompleted ? "✓" : index + 1}
                  </div>
                  {stage}
                </div>
              ))}
            </div>
          </div>

          {/* Focus areas */}
          <div className="p-6">
            <h3 className="text-gray-900 font-medium mb-4">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {interview.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
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

        {/* What&apos;s next section */}
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

export default function InterviewResultsPage() {
  const params = useParams();
  const [interview, setInterview] = useState<AIInterview | null>(null);
  const [showCallEnded, setShowCallEnded] = useState(true);
  const [isScoring, setIsScoring] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock session summary - in real app, this would come from the session
  const [sessionSummary] = useState<SessionSummary>({
    duration: 847, // 14:07
    stagesCompleted: 4,
    totalStages: 5,
    questionsAnswered: 12,
    completedAt: new Date(),
  });

  // Load interview data
  useEffect(() => {
    const id = params.id as string;
    const data = getInterviewById(id);
    setInterview(data || null);
  }, [params.id]);

  // Handle animation sequence
  const handleCallEndedComplete = () => {
    setShowCallEnded(false);
    setIsScoring(true);

    // After scoring animation, show results
    setTimeout(() => {
      setIsScoring(false);
      setShowResults(true);
    }, 4000);
  };

  if (!interview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show call ended animation first
  if (showCallEnded) {
    return <CallEndedAnimation onComplete={handleCallEndedComplete} />;
  }

  // Show scoring progress
  if (isScoring) {
    return <ScoringProgress interview={interview} />;
  }

  // Show final results
  if (showResults) {
    return (
      <ResultsReady interview={interview} sessionSummary={sessionSummary} />
    );
  }

  // Fallback loading
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
