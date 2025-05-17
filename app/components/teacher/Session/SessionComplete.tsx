"use client";

import { useState } from "react";

import DivWithLabel from "@/components/result/DivWithLabel";
import { HOMEWORK_PROGRESS_LIST } from "@/constants/session/homework";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import Radio from "@/ui/Radio";
import Textarea from "@/ui/Textarea";
import TitleSection from "@/ui/TitleSection";
import Button from "@/ui/Button";
import { formatDateShort } from "@/utils/getDayOfWeek";
import { mixpanelTrack } from "@/utils/mixpanel";

interface SessionCompleteProps {
  token: string;
  classSessionId: string;
  date: string;
}

export default function SessionComplete({
  token,
  date,
  classSessionId,
}: SessionCompleteProps) {
  const [homeworkPercentage, setHomeworkPercentage] = useState<number | null>(
    null,
  );
  const [understanding, setUnderstanding] = useState("");
  const { completeMutation } = useSessionMutations();
  const isFormValid =
    homeworkPercentage !== null && understanding.trim().length > 0;

  const handleComplete = () => {
    if (!isFormValid || homeworkPercentage === null) return;

    mixpanelTrack("수업 리뷰 전송", {
      homeworkPercentage,
      understanding: understanding.trim(),
    });

    completeMutation.mutate({
      token,
      classSessionId,
      homeworkPercentage,
      understanding: understanding.trim(),
      date: formatDateShort(date),
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-10">
        <TitleSection>
          <TitleSection.Title>수업을 간략히 리뷰해주세요</TitleSection.Title>
          <TitleSection.Description>
            작성하신 내용은 학부모님께 전달됩니다
          </TitleSection.Description>
        </TitleSection>
        <DivWithLabel label="아이가 숙제를 모두 완료했나요?" className="w-full">
          {HOMEWORK_PROGRESS_LIST.map((item) => (
            <div key={item.value} className="py-4">
              <Radio
                label={item.label}
                selected={homeworkPercentage === item.value}
                onClick={() => {
                  setHomeworkPercentage(item.value);
                }}
                {...(item.value !== 0 && {
                  subLabel: `${item.value}%`,
                })}
              />
            </div>
          ))}
        </DivWithLabel>
      </div>
      {/* 아래는 그냥 divider */}
      <div className="-mx-5 border-t-8 border-gray-100" />
      <DivWithLabel label="아이의 이해도" className="mb-40 mt-5">
        <Textarea
          value={understanding}
          onChange={setUnderstanding}
          placeholder={`예) 'I go to bed at 9'처럼 일상 표현은 금방 따라왔지만, 의문문으로 바꾸는 건 어려워했어요.`}
        />
      </DivWithLabel>
      <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
        <Button
          className="w-[335px]"
          disabled={!isFormValid || completeMutation.isPending}
          onClick={handleComplete}
        >
          완료하기
        </Button>
      </div>
    </div>
  );
}
