"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ui/mentor/profileCard";
import debounce from "lodash.debounce";
import { Backend_Base_URL } from "@/context/constants";
function Page() {
  const [totUsers, settotUsers] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]); // Filtered mentors

  // Fetch all mentors when the page loads
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Backend_Base_URL}/api/mentor/`);
        if (response.status === 200) {
          setMentors(response.data.data);

          setFilteredMentors(response.data.data);
          settotUsers(response.data.data.length);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.msg || "An error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Filter mentors based on search input
  useEffect(() => {
    if (!searchInput) {
      setFilteredMentors(mentors);
    } else {
      const filtered = mentors.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          mentor.college.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredMentors(filtered);
      settotUsers(filtered.length);
    }
  }, [searchInput, mentors]);

  // Handle search input change (Debounced)
  const handleInputChange = debounce((e) => {
    setSearchInput(e.target.value);
  }, 500);

  

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
                  className="bg-gray-50 w-full border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-5 p-2 sm:p-3 dark:bg-gray-50 dark:border-gray-600 placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search mentor, college ..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="search-result flex text-base font-semibold md:text-2xl gap-x-2 m-4">
          Showing <div className="totalMentors font-sans">{totUsers}</div>{" "}
          Mentors
        </div>
      </div>
      <hr />
      <section className="max-w-full my-8 sm:my-12 flex overflow-hidden relative flex-col gap-y-4 sm:gap-y-12 justify-evenly md:flex-row flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : filteredMentors.length > 0 ? (
          filteredMentors.map((mentor, index) => (
            <div
              key={mentor._id || index}
              className="mentor-profiles lg:w-5/12 shadow-inner border-gray-900 hover:shadow-lg relative overflow-hidden"
            >
              <ProfileCard mentor={mentor} />
            </div>
          ))
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p>No mentors found.</p>
        )}
      </section>
    </div>
  );
}

export default Page;
