"use client";

import { useState } from "react";

import RegionFilter from "../../ui/RegionFilter";
import CategoryFilter from "../../ui/CategoryFilter";

interface TeacherListFilterProps {
  selectedSubject: string[];
  setSelectedSubject: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSchool: string[];
  setSelectedSchool: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
}

function TeacherListFilter({
  selectedSubject,
  setSelectedSubject,
  selectedSchool,
  setSelectedSchool,
  selectedGender,
  setSelectedGender,
}: TeacherListFilterProps) {
  // 지역도 다중선택이 가능하다고 가정
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  return (
    <div className="mb-4 rounded-3xl border border-gray-300 bg-white p-6">
      {/* 과목 필터 (다중 선택) */}
      <CategoryFilter
        title="과목"
        options={["영어", "수학"]}
        selectedValues={selectedSubject}
        onChange={(newValues) => setSelectedSubject(newValues)}
      />

      {/* 학교 필터 (다중 선택) */}
      <CategoryFilter
        title="학교"
        options={["서울대", "연세대", "고려대", "서강대", "한양대"]}
        selectedValues={selectedSchool}
        onChange={(newValues) => setSelectedSchool(newValues)}
      />

      {/* 성별 필터 (다중 선택) */}
      <CategoryFilter
        title="성별"
        options={["남자", "여자"]}
        selectedValues={selectedGender}
        onChange={(newValues) => setSelectedGender(newValues)}
      />

      {/* 지역 필터 (기존과 동일, 다중 선택) */}
      <div className="absolute mr-4 h-[36px] w-[48px] rounded bg-primary px-2 py-1 text-lg font-bold text-white">
        지역
      </div>
      <RegionFilter
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
      />
    </div>
  );
}

export default TeacherListFilter;
