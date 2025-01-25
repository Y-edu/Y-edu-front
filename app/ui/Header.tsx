"use client";
import { useGetMatchingInfo } from "../hooks/query";
import { usePatchMatchingDisplayName } from "../hooks/mutation/usePatchMatchingDisplayname";
import { useRef } from "react";

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
        defaultValue={"In the Future"}
        className="text-md min-w-28 rounded-2xl bg-[#EFEFEF] px-4"
      />
      <button
        onClick={() =>
          mutate({
            matchingId,
            displayName: matchingDisplayNameRef?.current?.value + "",
          })
        }
        className="min-h-[40px] min-w-[80px] rounded-lg bg-primary p-2 text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
      >
        저장
      </button>
    </header>
  );
}
