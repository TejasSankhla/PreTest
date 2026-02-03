"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { Difficulty } from "../types";
import {
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Home,
  Timer,
  TrendingUp,
  Star,
  ChevronRight,
  Calendar,
  ChevronDown,
  Check,
  AlertTriangle,
  Trophy,
  Rocket,
  Heart,
  Search,
  MoreVertical,
  Download,
  FileText,
  X,
  Play,
  Pause,
  Volume2,
  MessageCircle,
} from "lucide-react";

// ============================================
// MOCK DATA FOR PREVIEW
// ============================================

type ScoreVariant = "excellent" | "good" | "fair" | "needs_work";

const MOCK_DATA: Record<ScoreVariant, { score: number; label: string }> = {
  excellent: { score: 92, label: "Excellent (92)" },
  good: { score: 72, label: "Good (72)" },
  fair: { score: 58, label: "Fair (58)" },
  needs_work: { score: 38, label: "Needs Work (38)" },
};

const MOCK_INTERVIEW = {
  id: "mock-123",
  title: "Frontend Developer Interview",
  role: "Senior Frontend Engineer",
  difficulty: Difficulty.MEDIUM,
  duration: 15,
  focusAreas: ["React", "Problem Solving", "Communication"],
  stages: [],
  description: "Practice technical questions covering React fundamentals, component architecture, state management patterns, and performance optimization techniques commonly asked in frontend engineering interviews.",
  questionsCount: 8,
  tags: ["React", "Frontend", "Technical"],
};

const MOCK_AGENT = {
  name: "Alex",
  role: "Senior AI Interviewer",
  avatar: "/agents/alex-avatar.png", // Placeholder - will use initials fallback
};

interface TranscriptItem {
  role: "agent" | "user";
  message: string;
  time_in_call_secs: number;
}

const MOCK_TRANSCRIPT: TranscriptItem[] = [
  { role: "agent", message: "Hi! I'm Alex, and I'll be conducting your frontend developer interview today. Before we dive in, could you tell me a bit about yourself and your experience with React?", time_in_call_secs: 5 },
  { role: "user", message: "Sure! I've been working with React for about 3 years now. I started at a startup where I built their entire customer dashboard from scratch, and more recently I've been working on a large-scale e-commerce platform.", time_in_call_secs: 25 },
  { role: "agent", message: "That's great experience! Let's start with a technical question. Can you explain how the Virtual DOM works in React and why it's beneficial for performance?", time_in_call_secs: 45 },
  { role: "user", message: "The Virtual DOM is essentially a lightweight JavaScript representation of the actual DOM. When state changes in a React component, React first updates this virtual representation, then compares it with the previous version using a diffing algorithm, and finally only updates the parts of the real DOM that actually changed. This is beneficial because direct DOM manipulation is expensive, and by batching these updates and minimizing actual DOM changes, React can significantly improve performance.", time_in_call_secs: 85 },
  { role: "agent", message: "Excellent explanation! Now, let's talk about state management. What's your approach when deciding between using local component state versus a global state management solution?", time_in_call_secs: 105 },
  { role: "user", message: "I generally follow the principle of keeping state as close to where it's used as possible. For UI state that only affects a single component, I use useState. For state that needs to be shared between a few closely related components, I lift it up to a common parent. I only reach for global state management like Redux or Zustand when the state truly needs to be accessed across many unrelated parts of the application, or when I need features like time-travel debugging.", time_in_call_secs: 145 },
  { role: "agent", message: "That's a solid approach. Can you tell me about a challenging bug you encountered in a React application and how you debugged it?", time_in_call_secs: 165 },
  { role: "user", message: "One tricky bug I encountered was an infinite re-render loop. A useEffect was updating state that was also in its dependency array, causing a cascade. I used the React DevTools profiler to identify the component causing excessive renders, added console logs to trace the state changes, and eventually realized I needed to restructure the logic to separate the read and write operations into different effects.", time_in_call_secs: 210 },
];

