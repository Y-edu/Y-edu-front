import RegionFilter from "../../ui/Filter/RegionFilter";
import CategoryFilter from "../../ui/Filter/CategoryFilter";
import { TeacherFilters } from "../../types/TeacherFilters";

interface TeacherListFilterProps {
  filters: TeacherFilters;
  onChange: (newFilter: TeacherFilters) => void;
  onApply: () => void;
  appliedFilters: TeacherFilters;
}

function TeacherListFilter({
  filters,
  onChange,
  onApply,
  appliedFilters,
}: TeacherListFilterProps) {
  const isFilterApplied =
    appliedFilters.subject.length > 0 ||
    appliedFilters.school.length > 0 ||
    appliedFilters.gender.length > 0 ||
    appliedFilters.region.length > 0 ||
    appliedFilters.search.trim() !== "";
  return (
    <div className="relative mb-4 rounded-3xl border border-gray-300 bg-white p-6">
      {/* 과목 필터 */}
      <CategoryFilter
        title="과목"
        options={["영어", "수학"]}
        selectedValues={filters.subject}
        onChange={(values) => onChange({ ...filters, subject: values })}
      />

      {/* 학교 필터 */}
      <CategoryFilter
        title="학교"
        options={["서울대", "연세대", "고려대", "서강대", "한양대"]}
        selectedValues={filters.school}
        onChange={(values) => onChange({ ...filters, school: values })}
      />

      {/* 성별 필터 */}
      <CategoryFilter
        title="성별"
        options={["남자", "여자"]}
        selectedValues={filters.gender}
        onChange={(values) => onChange({ ...filters, gender: values })}
      />

      {/* 지역 필터 */}
      <div className="absolute mr-4 h-[36px] w-[48px] rounded bg-primary px-2 py-1 text-lg font-bold text-white">
        지역
      </div>
      <button
        className="absolute right-1 mr-5 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
        onClick={onApply}
      >
        필터적용
      </button>
      <RegionFilter
        selectedRegion={filters.region}
        onRegionChange={(values) => onChange({ ...filters, region: values })}
      />

      {/* 적용된 필터 영역 */}
      {isFilterApplied && (
        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm font-medium text-blue-700">적용된 필터:</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-blue-600">
            {appliedFilters.subject.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                과목: {appliedFilters.subject.join(", ")}
              </span>
            )}
            {appliedFilters.school.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                학교: {appliedFilters.school.join(", ")}
              </span>
            )}
            {appliedFilters.gender.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                성별: {appliedFilters.gender.join(", ")}
              </span>
            )}
            {appliedFilters.region.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                지역: {appliedFilters.region.join(", ")}
              </span>
            )}
            {appliedFilters.search.trim() !== "" && (
              <span className="rounded bg-blue-100 px-2 py-1">
                검색: {appliedFilters.search}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherListFilter;
