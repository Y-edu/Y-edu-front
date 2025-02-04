"use client";
import { useRef } from "react";

import { useGetMatchingInfo } from "../hooks/query";
import { usePatchMatchingDisplayName } from "../hooks/mutation/usePatchMatchingDisplayname";

interface HeaderProps {
  matchingId: string;
}

export function Header({ matchingId }: HeaderProps) {
  const { data: matchingDetailInfo } = useGetMatchingInfo(matchingId);
  const matchingDisplayNameRef = useRef<HTMLInputElement>(null);
  const { mutate } = usePatchMatchingDisplayName();

  return (
    <header className="flex min-h-[80px] items-center gap-4 border-b-2 border-[#E6EFF5] pl-4 font-bold text-headColor">
      {decodeURIComponent(matchingId)} : {matchingDetailInfo.subject}
      <input
        ref={matchingDisplayNameRef}
        defaultValue={matchingDetailInfo.kakaoName ?? "In the Future"}
        aria-label="표시 이름"
        maxLength={50}
        pattern="^[a-zA-Z0-9가-힣\s]+$"
        className="text-md min-w-28 rounded-2xl bg-[#EFEFEF] px-4"
      />
      <button
        onClick={() =>
          mutate(
            {
              matchingId: String(matchingDetailInfo.parentsId),
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
      {matchingDetailInfo.phoneNumber}
    </header>
  );
}
