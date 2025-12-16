"use client";
import React, { useState, useEffect, useMemo } from "react";
import ProfileCard from "@/components/ui/mentor/profileCard";
import { Badge } from "@/components/atoms";
import { Search, X } from "lucide-react";
import { getMockRating, getMockSessionCount } from "@/lib/utils";
import debounce from "lodash.debounce";

interface InitialMentorsProps {
  initialMentors: any[];
}

function SearchMentors({ initialMentors }: InitialMentorsProps) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "sessions" | "name">("rating");

  // Extract unique colleges and companies
  const uniqueColleges = useMemo(() => {
    const colleges = initialMentors
      .map((m) => m.college)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
    return colleges.slice(0, 5); // Show top 5
  }, [initialMentors]);

  const uniqueCompanies = useMemo(() => {
    const companies = initialMentors
      .map((m) => m.currentCompany)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
    return companies.slice(0, 5); // Show top 5
  }, [initialMentors]);

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    let result = initialMentors;

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
        selectedCompanies.includes(mentor.currentCompany)
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        const ratingA = getMockRating(a._id);
        const ratingB = getMockRating(b._id);
        return ratingB - ratingA; // High to low
      } else if (sortBy === "sessions") {
        const sessionsA = getMockSessionCount(a._id);
        const sessionsB = getMockSessionCount(b._id);
        return sessionsB - sessionsA; // Most to least
      } else {
        return a.name.localeCompare(b.name); // A-Z
      }
    });

    return result;
  }, [searchInput, selectedColleges, selectedCompanies, sortBy, initialMentors]);

  // Debounced input handler
  const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, 300); // Reduced from 500ms to 300ms

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
  };

  const hasActiveFilters = selectedColleges.length > 0 || selectedCompanies.length > 0 || searchInput;

  return (
    <div>
      <div className="search-page-header">
        {/* Search Bar */}
        <div className="flex items-center justify-center search-bar-container py-8 md:py-12 bg-secondary-lightest">
          <div className="search-input flex items-center justify-center w-full mx-auto">
            <div className="flex items-center max-w-xl sm:w-full relative mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  id="simple-search"
                  onChange={handleInputChange}
                  className="bg-background w-full border border-border text-text-primary text-lg rounded-lg focus:ring-secondary focus:border-secondary block pl-12 pr-5 p-2 sm:p-3"
                  placeholder="Search mentors, companies, colleges..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-secondary">Filters:</span>

              {/* College Filters */}
              {uniqueColleges.map((college) => (
                <Badge
                  key={college}
                  variant={selectedColleges.includes(college) ? "secondary" : "default"}
                  className="cursor-pointer"
                  onClick={() => toggleCollege(college)}
                >
                  {college}
                </Badge>
              ))}

              {/* Company Filters */}
              {uniqueCompanies.map((company) => (
                <Badge
                  key={company}
                  variant={selectedCompanies.includes(company) ? "secondary" : "default"}
                  className="cursor-pointer"
                  onClick={() => toggleCompany(company)}
                >
                  {company}
                </Badge>
              ))}

              {/* Clear All Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear All
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-text-secondary">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-background border border-border text-text-primary text-sm rounded-md px-3 py-1.5 focus:ring-secondary focus:border-secondary"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="sessions">Sessions (Most to Least)</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="search-result flex text-base font-semibold md:text-2xl gap-x-2 mb-4">
            Showing <div className="totalMentors font-sans text-secondary">{filteredMentors.length}</div> Mentors
          </div>
        </div>
      </div>

      {/* Mentor Cards */}
      <section className="max-w-7xl mx-auto px-6 my-8 sm:my-12 flex overflow-hidden relative flex-col gap-y-4 sm:gap-y-12 justify-evenly md:flex-row flex-wrap">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <div
              key={mentor._id}
              className="mentor-profiles w-full lg:w-[48%] relative overflow-hidden"
            >
              <ProfileCard mentor={mentor} />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-lg text-text-secondary">No mentors found matching your criteria.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-secondary hover:underline"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchMentors;
