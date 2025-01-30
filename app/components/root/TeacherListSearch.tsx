"use client";

import { useModal } from "../../hooks/custom";
import { Modal } from "../../ui";
import { usePostNewMatchingAcceptance } from "../../hooks/mutation";

interface TeacherListSearchProps {
  selectedTeachers: string[];
  matchingId: string;
  draftSearch: string;
  setDraftSearch: (val: string) => void;
  onSearch: () => void;
}

function TeacherListSearch({
  selectedTeachers,
  matchingId,
  draftSearch,
  setDraftSearch,
  onSearch,
}: TeacherListSearchProps) {
  const { mutate: postNewMatchingAcceptance } = usePostNewMatchingAcceptance();
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={draftSearch}
            onChange={(e) => setDraftSearch(e.target.value)}
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
          className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
          onClick={() => {
            openModal();
          }}
        >
          추가발송
        </button>
        <Modal
          isOpen={isModalOpen}
          handleOnConfirm={() => {
            postNewMatchingAcceptance(
              {
                matchingId,
                userIds: selectedTeachers,
              },
              {
                onSuccess: (data) => {
                  alert(data.data);
                  closeModal();
                },
                onError: (error) => {
                  const errorMessage =
                    "알림톡 발송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
                  console.error("매칭 알림톡 발송 실패:", error);
                  alert(errorMessage);
                  closeModal();
                },
              },
            );
          }}
          handleOnCancel={closeModal}
          title="추가 전송하시겠습니까?"
          confirmText="발송하기"
          message="위 선생님들께 추가로 매칭 알림을 보낼까요?"
          cancelText="취소하기"
        />
      </div>
    </div>
  );
}

export default TeacherListSearch;
