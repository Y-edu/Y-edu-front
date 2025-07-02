"use client";

import { useParams, useRouter } from "next/navigation";

import Button from "@/ui/Button";

export default function SelectBtn() {
  const params = useParams();
  const token = params.token as string;

  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 justify-center bg-white px-[20px] pb-[20px]">
      <Button
        className="w-[335px]"
        onClick={() => {
          router.push(`/teacher/recommend/${token}/select-time`);
        }}
      >
        이 선생님과 할래요
      </Button>
    </div>
  );
}
