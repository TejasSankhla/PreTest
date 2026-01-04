"use client";
import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import ProfileCard from "@/components/ui/mentor/profileCard";
import { Button, Skeleton, SkeletonButton } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { Search, X, ChevronDown, Loader2, SlidersHorizontal } from "lucide-react";
import { getMockRating, getMockSessionCount } from "@/lib/utils";
import { apiClient, API_ROUTES, Mentor, ApiResponse } from "@/lib/api";
import debounce from "lodash.debounce";

const MENTORS_PER_PAGE = 8;

// Skeleton loader component for mentor cards
function MentorCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-border/80 overflow-hidden shadow-sm shadow-orange-100/50">
      <div className="p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-5">
          {/* Avatar skeleton */}
          <div className="flex-shrink-0">
            <Skeleton shape="circle" className="h-16 w-16 sm:h-24 sm:w-24" />
          </div>
          {/* Content skeleton */}
          <div className="flex-1 space-y-2 sm:space-y-3">
            <Skeleton className="h-6 sm:h-7 w-3/4" />
            <Skeleton shape="text" className="w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 sm:h-5 w-full" />
              <Skeleton shape="text" className="w-2/3" />
            </div>
          </div>
        </div>
      </div>
      {/* Footer skeleton */}
      <div className="border-t border-border bg-background-subtle px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-5 h-5" />
        </div>
        <SkeletonButton size="sm" rounded="full" />
      </div>
    </div>
  );
}

