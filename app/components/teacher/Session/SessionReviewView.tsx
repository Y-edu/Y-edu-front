"use client";

import DivWithLabel from "@/components/result/DivWithLabel";
import { HOMEWORK_PROGRESS_LIST } from "@/constants/session/homework";
import Radio from "@/ui/Radio";

interface SessionReviewViewProps {
  homework: string;
  understanding: string;
}

export default function SessionReviewView({
  homework,
  understanding,
}: SessionReviewViewProps) {
  const selectedItem = HOMEWORK_PROGRESS_LIST.find(
    (item) => item.label === homework,
  );

  return (
    <div className="flex w-full flex-col">
      <DivWithLabel
        label="아이가 숙제를 모두 완료했나요?"
        className="mb-4 w-full"
      >
        {selectedItem && (
          <div className="py-4">
            <Radio label={selectedItem.label} selected />
          </div>
        )}
      </DivWithLabel>
      {/* divider */}
      <div className="-mx-5 border-t-8 border-gray-100" />
      <DivWithLabel label="아이의 이해도" className="mt-5">
        <p className="whitespace-pre-wrap text-[16px] leading-6 text-gray-700">
          {understanding}
        </p>
      </DivWithLabel>
    </div>
  );
}
