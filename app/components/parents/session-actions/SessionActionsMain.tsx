"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useGetParentsSessionsByPhone } from "@/hooks/query/useGetParentsSessionsByPhoneNumber";
import TitleSection from "@/ui/TitleSection";
import Button from "@/ui/Button";
import Radio from "@/ui/Radio";

const SESSION_ACTION_OPTIONS = [
  {
    label: "일시정지",
    subLabel: "수업을 잠시 쉬고싶어요",
  },
  {
    label: "선생님 교체",
    subLabel: "다른 선생님과 수업하고 싶어요",
  },
];

export default function SessionActionsMain() {
  const router = useRouter();
  const params = useParams();
  const phoneNumber = params?.phoneNumber as string;

  const { data } = useGetParentsSessionsByPhone(phoneNumber);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  const handleSelectAction = (action: string) => {
    setSelectedAction(action);
  };

  const isButtonDisabled = !selectedAction || !selectedTeacherId;

  const handleNext = () => {
    if (!selectedAction || !selectedTeacherId) return;

    // 선택한 액션에 따라 경로 분기
    const actionPath = selectedAction === "일시정지" ? "pause" : "change";

    const sp = new URLSearchParams({
      appKey: selectedTeacherId,
    });

    router.push(
      `/parents/session-actions/${phoneNumber}/${actionPath}?${sp.toString()}`,
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-10">
        <TitleSection>
          <TitleSection.Title className="text-[24px]">
            수업 상태를 어떻게
            <br />
            변경하시겠어요?
          </TitleSection.Title>
        </TitleSection>

        <div>
          {SESSION_ACTION_OPTIONS.map(({ label, subLabel }) => (
            <div key={label} className="py-4">
              <Radio
                label={label}
                subLabel={subLabel}
                selected={selectedAction === label}
                onClick={() => handleSelectAction(label)}
              />
            </div>
          ))}
        </div>

        {selectedAction && (
          <>
            <div className="h-[10px] w-full bg-gray-100" />
            <TitleSection>
              <TitleSection.Title className="text-[24px]">
                어떤 수업을 변경할까요?
              </TitleSection.Title>
            </TitleSection>
            <div>
              {data?.map(({ applicationFormId, teacherNickname }, index) => {
                // 수업코드가 같을 경우 대비
                const uniqueKey = `${applicationFormId}__${index}`;
                return (
                  <div key={uniqueKey} className="py-4">
                    <Radio
                      label={teacherNickname}
                      subLabel={applicationFormId}
                      selected={selectedTeacherId === uniqueKey}
                      onClick={() => setSelectedTeacherId(uniqueKey)}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
        <p className="mt-6 text-[16px] font-medium leading-[24px] text-grey-500">
          수업을 완전히 중단하고 싶으신 경우, Y-Edu 카카오톡으로 매칭 매니저에게
          문의해 주세요.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
        <Button
          className="w-[375px]"
          disabled={isButtonDisabled}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
