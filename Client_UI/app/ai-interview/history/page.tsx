"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Badge } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { apiClient, API_ROUTES } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { buildLoginUrl } from "@/lib/auth-redirect";
import { Difficulty } from "../types";
import { InterviewAttempt as APIInterviewAttempt, ListAttemptsResponse } from "../utils";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  RotateCcw,
  Eye,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Types for interview attempts
interface InterviewAttempt {
  id: string;
  interviewId: string;
  interviewTitle: string;
  interviewRole: string;
  difficulty: Difficulty;
  score: number;
  completedAt: string;
  duration: number; // in minutes
  attemptNumber: number;
}

interface InterviewHistory {
  interviewId: string;
  interviewTitle: string;
  interviewRole: string;
  difficulty: Difficulty;
  attempts: InterviewAttempt[];
  bestScore: number;
  totalAttempts: number;
  lastAttemptAt: string;
  focusAreas: string[];
}

// Skill coverage type for bubble cloud (TODO: implement skills visualization)
interface SkillCoverage {
  name: string;
  practiceCount: number;
  avgScore: number;
}

// Transform API attempts to grouped InterviewHistory format
function groupAttemptsByInterview(attempts: APIInterviewAttempt[]): InterviewHistory[] {
  const grouped = new Map<string, InterviewHistory>();

  attempts.forEach((attempt) => {
    const interviewId = attempt.interview._id;
    const existing = grouped.get(interviewId);

    const transformedAttempt: InterviewAttempt = {
      id: attempt._id,
      interviewId: attempt.interview._id,
      interviewTitle: attempt.interview.name,
      interviewRole: "Technical Interview",
      difficulty: (attempt.interview.difficulty as Difficulty) || Difficulty.MEDIUM,
      score: attempt.evaluation?.overallScore || 0,
      completedAt: attempt.completedAt || attempt.createdAt,
      duration: attempt.durationSeconds ? Math.round(attempt.durationSeconds / 60) : 0,
      attemptNumber: attempt.attemptNumber,
    };

    if (existing) {
      existing.attempts.push(transformedAttempt);
      existing.totalAttempts = existing.attempts.length;
      existing.bestScore = Math.max(existing.bestScore, transformedAttempt.score);
      if (new Date(transformedAttempt.completedAt) > new Date(existing.lastAttemptAt)) {
        existing.lastAttemptAt = transformedAttempt.completedAt;
      }
    } else {
      grouped.set(interviewId, {
        interviewId,
        interviewTitle: attempt.interview.name,
        interviewRole: "Technical Interview",
        difficulty: (attempt.interview.difficulty as Difficulty) || Difficulty.MEDIUM,
        bestScore: transformedAttempt.score,
        totalAttempts: 1,
        lastAttemptAt: transformedAttempt.completedAt,
        focusAreas: [],
        attempts: [transformedAttempt],
      });
    }
  });

  // Sort attempts within each interview by date (newest first)
  grouped.forEach((history) => {
    history.attempts.sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  });

  // Return sorted by last attempt date (newest first)
  return Array.from(grouped.values()).sort(
    (a, b) => new Date(b.lastAttemptAt).getTime() - new Date(a.lastAttemptAt).getTime()
  );
}

// Difficulty badge config
const difficultyConfig: Record<
  Difficulty,
  { label: string; variant: "success" | "warning" | "error" }
> = {
  [Difficulty.EASY]: { label: "Easy", variant: "success" },
  [Difficulty.MEDIUM]: { label: "Medium", variant: "warning" },
  [Difficulty.HARD]: { label: "Hard", variant: "error" },
};

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Score color helper
function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

// Aggregate skills from interview history
function aggregateSkills(history: InterviewHistory[]): SkillCoverage[] {
  const skillMap = new Map<string, { scores: number[] }>();

  history.forEach((interview) => {
    const avgAttemptScore =
      interview.attempts.reduce((sum, a) => sum + a.score, 0) / interview.attempts.length;

    interview.focusAreas.forEach((skill) => {
      const existing = skillMap.get(skill) || { scores: [] };
      // Add score for each attempt
      for (let i = 0; i < interview.totalAttempts; i++) {
        existing.scores.push(interview.attempts[i]?.score || avgAttemptScore);
      }
      skillMap.set(skill, existing);
    });
  });

  return Array.from(skillMap.entries())
    .map(([name, data]) => ({
      name,
      practiceCount: data.scores.length,
      avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
    }))
    .sort((a, b) => b.practiceCount - a.practiceCount);
}