// Filter Pill Component with micro-interactions
function FilterPill({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-2 text-body-sm font-medium rounded-full border transition-all duration-150 hover:scale-105 active:scale-95 ${
        isSelected
          ? "bg-secondary text-white border-secondary hover:bg-secondary-dark shadow-sm"
          : "bg-white text-text-secondary border-border hover:border-secondary/50 hover:text-text-primary hover:shadow-sm"
      }`}
    >
      {label}
      {isSelected && <X className="w-3 h-3" />}
    </button>
  );
}

function SearchMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "sessions" | "name">("rating");
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MENTORS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch mentors on component mount
  useEffect(() => {
    async function fetchMentors() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get<ApiResponse<Mentor[]>>(API_ROUTES.mentor.list());
        if (response.status === 200) {
          setMentors(response.data.data);
        }
      } catch (err) {
        setError("Failed to load mentors. Please try again.");
        console.error("Error fetching mentors:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMentors();
  }, []);

  // Extract unique colleges and companies
  const allColleges = useMemo(() => {
    return mentors
      .map((m) => m.college)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [mentors]);

  const allCompanies = useMemo(() => {
    return mentors
      .map((m) => m.currentCompany)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [mentors]);

  const displayedColleges = showAllColleges ? allColleges : allColleges.slice(0, 5);
  const displayedCompanies = showAllCompanies ? allCompanies : allCompanies.slice(0, 5);
  const remainingColleges = allColleges.length - 5;
  const remainingCompanies = allCompanies.length - 5;

  const activeFilterCount = selectedColleges.length + selectedCompanies.length;

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    let result = mentors;

    // Apply search filter
    if (searchInput) {
      result = result.filter((mentor) => {
        const searchLower = searchInput.toLowerCase();
        return (
          mentor.name?.toLowerCase().includes(searchLower) ||
          mentor.college?.toLowerCase().includes(searchLower) ||
          mentor.currentCompany?.toLowerCase().includes(searchLower) ||
          mentor.role?.toLowerCase().includes(searchLower) ||
          mentor.branch?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply college filter
    if (selectedColleges.length > 0) {
      result = result.filter((mentor) =>
        selectedColleges.includes(mentor.college)
      );
    }

    // Apply company filter
    if (selectedCompanies.length > 0) {
      result = result.filter((mentor) =>
        mentor.currentCompany && selectedCompanies.includes(mentor.currentCompany)
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        const ratingA = getMockRating(a._id);
        const ratingB = getMockRating(b._id);
        return ratingB - ratingA;
      } else if (sortBy === "sessions") {
        const sessionsA = getMockSessionCount(a._id);
        const sessionsB = getMockSessionCount(b._id);
        return sessionsB - sessionsA;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [searchInput, selectedColleges, selectedCompanies, sortBy, mentors]);

  // Debounced search update
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchInput(value);
      setIsSearching(false);
    }, 300),
    []
  );

  // Cleanup debounce on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  // Input change handler with loading state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    debouncedSetSearch(e.target.value);
  };

  // Toggle filter selection
  const toggleCollege = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college)
        ? prev.filter((c) => c !== college)
        : [...prev, college]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const clearAllFilters = () => {
    setSelectedColleges([]);
    setSelectedCompanies([]);
    setSearchInput("");
    setVisibleCount(MENTORS_PER_PAGE);
    // Clear the actual input element
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  // Load more mentors with simulated delay for smooth UX
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Small delay to show loading state
    setTimeout(() => {
      setVisibleCount((prev) => prev + MENTORS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  };

  // Reset visible count when filters change
  const resetPagination = useCallback(() => {
    setVisibleCount(MENTORS_PER_PAGE);
  }, []);

  // Visible mentors (paginated)
  const visibleMentors = useMemo(() => {
    return filteredMentors.slice(0, visibleCount);
  }, [filteredMentors, visibleCount]);

  const hasMoreMentors = visibleCount < filteredMentors.length;

  const hasActiveFilters = selectedColleges.length > 0 || selectedCompanies.length > 0 || searchInput;

  // Filter content component (used in both mobile drawer and desktop)
  const FilterContent = () => (
    <div className="flex flex-wrap items-center gap-2">
      {/* College Filters */}
      {displayedColleges.length > 0 && (
        <span className="text-body-xs text-text-tertiary font-medium uppercase tracking-wide mr-1 hidden sm:inline">
          College:
        </span>
      )}
      {displayedColleges.map((college) => college && (
        <FilterPill
          key={college}
          label={college}
          isSelected={selectedColleges.includes(college)}
          onClick={() => {
            toggleCollege(college);
            resetPagination();
          }}
        />
      ))}
      {remainingColleges > 0 && !showAllColleges && (
        <button
          onClick={() => setShowAllColleges(true)}
          className="text-body-sm text-secondary hover:text-secondary-dark transition-colors px-2 py-1.5 font-medium"
        >
          +{remainingColleges} more
        </button>
      )}
      {showAllColleges && allColleges.length > 5 && (
        <button
          onClick={() => setShowAllColleges(false)}
          className="text-body-sm text-secondary hover:text-secondary-dark transition-colors px-2 py-1.5"
        >
          Show less
        </button>
      )}

      {/* Divider if both exist */}
      {displayedColleges.length > 0 && displayedCompanies.length > 0 && (
        <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
      )}

      {/* Company Filters */}
      {displayedCompanies.length > 0 && (
        <span className="text-body-xs text-text-tertiary font-medium uppercase tracking-wide mr-1 hidden sm:inline">
          Company:
        </span>
      )}
      {displayedCompanies.map((company) => company && (
        <FilterPill
          key={company}
          label={company}
          isSelected={selectedCompanies.includes(company)}
          onClick={() => {
            toggleCompany(company);
            resetPagination();
          }}
        />
      ))}
      {remainingCompanies > 0 && !showAllCompanies && (
        <button
          onClick={() => setShowAllCompanies(true)}
          className="text-body-sm text-secondary hover:text-secondary-dark transition-colors px-2 py-1.5 font-medium"
        >
          +{remainingCompanies} more
        </button>
      )}
      {showAllCompanies && allCompanies.length > 5 && (
        <button
          onClick={() => setShowAllCompanies(false)}
          className="text-body-sm text-secondary hover:text-secondary-dark transition-colors px-2 py-1.5"
        >
          Show less
        </button>
      )}

      {/* Clear All */}
      {hasActiveFilters && (
        <>
          <div className="w-px h-5 bg-border mx-1" />
          <button
            onClick={clearAllFilters}
            className="text-body-sm text-error hover:text-red-600 transition-colors px-2 py-1.5 font-medium"
          >
            Clear all
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid Pattern Background - Matching Landing Page */}
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

      {/* Orange Gradient Glow - Top Center (Matching Landing) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] pointer-events-none opacity-50" />

      {/* Page Header - Transparent to blend with page gradient */}
      <header className="relative pt-6 pb-4 sm:pt-10 sm:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-1 sm:mb-2">
            Find your mentor
          </h1>
          <p className="text-body-sm sm:text-body-md text-text-secondary max-w-lg">
            Practice with engineers from Google, Amazon, Microsoft, and more
          </p>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {/* Search + Sort + Filter Toggle Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                ref={searchInputRef}
                type="text"
                id="mentor-search"
                onChange={handleInputChange}
                className="w-full text-text-primary text-body-sm rounded-full border border-border bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 pl-9 sm:pl-11 pr-4 h-10 sm:h-11 transition-all placeholder:text-text-tertiary"
                placeholder="Search mentors..."
              />
              <label htmlFor="mentor-search" className="sr-only">
                Search mentors
              </label>
            </div>

            {/* Sort Dropdown */}
            <div className="relative hidden sm:block">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none bg-white text-text-primary text-body-sm rounded-full pl-4 pr-9 h-11 border border-border focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer hover:border-text-tertiary transition-all"
              >
                <option value="rating">Top Rated</option>
                <option value="sessions">Most Sessions</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 h-10 rounded-full border border-border bg-white text-text-secondary hover:border-secondary/50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Sort (visible on mobile only) */}
          <div className="mt-3 sm:hidden">
            <select
              id="sort-mobile"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full appearance-none bg-white text-text-primary text-body-sm rounded-full pl-4 pr-9 h-10 border border-border focus:outline-none focus:border-secondary cursor-pointer"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="sessions">Sort: Most Sessions</option>
              <option value="name">Sort: Name A-Z</option>
            </select>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-body-sm font-semibold text-text-primary">Filters</span>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-text-tertiary hover:text-text-primary p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterContent />
            </div>
          )}

          {/* Desktop Filter Pills Row (hidden on mobile) */}
          <div className="hidden sm:block mt-3">
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Results Count */}
        <p className="text-body-sm text-text-secondary mb-4 sm:mb-6">
          {isLoading
            ? "Loading mentors..."
            : filteredMentors.length === 0
              ? "No mentors found"
              : `${filteredMentors.length} mentor${filteredMentors.length !== 1 ? "s" : ""} ready to help`}
        </p>

        {/* Mentor Cards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {isLoading || isSearching ? (
            /* Loading State - Show skeletons */
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <MentorCardSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            /* Error State */
            <div className="col-span-full">
              <EmptyState
                icon="search"
                title="Something went wrong"
                description={error}
                action={{
                  label: "Try again",
                  onClick: () => window.location.reload(),
                }}
              />
            </div>
          ) : visibleMentors.length > 0 ? (
            visibleMentors.map((mentor) => (
              <div
                key={mentor._id}
                className="transform transition-all duration-200 hover:-translate-y-1 rounded-2xl"
              >
                <ProfileCard mentor={mentor} />
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full">
              <EmptyState
                icon="search"
                title="No mentors found"
                description="We couldn't find any mentors matching your criteria. Try adjusting your filters or search terms."
                action={{
                  label: "Clear all filters",
                  onClick: clearAllFilters,
                }}
              />
            </div>
          )}
        </section>

        {/* Load More Button */}
        {hasMoreMentors && !isLoading && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <Button
              variant="primary"
              size="lg"
              rounded="full"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="min-w-[180px] sm:min-w-[200px]"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Mentors
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* End of Results */}
        {!hasMoreMentors && visibleMentors.length > 0 && filteredMentors.length > MENTORS_PER_PAGE && (
          <p className="text-center text-body-sm text-text-tertiary mt-8 sm:mt-10">
            You&apos;ve seen all {filteredMentors.length} mentors
          </p>
        )}
      </main>
    </div>
  );
}

export default SearchMentors;
