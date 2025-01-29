"use client";

import { useModal } from "../../../../../hooks/custom";
import { Modal } from "../../../../../ui";
import { usePostNewMatchingAcceptance } from "../../../../../hooks/mutation";

interface TeacherListSearchProps {
  selectedTeachers: string[];
  matchingId: string;
}

function TeacherListSearch({
  selectedTeachers,
  matchingId,
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
            className="ml-2 mr-4 w-[350px] rounded-full bg-white py-[6px] pl-[16px] text-lg text-black"
          />
          <button className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]">
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
                onError: () => {
                  // Todo -> 에러 로깅
                  alert("에러가 발생했습니다.");
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
