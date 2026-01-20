"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { AIInterview, Difficulty } from "../../types";
import { getInterviewById } from "../../data";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  BarChart3,
  Mic,
  Sparkles,
  Info,
  ListOrdered,
  MessageSquare,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Difficulty badge config
const difficultyConfig: Record<
  Difficulty,
  { label: string; variant: "success" | "warning" | "error" }
> = {
  [Difficulty.EASY]: { label: "Easy", variant: "success" },
  [Difficulty.MEDIUM]: { label: "Medium", variant: "warning" },
  [Difficulty.HARD]: { label: "Hard", variant: "error" },
};

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
  const [interview, setInterview] = useState<AIInterview | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTips, setShowTips] = useState(false);

  // Fetch interview data
  useEffect(() => {
    const id = params.id as string;
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      const data = getInterviewById(id);
      setInterview(data || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [params.id]);

  const handleStartInterview = () => {
    router.push(ROUTES.aiInterview.session(params.id as string));
  };

  if (loading) return <BriefPageSkeleton />;
  if (!interview) return <NotFoundState />;

  const difficulty = difficultyConfig[interview.difficulty as Difficulty];

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
              Alex
            </h3>
            <p className="text-body-sm text-text-secondary mb-2">
              Senior Technical Interviewer
            </p>
            <p className="text-body-xs text-text-tertiary italic mb-4">
              &quot;Professional, supportive, thorough&quot;
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
                  Speak naturally with Alex using your microphone
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
            Start Interview
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
            Start Interview
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
