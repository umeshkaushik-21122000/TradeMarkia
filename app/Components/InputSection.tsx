"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const InputSection = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters

  useEffect(() => {
    // Check for 'input_query' in the URL and set it as the initial value
    const inputQuery = searchParams.get("input_query");
    if (inputQuery) {
      setSearchText(inputQuery);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create URLSearchParams from existing searchParams
    const queryParams = new URLSearchParams(searchParams.toString());

    // Update or add the 'input_query' parameter
    if (searchText.trim()) {
      queryParams.set("input_query", searchText.trim());
    } else {
      // to show toast notification here
      return;
    }

    // Construct the new URL
    const newUrl = `${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    // Push new URL with or without query parameters
    router.push(newUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-1/2 justify-center items-center gap-x-3"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative flex w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
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
        </div>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          name="input_query"
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Trademark Here eg. Mickey Mouse"
          required
        />
      </div>
      {/* to be fixed : button height */}
      <button
        type="submit"
        className="text-white end-2.5 bottom-2.5 bg-[#4380EC] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3"
      >
        Search
      </button>
    </form>
  );
};

export default InputSection;
