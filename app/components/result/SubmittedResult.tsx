"use client";

import Image from "next/image";

export default function SubmittedResult() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[24px]">
      <Image src="/images/Letter.svg" alt="Letter" width={80} height={80} />
      <p className="text-center text-[24px] font-bold">제출이 완료됐어요!</p>
      <p className="text-center text-[16px] text-grey-400">
        수정이 필요하다면
        <br />
        Y-Edu에 문의해주세요
      </p>
    </div>
  );
}
