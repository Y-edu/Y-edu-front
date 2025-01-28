"use client";

import { useState } from "react";

import RegionFilter from "../../../ui/RegionFilter";
import CategoryFilter from "../../../ui/CategoryFilter";
import { filterCategories } from "../../../constants/filterData";

function TeacherListFilter() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  return (
    <div className="mb-4 rounded-3xl border border-gray-300 bg-white p-6">
      {/* 필터 카테고리 */}
      {filterCategories.map(({ title, options }) => (
        <CategoryFilter key={title} title={title} options={options} />
      ))}

      {/* 지역 및 추가발송 버튼 */}
      <div className="absolute mr-4 h-[36px] w-[48px] rounded bg-primary px-2 py-1 text-lg font-bold text-white">
        지역
      </div>

      {/* 지역 필터 */}
      <RegionFilter
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
      />
    </div>
  );
}

export default TeacherListFilter;
