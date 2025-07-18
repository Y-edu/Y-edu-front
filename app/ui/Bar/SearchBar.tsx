"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "검색어를 입력하세요",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="mb-4 flex gap-2">
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 p-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
        />
      </div>
      <button
        onClick={handleSearch}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        조회하기
      </button>
      <button
        onClick={handleClear}
        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
      >
        초기화
      </button>
    </div>
  );
}
