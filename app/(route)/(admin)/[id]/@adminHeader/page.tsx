"use client";

import { useRef } from "react";

import { usePatchMatchingDisplayName } from "../../../../hooks/mutation/usePatchMatchingDisplayname";
import { useGetMatchingInfo } from "../../../../hooks/query";

interface HeaderProps {
  params: {
    id: string;
  };
}

export default function AdminHeader({ params }: HeaderProps) {
  const { data: matchingDetailInfo } = useGetMatchingInfo(params.id);
  const matchingDisplayNameRef = useRef<HTMLInputElement>(null);
  const { mutate } = usePatchMatchingDisplayName();

  return (
    <header className="flex min-h-[80px] items-center gap-4 border-b-2 border-[#E6EFF5] pl-4 font-bold text-headColor">
      {matchingDetailInfo.data.location} : {matchingDetailInfo.data.subject}
      <input
        ref={matchingDisplayNameRef}
        defaultValue="In the Future"
        aria-label="표시 이름"
        maxLength={50}
        pattern="^[a-zA-Z0-9가-힣\s]+$"
        className="text-md min-w-28 rounded-2xl bg-[#EFEFEF] px-4"
      />
      <button
        onClick={() =>
          mutate(
            {
              matchingId: params.id,
              displayName: String(matchingDisplayNameRef?.current?.value),
            },
            {
              onError: () => {
                alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
              },
              onSuccess: () => {
                alert("성공적으로 저장되었습니다.");
              },
            },
          )
        }
        className="mr-4 rounded bg-primary px-3 py-[6px] text-white hover:bg-[#4762B4]"
      >
        저장
      </button>
    </header>
  );
}
