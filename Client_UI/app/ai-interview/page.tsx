"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import { Button } from "@/components/atoms";
import { EmptyState } from "@/components/molecules/EmptyState";
import { InterviewCard, InterviewCardSkeleton } from "./components";
import { mockInterviews, filterInterviews, DifficultyFilter } from "./data";
import { Difficulty } from "./types";
import { ROUTES } from "@/lib/routes";
import {
  Search,
  X,
  Mic,
  History,
  Sparkles,
  ChevronDown,
} from "lucide-react";

type SortOption = "popular" | "newest" | "highest_rated";

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: "All", label: "All Levels" },
  { value: Difficulty.EASY, label: "Easy" },
  { value: Difficulty.MEDIUM, label: "Medium" },
  { value: Difficulty.HARD, label: "Hard" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "highest_rated", label: "Highest Rated" },
];

export default function AIInterviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search handler
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setIsLoading(false);
      }, 300),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setIsLoading(true);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  // Filter interviews
  const filteredInterviews = useMemo(() => {
    return filterInterviews(mockInterviews, {
      search: debouncedSearch,
      difficulty,
      sortBy,
    });
  }, [debouncedSearch, difficulty, sortBy]);

  // Available interviews count
  const availableCount = filteredInterviews.filter(
    (i) => i.status === "available"
  ).length;

  // Check if filters are active
  const hasActiveFilters =
    debouncedSearch || difficulty !== "All" || sortBy !== "popular";

  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setDifficulty("All");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
        }}
      />

      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] pointer-events-none opacity-50" />

      {/* Header Section */}
      <header className="relative pt-6 pb-4 sm:pt-10 sm:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-6 h-6 text-secondary" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                  AI Mock Interviews
                </h1>
              </div>
              <p className="text-body-sm sm:text-body-md text-text-secondary max-w-lg">
                Practice with AI interviewers tailored to your target role.
                Real-time feedback to level up your interview skills.
              </p>
            </div>

            <Link href={ROUTES.aiInterview.history}>
              <Button variant="outline" size="md" className="shrink-0">
                <History className="w-4 h-4 mr-2" />
                My Interviews
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search by role, skills, or keywords..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-10 sm:h-11 pl-10 pr-4 rounded-full border border-border bg-white text-body-sm placeholder:text-text-tertiary focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedSearch("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background-subtle rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-text-tertiary" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-2">
              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as DifficultyFilter)
                  }
                  className="h-10 sm:h-11 pl-4 pr-8 rounded-full border border-border bg-white text-body-sm text-text-secondary appearance-none cursor-pointer hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all"
                >
                  {difficultyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative hidden sm:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-10 sm:h-11 pl-4 pr-8 rounded-full border border-border bg-white text-body-sm text-text-secondary appearance-none cursor-pointer hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="h-10 sm:h-11 px-3 rounded-full text-body-sm text-secondary hover:bg-secondary/10 transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-body-sm text-text-secondary">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <span className="font-medium text-text-primary">
                  {availableCount}
                </span>{" "}
                interview{availableCount !== 1 ? "s" : ""} available
                {filteredInterviews.length > availableCount && (
                  <span className="text-text-tertiary">
                    {" "}
                    • {filteredInterviews.length - availableCount} coming soon
                  </span>
                )}
              </>
            )}
          </p>

          {/* Mobile Sort */}
          <div className="relative sm:hidden">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 pl-3 pr-7 rounded-lg border border-border bg-white text-body-xs text-text-secondary appearance-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-tertiary pointer-events-none" />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <InterviewCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredInterviews.length === 0 && (
          <EmptyState
            icon="search"
            title="No interviews found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={{
              label: "Clear all filters",
              onClick: clearFilters,
            }}
          />
        )}

        {/* Interview Grid */}
        {!isLoading && filteredInterviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}

        {/* Promo Banner */}
        {!isLoading && filteredInterviews.length > 0 && (
          <div className="mt-10 sm:mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Want company-specific interviews?
                  </h3>
                  <p className="text-white/80 text-body-sm">
                    Amazon, Google, Meta, and more coming soon. Get notified
                    when they launch.
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="md"
                className="bg-white text-purple-600 hover:bg-white/90 shrink-0"
              >
                Notify Me
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
