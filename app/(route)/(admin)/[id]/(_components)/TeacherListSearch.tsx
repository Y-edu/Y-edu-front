"use client";

interface TeacherListSearchProps {
  selectedTeachers: string[];
}

function TeacherListSearch({ selectedTeachers }: TeacherListSearchProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="ml-2 mr-4 w-[350px] rounded-full bg-white py-[6px] pl-[16px] text-lg text-black"
          />
          <button className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]">
            조회하기
          </button>
        </div>
        <button
          className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
          onClick={() => {
            alert(selectedTeachers.toString());
          }}
        >
          추가발송
        </button>
      </div>
    </div>
  );
}

export default TeacherListSearch;
