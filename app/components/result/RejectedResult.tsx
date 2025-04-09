"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/ui/Button";
import Textarea from "@/ui/Textarea";
import { useDeleteSchedule } from "@/hooks/mutation/useDeleteSchedule";

export default function RejectedResult() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const { managementId } = useParams();

  const { mutate } = useDeleteSchedule();

  const handleSubmit = () => {
    mutate({
      classScheduleManagementId: managementId as string,
      refuseReason: reason,
    });
    router.push(`?step=submitted`);
  };

  return (
    <div className="relative flex h-full flex-col gap-[40px]">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[24px] font-bold">
          수업을 진행하지 않게 된 <br />
          이유가 있을까요?
        </p>
        <p className="text-[16px] font-medium text-grey-400">
          적어주시면 다음 매칭에 잘 반영해드릴게요
        </p>
      </div>
      <Textarea
        value={reason}
        onChange={setReason}
        maxLength={100}
        placeholder="예: 일정이 맞지 않았어요 / 스타일이 달랐어요"
      />
      <div className="absolute bottom-0 w-full">
        <Button onClick={handleSubmit}>제출하기</Button>
      </div>
    </div>
  );
}
