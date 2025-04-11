"use client";

import { useParams, useRouter } from "next/navigation";

import Button from "@/ui/Button";
import Textarea from "@/ui/Textarea";
import { useDeleteSchedule } from "@/hooks/mutation/useDeleteSchedule";
import { useTextareaWithMaxLength } from "@/ui/Textarea/useMaxLengthValidator";

export default function RejectedResult() {
  const router = useRouter();
  const { managementId } = useParams();

  const {
    value: reason,
    error: reasonError,
    onChange: setReason,
  } = useTextareaWithMaxLength(100);

  const { mutate } = useDeleteSchedule();

  const handleSubmit = () => {
    mutate(
      {
        classScheduleManagementId: managementId as string,
        refuseReason: reason,
      },
      {
        onSuccess: () => {
          router.replace(`?step=submitted`);
        },
      },
    );
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
        errorMessage={reasonError}
        placeholder="예: 일정이 맞지 않았어요 / 스타일이 달랐어요"
      />
      <div className="absolute bottom-0 w-full">
        <Button
          onClick={handleSubmit}
          disabled={reason.trim() === "" || reason.length > 100}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}
