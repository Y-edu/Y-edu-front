"use client";

import { useState } from "react";

import { filterRegions } from "../../constants/filterData";

interface RegionFilterProps {
  selectedRegion: string[];
  onRegionChange: (regions: string[]) => void;
}

const RegionFilter = ({
  selectedRegion,
  onRegionChange,
}: RegionFilterProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleRegionSelect = (region: string) => {
    const newRegions = selectedRegion.includes(region)
      ? selectedRegion.filter((item) => item !== region)
      : [...selectedRegion, region];
    onRegionChange(newRegions);
  };

  return (
    <div className="ml-16">
      <div className="flex flex-row items-center">
        <button
          className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
          onClick={() => setIsAccordionOpen((prev) => !prev)}
        >
          선택하기
        </button>
        {selectedRegion.length > 0 && (
          <span className="flex flex-row text-base text-gray-700">
            선택된 지역:{" "}
            <p className="ml-2 text-primary">{selectedRegion.join(", ")}</p>
          </span>
        )}
      </div>
      {isAccordionOpen && (
        <div className="max-h-120 mt-2 grid grid-cols-6 gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
          {filterRegions.map((region) => (
            <label key={region}>
              <input
                type="checkbox"
                checked={selectedRegion.includes(region)}
                onChange={() => handleRegionSelect(region)}
                className="mr-2"
              />
              {region}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionFilter;
