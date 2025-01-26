"use client";

import { useState } from "react";

function TeacherListFilter() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const regions = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const categories = [
    {
      title: "과목",
      options: ["영어", "수학"],
    },
    {
      title: "성별",
      options: ["남자", "여자"],
    },
    {
      title: "학교",
      options: ["서울대", "연세대", "고려대", "서강대", "성균관대", "한양대"],
    },
  ];

  const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);

  const handleRegionSelect = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region],
    );
  };

  const renderCategory = (title: string, options: string[]) => (
    <div className="mb-4 flex flex-row border-b border-gray-300 pb-4">
      <div className="flex w-full flex-row">
        <div className="mr-4 rounded bg-primary px-2 py-1 text-lg font-bold text-white">
          {title}
        </div>
        <div className="flex flex-row gap-4">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" className="size-4 accent-blue-500" />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-3 overflow-hidden rounded-3xl border border-gray-300 bg-white p-6 shadow-lg">
        {categories.map(({ title, options }) => renderCategory(title, options))}

        {/* 지역 필터 */}
        <div className="mb-4 flex flex-row border-b border-gray-300 pb-4">
          <div className="flex w-full flex-row">
            <div className="absolute mr-4 rounded bg-primary px-2 py-1 text-lg font-bold text-white">
              지역
            </div>
            <div className="flex w-[90%] translate-x-[62px] flex-col">
              <div className="flex items-center gap-4">
                <button
                  className="rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
                  onClick={toggleAccordion}
                >
                  선택하기
                </button>
                {selectedRegions.length > 0 && (
                  <span className="flex flex-row text-sm text-gray-700">
                    선택된 지역:{" "}
                    <p className="ml-2 text-primary">
                      {selectedRegions.join(", ")}
                    </p>
                  </span>
                )}
              </div>
              {isAccordionOpen && (
                <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-4">
                  <div className="grid grid-cols-5 gap-4">
                    {regions.map((region) => (
                      <label
                        key={region}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          className="size-4 accent-blue-500"
                          checked={selectedRegions.includes(region)}
                          onChange={() => handleRegionSelect(region)}
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherListFilter;
