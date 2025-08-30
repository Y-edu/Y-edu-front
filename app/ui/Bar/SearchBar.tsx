"use client";

import { useState } from "react";

import { Modal } from "@/ui/Modal/Modal";
import { useModal } from "@/hooks/custom/useModal";
import { postPaymentRequest } from "@/actions/post-payment-request";
import { Class } from "@/hooks/query/useGetClassList";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  selectedMatchingIds?: number[];
  classItems?: Class[];
  onPaymentSuccess?: () => void;
}

export function SearchBar({
  onSearch,
  placeholder = "검색어를 입력하세요",
  selectedMatchingIds = [],
  classItems = [],
  onPaymentSuccess,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isModalOpen, openModal, closeModal } = useModal();

  // 선택된 매칭 ID들에 해당하는 수업코드들을 가져오는 함수
  const getSelectedClassCodes = (): string[] => {
    return selectedMatchingIds
      .map((matchingId) => {
        const classItem = classItems.find(
          (item) => item.matchingId === matchingId,
        );
        if (classItem) {
          return `[${classItem.subject}] ${classItem.applicationFormId}`;
        }
        return null;
      })
      .filter((code): code is string => code !== null);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handlePaymentRequest = () => {
    if (selectedMatchingIds.length === 0) {
      alert("결제 요청할 수업을 선택해주세요.");
      return;
    }
    openModal();
  };

  const handleConfirmPayment = async () => {
    try {
      // number 배열을 string 배열로 변환
      const classMatchingIds = selectedMatchingIds.map((id) => String(id));
      const result = await postPaymentRequest({ classCodes: classMatchingIds });
      if (result.success) {
        alert("결제 요청이 성공적으로 처리되었습니다.");

        // 결제 성공 후 데이터 새로고침
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }

      if (!result.success) {
        alert("결제 요청 실패");
      }

      closeModal();
    } catch (error) {
      alert(
        `결제 요청 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 flex justify-between">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-[500px] rounded-lg border border-gray-200 p-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          조회하기
        </button>
      </div>
      <button
        onClick={handlePaymentRequest}
        className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
      >
        결제 요청
      </button>

      <Modal
        isOpen={isModalOpen}
        title="결제 요청 확인"
        message={`선택하신 ${selectedMatchingIds.length}개의 수업에 대해 결제 요청을 진행하시겠습니까?\n\n수업코드:\n${getSelectedClassCodes().join(", ")}`}
        confirmText="요청하기"
        cancelText="취소"
        handleOnConfirm={handleConfirmPayment}
        handleOnCancel={closeModal}
      />
    </div>
  );
}
