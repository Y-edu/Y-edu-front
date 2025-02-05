import RegionFilter from "../../ui/Filter/RegionFilter";
import CategoryFilter, { OptionType } from "../../ui/Filter/CategoryFilter";
import { TeacherSearchParams } from "../../actions/get-teacher-search";

interface TeacherListFilterProps {
  filters: TeacherSearchParams;
  onChange: (newFilter: TeacherSearchParams) => void;
  onApply: () => void;
  appliedFilters: TeacherSearchParams;
}

function TeacherListFilter({
  filters,
  onChange,
  onApply,
  appliedFilters,
}: TeacherListFilterProps) {
  const isFilterApplied =
    appliedFilters.subjects.length > 0 ||
    appliedFilters.universities.length > 0 ||
    appliedFilters.genders.length > 0 ||
    appliedFilters.districts.length > 0 ||
    appliedFilters.search.trim() !== "";

  const schoolOptions: OptionType[] = [
    { value: "S", label: "서울대" },
    { value: "K", label: "고려대" },
    { value: "Y", label: "연세대" },
    { value: "서강", label: "서강대" },
    { value: "성균", label: "성균관대" },
    { value: "한양", label: "한양대" },
  ];

  return (
    <div className="relative mb-4 rounded-3xl border border-gray-300 bg-white p-6">
      {/* 과목 필터 */}
      <CategoryFilter
        title="과목"
        options={["영어", "수학"]}
        selectedValues={filters.subjects}
        onChange={(values) => onChange({ ...filters, subjects: values })}
      />

      {/* 학교 필터 */}
      <CategoryFilter
        title="학교"
        options={schoolOptions}
        selectedValues={filters.universities}
        onChange={(values) => onChange({ ...filters, universities: values })}
      />

      {/* 성별 필터 */}
      <CategoryFilter
        title="성별"
        options={["남", "여"]}
        selectedValues={filters.genders}
        onChange={(values) => onChange({ ...filters, genders: values })}
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
        selectedRegion={filters.districts}
        onRegionChange={(values) => onChange({ ...filters, districts: values })}
      />

      {/* 적용된 필터 영역 */}
      {isFilterApplied && (
        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm font-medium text-blue-700">적용된 필터:</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-blue-600">
            {appliedFilters.subjects.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                과목: {appliedFilters.subjects}
              </span>
            )}
            {appliedFilters.universities.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                학교: {appliedFilters.universities}
              </span>
            )}
            {appliedFilters.genders.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                성별: {appliedFilters.genders}
              </span>
            )}
            {appliedFilters.districts.length > 0 && (
              <span className="rounded bg-blue-100 px-2 py-1">
                지역: {appliedFilters.districts}
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