const MOCK_EVALUATION = {
  overallFeedback:
    "You demonstrated solid problem-solving skills and communicated your thought process clearly throughout the interview. Your technical knowledge of React and state management is evident, and you provided relevant examples from your experience.\n\nHowever, there are areas for improvement. When discussing project impact, try to quantify results with specific metrics. Additionally, consider asking more clarifying questions before diving into solutions.",
  rubricScores: [
    {
      rubricId: "1",
      rubricName: "Communication",
      score: 78,
      strengths: [
        { point: "Clear articulation of technical concepts", evidence: "At 2:34 - 'The virtual DOM works by...'" },
        { point: "Good use of STAR method for behavioral questions" },
      ],
      feedbacks: [
        { point: "Quantify impact with specific numbers", evidence: "At 3:45 - Could include metrics" },
        { point: "Reduce filler words ('um', 'like')" },
      ],
    },
    {
      rubricId: "2",
      rubricName: "Problem Solving",
      score: 65,
      strengths: [
        { point: "Logical breakdown of complex problems" },
      ],
      feedbacks: [
        { point: "Ask clarifying questions before solving" },
        { point: "Consider multiple approaches before committing" },
      ],
    },
  ],
};

const MOCK_SESSION = {
  duration: 620,
  stagesCompleted: 4,
  totalStages: 5,
  questionsAnswered: 8,
  completedAt: new Date(),
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Parse timestamp from evidence text (e.g., "At 2:34 - ..." returns 154 seconds)
function parseTimestampFromEvidence(evidence: string): number | null {
  const match = evidence.match(/At\s+(\d+):(\d{2})/i);
  if (match) {
    const mins = parseInt(match[1], 10);
    const secs = parseInt(match[2], 10);
    return mins * 60 + secs;
  }
  return null;
}

// Get score benchmark text based on score
function getScoreBenchmark(score: number): string {
  if (score < 40) {
    return "Average first attempt: 35 • You're right on track";
  }
  if (score < 60) {
    return "You're above the average first attempt (35)";
  }
  if (score < 80) {
    return "Great progress! Top 30% of first attempts";
  }
  return "Exceptional! Top 10% of all attempts";
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

function getScoreColor(score: number) {
  if (score >= 80) return { text: "text-green-600", ring: "stroke-green-500", label: "Excellent" };
  if (score >= 70) return { text: "text-green-600", ring: "stroke-green-500", label: "Good" };
  if (score >= 60) return { text: "text-yellow-600", ring: "stroke-yellow-500", label: "Fair" };
  return { text: "text-red-600", ring: "stroke-red-500", label: "Needs Work" };
}

function getScoreBanner(score: number) {
  if (score >= 80) {
    return {
      gradient: "bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500",
      shadow: "shadow-lg shadow-amber-500/25",
      icon: Trophy,
      title: "Outstanding Performance!",
      subtitle: "You crushed it! This is interview-ready material.",
    };
  }
  if (score >= 70) {
    return {
      gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
      shadow: "shadow-lg shadow-green-500/20",
      icon: Rocket,
      title: "Great Job!",
      subtitle: "Solid performance with room to grow even stronger.",
    };
  }
  if (score >= 60) {
    return {
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
      shadow: "shadow-lg shadow-blue-500/20",
      icon: CheckCircle2,
      title: "Interview Completed",
      subtitle: "Good effort! Review the feedback to level up.",
    };
  }
  return {
    gradient: "bg-gradient-to-r from-slate-600 to-slate-700",
    shadow: "shadow-lg shadow-slate-500/20",
    icon: Heart,
    title: "Practice Makes Perfect",
    subtitle: "Every expert was once a beginner. Keep going!",
  };
}

const difficultyConfig: Record<Difficulty, { label: string; variant: "success" | "warning" | "error" }> = {
  [Difficulty.EASY]: { label: "Easy", variant: "success" },
  [Difficulty.MEDIUM]: { label: "Medium", variant: "warning" },
  [Difficulty.HARD]: { label: "Hard", variant: "error" },
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Highlighted text for search
function HighlightedText({ text, searchQuery }: { text: string; searchQuery: string }) {
  if (!searchQuery.trim()) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-200 text-gray-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ============================================
// UI COMPONENTS
// ============================================

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
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
        <span className="text-xs text-gray-400">/100</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext }: { icon: React.ElementType; label: string; value: string; subtext?: string }) {
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

function FeedbackItemDisplay({
  item,
  onTimestampClick
}: {
  item: { point: string; evidence?: string };
  onTimestampClick?: (timeInSeconds: number) => void;
}) {
  // Parse and render evidence with clickable timestamp
  const renderEvidence = (evidence: string) => {
    const timestampMatch = evidence.match(/^(At\s+\d+:\d{2})\s*-\s*/i);
    if (timestampMatch && onTimestampClick) {
      const timestamp = timestampMatch[1];
      const restOfText = evidence.slice(timestampMatch[0].length);
      const timeInSeconds = parseTimestampFromEvidence(evidence);

      return (
        <>
          <button
            onClick={() => timeInSeconds !== null && onTimestampClick(timeInSeconds)}
            className="text-blue-600 hover:text-blue-700 font-medium not-italic hover:underline"
          >
            {timestamp}
          </button>
          <span> - {restOfText}</span>
        </>
      );
    }
    return evidence;
  };

  return (
    <li className="flex gap-3">
      <span className="text-gray-400 mt-1.5 flex-shrink-0">•</span>
      <div className="flex-1">
        <p className="text-sm text-gray-700 leading-relaxed">{item.point}</p>
        {item.evidence && (
          <p className="text-xs text-gray-500 mt-1.5 pl-3 border-l-2 border-gray-200 italic">
            {renderEvidence(item.evidence)}
          </p>
        )}
      </div>
    </li>
  );
}

function RubricAccordion({
  rubric,
  defaultOpen = false,
  onTimestampClick
}: {
  rubric: typeof MOCK_EVALUATION.rubricScores[0];
  defaultOpen?: boolean;
  onTimestampClick?: (timeInSeconds: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colors = getScoreColor(rubric.score);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-base font-medium text-gray-900">{rubric.rubricName}</span>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-md ${colors.text} ${rubric.score >= 70 ? "bg-green-100" : rubric.score >= 60 ? "bg-yellow-100" : "bg-red-100"}`}>
            {rubric.score}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200">
          {/* Strengths Section */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-green-700">Strengths</h4>
            </div>
            {rubric.strengths.length > 0 ? (
              <ul className="space-y-3">
                {rubric.strengths.map((item, idx) => (
                  <FeedbackItemDisplay key={idx} item={item} onTimestampClick={onTimestampClick} />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No specific strengths noted</p>
            )}
          </div>

          {/* Areas to Improve Section */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
              </div>
              <h4 className="text-sm font-medium text-yellow-700">Areas to Improve</h4>
            </div>
            {rubric.feedbacks.length > 0 ? (
              <ul className="space-y-3">
                {rubric.feedbacks.map((item, idx) => (
                  <FeedbackItemDisplay key={idx} item={item} onTimestampClick={onTimestampClick} />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No specific areas for improvement noted</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// CHAT TRANSCRIPT COMPONENT
// ============================================

function ChatTranscript({
  transcript,
  searchQuery,
  highlightedTime,
  messageRefs,
}: {
  transcript: TranscriptItem[];
  searchQuery?: string;
  highlightedTime?: number | null;
  messageRefs?: React.MutableRefObject<Map<number, HTMLDivElement>>;
}) {
  const query = searchQuery?.trim().toLowerCase() || "";
  const filteredTranscript = query
    ? transcript.filter((item) => item.message.toLowerCase().includes(query))
    : transcript;

  if (query && filteredTranscript.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="w-10 h-10 text-gray-300 mb-3" />
        <p className="text-sm text-gray-500">No messages found</p>
        <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
      </div>
    );
  }

  // Find closest message to highlighted time
  const getClosestMessageIndex = () => {
    if (highlightedTime === null || highlightedTime === undefined) return -1;
    let closestIdx = -1;
    let closestDiff = Infinity;
    transcript.forEach((item, idx) => {
      const diff = Math.abs(item.time_in_call_secs - highlightedTime);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  };

  const highlightedIdx = getClosestMessageIndex();

  return (
    <div className="space-y-3">
      {filteredTranscript.map((item, idx) => {
        const isUser = item.role === "user";
        const originalIdx = transcript.indexOf(item);
        const isHighlighted = originalIdx === highlightedIdx;

        return (
          <div
            key={idx}
            ref={(el) => {
              if (el && messageRefs?.current) {
                messageRefs.current.set(originalIdx, el);
              }
            }}
            className={`flex ${isUser ? "justify-end" : "justify-start"} transition-all duration-300 ${
              isHighlighted ? "scale-[1.02]" : ""
            }`}
          >
            <div
              className={`max-w-[85%] ${
                isUser
                  ? isHighlighted
                    ? "bg-amber-100 border-2 border-amber-400 rounded-2xl rounded-br-md ring-2 ring-amber-200"
                    : "bg-amber-50 border border-amber-100 rounded-2xl rounded-br-md"
                  : isHighlighted
                    ? "bg-blue-100 border-2 border-blue-400 text-gray-900 rounded-2xl rounded-bl-md ring-2 ring-blue-200"
                    : "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md"
              } px-4 py-3 transition-all duration-300`}
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className={`text-xs font-medium ${isUser ? "text-amber-700" : "text-blue-600"}`}>
                  {isUser ? "You" : "Alex"}
                </span>
                <span className={`text-xs ${isHighlighted ? "text-blue-600 font-semibold" : "text-gray-400"}`}>
                  {formatTime(item.time_in_call_secs)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {searchQuery ? (
                  <HighlightedText text={item.message} searchQuery={searchQuery} />
                ) : (
                  item.message
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// INTERVIEW DETAILS CARD (New Design)
// ============================================

function InterviewDetailsCard({
  interview,
  agent,
  score,
  session,
}: {
  interview: typeof MOCK_INTERVIEW;
  agent: typeof MOCK_AGENT;
  score: number;
  session: typeof MOCK_SESSION;
}) {
  const colors = getScoreColor(score);
  const difficulty = difficultyConfig[interview.difficulty];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      {/* Section Header */}
      <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Interview Details
        </h2>
      </div>

      {/* Interview Info Section */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {interview.title}
            </h1>
            <p className="text-sm text-gray-500 mb-3">{interview.role}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={difficulty.variant} size="sm">
                {difficulty.label}
              </Badge>
              {interview.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4" />
              <span>{formatDuration(session.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(session.completedAt).split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent + Score Section */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Agent Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
              {agent.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Interviewed by</p>
              <p className="text-base font-semibold text-gray-900">{agent.name}</p>
              <p className="text-sm text-gray-500">{agent.role}</p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`text-sm font-medium ${colors.text}`}>
                {colors.label} Performance
              </p>
            </div>
            <ScoreRing score={score} size={72} />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-6 py-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          {interview.description}
        </p>
      </div>
    </div>
  );
}

// ============================================
// TRANSCRIPT SIDEBAR COMPONENT
// ============================================

function TranscriptSidebar({
  transcript,
  audioUrl,
  duration,
  highlightedTime,
  onHighlightClear,
}: {
  transcript: TranscriptItem[];
  audioUrl: string;
  duration: number;
  highlightedTime?: number | null;
  onHighlightClear?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to highlighted message when it changes
  useEffect(() => {
    if (highlightedTime !== null && highlightedTime !== undefined) {
      // Find closest message
      let closestIdx = -1;
      let closestDiff = Infinity;
      transcript.forEach((item, idx) => {
        const diff = Math.abs(item.time_in_call_secs - highlightedTime);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        const el = messageRefs.current.get(closestIdx);
        if (el && scrollContainerRef.current) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      // Clear highlight after 3 seconds
      const timer = setTimeout(() => {
        onHighlightClear?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [highlightedTime, transcript, onHighlightClear]);

  const handleDownloadTranscript = () => {
    const content = transcript
      .map((item) => `[${formatTime(item.time_in_call_secs)}] ${item.role === "agent" ? "Alex" : "You"}: ${item.message}`)
      .join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleDownloadAudio = () => {
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "interview-recording.mp3";
    a.click();
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)] sticky top-24">
      {/* Header with search and menu */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Transcript</h3>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                  <button
                    onClick={handleDownloadTranscript}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Download Transcript
                  </button>
                  <button
                    onClick={handleDownloadAudio}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Audio
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Transcript - Scrollable */}
      <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4">
        <ChatTranscript
          transcript={transcript}
          searchQuery={searchQuery}
          highlightedTime={highlightedTime}
          messageRefs={messageRefs}
        />
      </div>

      {/* Audio Player - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <Volume2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PREVIEW PAGE
// ============================================

// ============================================
// MOBILE TRANSCRIPT MODAL
// ============================================

function MobileTranscriptModal({
  isOpen,
  onClose,
  transcript,
  duration,
}: {
  isOpen: boolean;
  onClose: () => void;
  transcript: TranscriptItem[];
  duration: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);

  if (!isOpen) return null;

  const handleDownloadTranscript = () => {
    const content = transcript
      .map((item) => `[${formatTime(item.time_in_call_secs)}] ${item.role === "agent" ? "Alex" : "You"}: ${item.message}`)
      .join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Transcript</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTranscript}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcript..."
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Transcript content */}
        <div className="flex-1 overflow-y-auto p-4">
          <ChatTranscript transcript={transcript} searchQuery={searchQuery} />
        </div>

        {/* Audio Player */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div className="flex-1">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <Volume2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PREVIEW PAGE
// ============================================

export default function ResultsPreviewPage() {
  const [selectedVariant, setSelectedVariant] = useState<ScoreVariant>("good");
  const [highlightedTime, setHighlightedTime] = useState<number | null>(null);
  const [showMobileTranscript, setShowMobileTranscript] = useState(false);
  const score = MOCK_DATA[selectedVariant].score;

  const handleTimestampClick = (timeInSeconds: number) => {
    setHighlightedTime(timeInSeconds);
    // On mobile, open the transcript modal
    if (window.innerWidth < 1024) {
      setShowMobileTranscript(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with variant selector */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={ROUTES.aiInterview.index}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Interviews</span>
          </Link>

          {/* Variant Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Preview:</span>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as ScoreVariant)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {Object.entries(MOCK_DATA).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Interview Details Card (New Design) */}
            <InterviewDetailsCard
              interview={MOCK_INTERVIEW}
              agent={MOCK_AGENT}
              score={score}
              session={MOCK_SESSION}
            />

            {/* Score Benchmark - Data-driven encouragement */}
            <div className="mb-6 -mt-4 px-1">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                {getScoreBenchmark(score)}
              </p>
            </div>

            {/* Overall Feedback */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <header className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Overall Feedback</h2>
              </header>
              <div className="px-6 py-6">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{MOCK_EVALUATION.overallFeedback}</p>
              </div>
            </section>

            {/* Rubric Breakdown */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Breakdown</h2>
              <div className="space-y-4">
                {MOCK_EVALUATION.rubricScores.map((rubric, idx) => (
                  <RubricAccordion
                    key={rubric.rubricId}
                    rubric={rubric}
                    defaultOpen={idx === 0}
                    onTimestampClick={handleTimestampClick}
                  />
                ))}
              </div>
            </div>

            {/* What's next section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                What&apos;s Next?
              </h3>
              <div className="space-y-3">
                <Link
                  href={ROUTES.aiInterview.brief(MOCK_INTERVIEW.id)}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Practice Again</p>
                      <p className="text-gray-500 text-sm">Retake this interview to improve</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </Link>

                <Link
                  href={ROUTES.aiInterview.index}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Home className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Explore More</p>
                      <p className="text-gray-500 text-sm">Try different interview types</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </Link>

                {/* Mobile: View Transcript button */}
                <button
                  onClick={() => setShowMobileTranscript(true)}
                  className="lg:hidden flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer group w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 font-medium">View Transcript</p>
                      <p className="text-gray-500 text-sm">Review your conversation</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>
          </main>

          {/* Transcript Sidebar (Desktop only) */}
          <aside className="hidden lg:block w-[380px] flex-shrink-0">
            <TranscriptSidebar
              transcript={MOCK_TRANSCRIPT}
              audioUrl="/mock-audio.mp3"
              duration={MOCK_SESSION.duration}
              highlightedTime={highlightedTime}
              onHighlightClear={() => setHighlightedTime(null)}
            />
          </aside>
        </div>
      </div>

      {/* Mobile Transcript Modal */}
      <MobileTranscriptModal
        isOpen={showMobileTranscript}
        onClose={() => setShowMobileTranscript(false)}
        transcript={MOCK_TRANSCRIPT}
        duration={MOCK_SESSION.duration}
      />
    </div>
  );
}
