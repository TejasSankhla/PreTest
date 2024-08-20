"use client";
import React, { useState } from "react";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Update state with input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // add api request and routing to mentor page
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-xl sm:w-full relative mx-auto"
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          value={searchInput} // Set input value from state
          onChange={handleInputChange} // Update state when typing
          className="bg-gray-50 w-full border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-5 p-2 sm:p-3 dark:bg-gray-50 dark:border-gray-600 placeholder-gray-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search mentor, college ..."
          required
        />
      </div>
      <button
        type="submit"
        className="p-3 sm:p-4 ml-2 text-lg font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
