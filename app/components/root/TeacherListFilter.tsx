import RegionFilter from "../../ui/Filter/RegionFilter";
import CategoryFilter from "../../ui/Filter/CategoryFilter";

interface TeacherListFilterProps {
  selectedSubject: string[];
  setSelectedSubject: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSchool: string[];
  setSelectedSchool: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRegion: string[];
  setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>>;
  onApplyFilters: () => void;
}

function TeacherListFilter({
  selectedSubject,
  setSelectedSubject,
  selectedSchool,
  setSelectedSchool,
  selectedGender,
  setSelectedGender,
  selectedRegion,
  setSelectedRegion,
  onApplyFilters,
}: TeacherListFilterProps) {
  return (
    <div className="relative mb-4 rounded-3xl border border-gray-300 bg-white p-6">
      {/* 과목 필터 (다중 선택) */}
      <CategoryFilter
        title="과목"
        options={["영어", "수학"]}
        selectedValues={selectedSubject}
        onChange={setSelectedSubject}
      />

      {/* 학교 필터 (다중 선택) */}
      <CategoryFilter
        title="학교"
        options={["서울대", "연세대", "고려대", "서강대", "한양대"]}
        selectedValues={selectedSchool}
        onChange={setSelectedSchool}
      />

      {/* 성별 필터 (다중 선택) */}
      <CategoryFilter
        title="성별"
        options={["남자", "여자"]}
        selectedValues={selectedGender}
        onChange={setSelectedGender}
      />

      {/* 지역 필터 (기존과 동일, 다중 선택) */}
      <div className="absolute mr-4 h-[36px] w-[48px] rounded bg-primary px-2 py-1 text-lg font-bold text-white">
        지역
      </div>
      <button
        className="absolute right-1 mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
        onClick={onApplyFilters}
      >
        필터적용
      </button>
      <RegionFilter
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
}

export default TeacherListFilter;