// Loading skeleton
function HistoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-5 w-32 bg-background-subtle rounded animate-pulse mb-6" />
          <div className="h-8 w-64 bg-background-subtle rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-background-subtle rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-4">
              <div className="h-8 w-16 bg-background-subtle rounded animate-pulse mb-2" />
              <div className="h-4 w-24 bg-background-subtle rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-5">
              <div className="h-6 w-48 bg-background-subtle rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-background-subtle rounded animate-pulse mb-4" />
              <div className="h-4 w-full bg-background-subtle rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
        <Target className="w-10 h-10 text-secondary" />
      </div>
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        No interviews yet
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        Start practicing with our AI interviews to build confidence and improve your skills.
        Your progress will be tracked here.
      </p>
      <Link href={ROUTES.aiInterview.index}>
        <Button variant="primary" size="lg">
          Browse Interviews
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}

// Stats card component
function StatsCard({
  icon: Icon,
  value,
  label,
  trend,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  trend?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        {trend && (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl sm:text-3xl font-bold text-text-primary">{value}</p>
        <p className="text-body-sm text-text-secondary mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// Skills Bubble Cloud component
function SkillsBubbleCloud({ skills }: { skills: SkillCoverage[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  if (skills.length === 0) return null;

  // Calculate bubble sizes based on practice count (min 44px, max 90px)
  const maxPractice = Math.max(...skills.map((s) => s.practiceCount));
  const getBubbleSize = (practiceCount: number) => {
    const minSize = 44;
    const maxSize = 90;
    return minSize + (practiceCount / maxPractice) * (maxSize - minSize);
  };

  // Get color based on score
  const getBubbleColor = (score: number) => {
    if (score >= 80) return { bg: "bg-green-100", border: "border-green-300", text: "text-green-700" };
    if (score >= 70) return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600" };
    if (score >= 60) return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600" };
    return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-500" };
  };

  // Position bubbles in an organic cluster
  const positions = skills.slice(0, 12).map((skill, i) => {
    const angle = (i / Math.min(skills.length, 12)) * 2 * Math.PI;
    const radius = 90 + (i % 3) * 35;
    const size = getBubbleSize(skill.practiceCount);
    return {
      skill,
      size,
      x: 170 + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
      y: 140 + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-border p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-text-primary">Skills Practiced</h3>
        <span className="text-body-xs text-text-tertiary">{skills.length} skills covered</span>
      </div>
      <p className="text-body-sm text-text-secondary mb-4">
        Bigger = more practice. Greener = higher scores.
      </p>

      <div className="relative h-[300px] overflow-hidden">
        {positions.map(({ skill, size, x, y }) => {
          const colors = getBubbleColor(skill.avgScore);
          const isHovered = hoveredSkill === skill.name;

          return (
            <div
              key={skill.name}
              className={`absolute rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${colors.bg} ${colors.border} ${
                isHovered ? "z-20 scale-110 shadow-lg" : "z-10"
              } ${hoveredSkill && !isHovered ? "opacity-40" : "opacity-100"}`}
              style={{
                width: size,
                height: size,
                left: x - size / 2,
                top: y - size / 2,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="text-center px-1">
                <span className={`text-xs font-medium ${colors.text} leading-tight block`}>
                  {skill.name.length > 12 ? skill.name.slice(0, 10) + "..." : skill.name}
                </span>
                {isHovered && (
                  <span className="text-[10px] text-text-tertiary mt-0.5 block">
                    {skill.practiceCount}x • {skill.avgScore}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-border flex-wrap">
        <div className="flex items-center gap-1.5 text-body-xs text-text-tertiary">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300" />
          80%+
        </div>
        <div className="flex items-center gap-1.5 text-body-xs text-text-tertiary">
          <div className="w-3 h-3 rounded-full bg-emerald-50 border border-emerald-200" />
          70-79%
        </div>
        <div className="flex items-center gap-1.5 text-body-xs text-text-tertiary">
          <div className="w-3 h-3 rounded-full bg-amber-50 border border-amber-200" />
          60-69%
        </div>
        <div className="flex items-center gap-1.5 text-body-xs text-text-tertiary">
          <span className="text-[10px]">●</span> Size = practice count
        </div>
      </div>
    </div>
  );
}

// Interview history card component
function InterviewHistoryCard({ history }: { history: InterviewHistory }) {
  const [expanded, setExpanded] = useState(false);
  const difficulty = difficultyConfig[history.difficulty];
  const latestAttempt = history.attempts[0];

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden transition-all hover:border-secondary/40 hover:shadow-sm">
      {/* Main Card Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {history.interviewTitle}
              </h3>
              <Badge variant={difficulty.variant} size="sm">
                {difficulty.label}
              </Badge>
            </div>
            <p className="text-body-sm text-text-secondary">{history.interviewRole}</p>
          </div>

          {/* Best Score */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className={`text-xl font-bold ${getScoreColor(history.bestScore)}`}>
                {history.bestScore}%
              </span>
            </div>
            <p className="text-body-xs text-text-tertiary">Best Score</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mt-4 text-body-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-text-tertiary" />
            <span>{history.totalAttempts} attempt{history.totalAttempts !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-text-tertiary" />
            <span>Last: {formatDate(history.lastAttemptAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <Link href={ROUTES.aiInterview.brief(history.interviewId)} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
          </Link>
          <Link href={ROUTES.aiInterview.results(latestAttempt.id)} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Results
            </Button>
          </Link>
          {history.totalAttempts > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0"
            >
              {expanded ? "Hide" : "All Attempts"}
              <ChevronRight
                className={`w-4 h-4 ml-1 transition-transform ${expanded ? "rotate-90" : ""}`}
              />
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Attempts List */}
      {expanded && history.totalAttempts > 1 && (
        <div className="border-t border-border bg-background-subtle/50">
          <div className="p-4 space-y-2">
            {history.attempts.map((attempt) => (
              <Link
                key={attempt.id}
                href={ROUTES.aiInterview.results(attempt.id)}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-border hover:border-secondary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-body-sm text-text-tertiary">
                    #{attempt.attemptNumber}
                  </span>
                  <span className="text-body-sm text-text-secondary">
                    {formatDate(attempt.completedAt)}
                  </span>
                  <span className="text-body-xs text-text-tertiary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {attempt.duration} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${getScoreColor(attempt.score)}`}>
                    {attempt.score}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-text-tertiary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyInterviewsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [history, setHistory] = useState<InterviewHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push(buildLoginUrl("/ai-interview/history"));
      return;
    }

    // Fetch interview history from API
    const fetchHistory = async () => {
      try {
        const response = await apiClient.get<ListAttemptsResponse>(
          API_ROUTES.attempts.list()
        );

        if (response.data.success) {
          // Transform API response to group by interview
          const attemptsData = response.data.data.data;
          const grouped = groupAttemptsByInterview(attemptsData);
          setHistory(grouped);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
        // Fall back to empty state on error
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, router]);

  if (!user || loading) return <HistoryPageSkeleton />;

  // Calculate aggregate stats
  const totalInterviews = history.length;
  const totalAttempts = history.reduce((sum, h) => sum + h.totalAttempts, 0);

  // TODO: Uncomment when ready to integrate bubble cloud visualization
  // const skills = aggregateSkills(history);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href={ROUTES.aiInterview.index}
          className="inline-flex items-center gap-2 text-body-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interviews
        </Link>

        {/* Header with Encouraging Message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            My Interviews
          </h1>
          {totalInterviews > 0 ? (
            <p className="text-text-secondary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              You&apos;ve completed {totalAttempts} practice session{totalAttempts !== 1 ? "s" : ""}.
              {totalAttempts >= 5 ? " Great progress!" : " Keep practicing!"}
            </p>
          ) : (
            <p className="text-text-secondary">
              Track your interview progress and practice history here.
            </p>
          )}
        </div>

        {totalInterviews === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              <StatsCard
                icon={Target}
                value={totalInterviews}
                label="Interviews Taken"
              />
              <StatsCard
                icon={RotateCcw}
                value={totalAttempts}
                label="Total Attempts"
              />
            </div>

            {/* TODO: Skills Bubble Cloud - uncomment when ready to integrate */}
            {/* <SkillsBubbleCloud skills={skills} /> */}

            {/* Interview History List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Your Practice History
              </h2>
              {history.map((item) => (
                <InterviewHistoryCard key={item.interviewId} history={item} />
              ))}
            </div>

            {/* Browse More CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl border border-secondary/20 text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Ready for more practice?
              </h3>
              <p className="text-body-sm text-text-secondary mb-4">
                Explore more interviews to continue building your skills.
              </p>
              <Link href={ROUTES.aiInterview.index}>
                <Button variant="primary" size="md">
                  Browse More Interviews
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
