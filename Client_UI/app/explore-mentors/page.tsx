import React from "react";
import axios from "axios";
import SearchMentors from "./components/SearchMentors";
import { Backend_Base_URL } from "@/context/constants";

async function fetchMentors() {
  try {
    const response = await axios.get(`${Backend_Base_URL}/api/mentor/`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error : any) {
    console.error("Error fetching mentors:", error.response?.data?.msg || error.message);
    return [];
  }
}

export default async function Page() {
  const mentors = await fetchMentors();

  return <SearchMentors initialMentors={mentors} />;
}
