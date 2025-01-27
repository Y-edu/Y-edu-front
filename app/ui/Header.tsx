"use client";
import { useRef } from "react";

import { useGetMatchingInfo } from "../hooks/query";
import { usePatchMatchingDisplayName } from "../hooks/mutation/usePatchMatchingDisplayname";

interface HeaderProps {
  matchingId: number;
}

export function Header({ matchingId }: HeaderProps) {
  const { data: matchingDetailInfo } = useGetMatchingInfo(matchingId);
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
              matchingId,
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
        className="min-h-[40px] min-w-[80px] rounded-lg bg-primary p-2 text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
      >
        저장
      </button>
    </header>
  );
}
