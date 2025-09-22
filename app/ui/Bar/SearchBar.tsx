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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 flex justify-between">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-[500px] rounded-lg border border-gray-200 p-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          조회하기
        </button>
      </div>
      <button className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700">
        결제 요청
      </button>
    </div>
  );
}
