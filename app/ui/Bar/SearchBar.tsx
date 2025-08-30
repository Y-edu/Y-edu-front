"use client";

import { useState } from "react";

import { Modal } from "@/ui/Modal/Modal";
import { useModal } from "@/hooks/custom/useModal";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  selectedClassCodes?: string[];
}

export function SearchBar({
  onSearch,
  placeholder = "검색어를 입력하세요",
  selectedClassCodes = [],
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isModalOpen, openModal, closeModal } = useModal();

  // 수업코드에서 과목명 제거하여 순수 코드만 추출
  const extractPureCodes = (classCodes: string[]): string[] => {
    return classCodes.map((code) => {
      // "[과목명] 코드" 형태에서 코드 부분만 추출
      const match = code.match(/\[.*?\]\s*(.+)/);
      return match ? match[1] : code;
    });
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handlePaymentRequest = () => {
    if (selectedClassCodes.length === 0) {
      alert("결제 요청할 수업을 선택해주세요.");
      return;
    }
    openModal();
  };

  const handleConfirmPayment = () => {
    const pureCodes = extractPureCodes(selectedClassCodes);
    // TODO: 여기에 실제 API 호출 로직 추가
    closeModal();
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
        message={`선택하신 ${selectedClassCodes.length}개의 수업에 대해 결제 요청을 진행하시겠습니까?\n\n수업코드:\n${extractPureCodes(selectedClassCodes).join(", ")}`}
        confirmText="요청하기"
        cancelText="취소"
        handleOnConfirm={handleConfirmPayment}
        handleOnCancel={closeModal}
      />
    </div>
  );
}
