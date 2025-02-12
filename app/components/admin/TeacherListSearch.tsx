"use client";

import { useModal } from "../../hooks/custom";
import { Modal } from "../../ui";
import { usePostNewMatchingAcceptance } from "../../hooks/mutation";
import type {
  TeacherSearchParams,
  FilteringTeacher,
} from "../../actions/get-teacher-search";
import { getSelectedTeacherNicknames } from "../../hooks/custom/useGetSelectedTeacherNickname";

interface TeacherListSearchProps {
  selectedTeachers: string[];
  matchingId: string;
  filters: TeacherSearchParams;
  onChange: (newFilters: TeacherSearchParams) => void;
  onSearch: () => void;
  teacherData: FilteringTeacher[] | null;
  selectedTeacherRowList: { [key: string]: boolean };
}

function TeacherListSearch({
  selectedTeachers,
  matchingId,
  filters,
  onChange,
  onSearch,
  teacherData,
  selectedTeacherRowList,
}: TeacherListSearchProps) {
  const selectedTeacherNicknames = teacherData
    ? getSelectedTeacherNicknames(teacherData, selectedTeacherRowList)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const { mutate: postNewMatchingAcceptance } = usePostNewMatchingAcceptance();
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            onKeyDown={handleKeyDown}
            className="ml-2 mr-4 w-[350px] rounded-full bg-white py-[6px] pl-[16px] text-lg text-black"
          />
          <button
            className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
            onClick={onSearch}
          >
            조회하기
          </button>
        </div>
        <button
          className="mr-6 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
          onClick={() => {
            if (Object.keys(selectedTeachers).length === 0) {
              alert("이 과외건을 추가로 제안할 선생님을 선택해주세요.");
              return;
            }
            openModal();
          }}
        >
          과외건 추가 제안
        </button>
        <Modal
          isOpen={isModalOpen}
          handleOnConfirm={() => {
            postNewMatchingAcceptance(
              {
                applicationId: matchingId,
                teacherIds: selectedTeachers,
              },
              {
                onSuccess: () => {
                  alert("발송 완료");
                  closeModal();
                },
                onError: () => {
                  const errorMessage =
                    "알림톡 발송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
                  alert(errorMessage);
                  closeModal();
                },
              },
            );
          }}
          handleOnCancel={closeModal}
          title={selectedTeacherNicknames.join(", ")}
          confirmText="발송하기"
          message="위 선생님들께 추가로 매칭 알림을 보낼까요?"
          cancelText="취소하기"
        />
      </div>
    </div>
  );
}

export default TeacherListSearch;
