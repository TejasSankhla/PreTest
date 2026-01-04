"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ui/mentor/profileCard";
import { Button, Skeleton, SkeletonButton } from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { Search, X, ChevronDown, Loader2, SlidersHorizontal } from "lucide-react";
import { getMockRating, getMockSessionCount } from "@/lib/utils";
import { apiClient, API_ROUTES, Mentor, ApiResponse } from "@/lib/api";
import debounce from "lodash.debounce";

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
    <div>
      <div className="search-page-header">
        <div className="flex items-center justify-center search-bar-container py-8 md:py-12 bg-orange-50">
          <div className="search-input flex items-center justify-center w-full mx-auto">
            <div className="flex items-center max-w-xl sm:w-full relative mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  onChange={handleInputChange}
                  className="bg-gray-50 w-full border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-5 p-2 sm:p-3"
                  placeholder="Search mentor, college ..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="search-result flex text-base font-semibold md:text-2xl gap-x-2 m-4">
          Showing <div className="totalMentors font-sans">{totUsers}</div> Mentors
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
