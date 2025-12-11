import React from "react";
import SearchMentors from "./components/SearchMentors";
import { apiClient, API_ROUTES, Mentor, ApiResponse } from "@/lib/api";

// Force dynamic rendering - skip static generation during build
export const dynamic = "force-dynamic";

async function fetchMentors(): Promise<Mentor[]> {
  try {
    const response = await apiClient.get<ApiResponse<Mentor[]>>(API_ROUTES.mentor.list());
    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const mentors = await fetchMentors();

  return <SearchMentors initialMentors={mentors} />;
}
