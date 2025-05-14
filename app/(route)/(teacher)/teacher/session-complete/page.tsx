"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import TitleSection from "@/ui/TitleSection";
import DivWithLabel from "@/components/result/DivWIthLabel";
import Radio from "@/ui/Radio";
import { HOMEWORK_PROGRESS_LIST } from "@/constants/session/homework";
import Textarea from "@/ui/Textarea";

export default function SessionCompletePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useGetSchedules({ token: token ?? "" });
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (Object.keys(data?.schedules ?? {}).length === 0) setIsEmpty(true);
    else setIsEmpty(false);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 일정 비어 있으면 일정 설정 페이지, 아니면 과외 완료 페이지 */}
      {isEmpty ? (
        <div className="flex flex-col items-center">
          <HeaderWithBack
            title={data?.applicationFormId || "과외 일정"}
            mainClassName="pt-8"
          >
            <SessionSchedule
              className="mb-24"
              title={`Y-edu 에게 진행 중인\n과외 일정을 알려주세요`}
              token={token ?? ""}
            />
          </HeaderWithBack>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
          <HeaderWithBack
            title="수업 리뷰"
            hasBack
            mainClassName="pt-8 w-full px-5"
          >
            <div className="flex w-full flex-col">
              <div className="mb-5 flex flex-col gap-10">
                <TitleSection>
                  <TitleSection.Title>
                    수업을 간략히 리뷰해주세요
                  </TitleSection.Title>
                  <TitleSection.Description>
                    작성하신 내용은 학부모님께 전달됩니다
                  </TitleSection.Description>
                </TitleSection>
                <DivWithLabel
                  label="아이가 숙제를 모두 완료했나요?"
                  className="w-full"
                >
                  {HOMEWORK_PROGRESS_LIST.map((item) => (
                    <div key={item.value} className="py-4">
                      <Radio
                        label={item.label}
                        selected={false}
                        onClick={() => {}}
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
                  value=""
                  onChange={() => {}}
                  placeholder={`예) 'I go to bed at 9'처럼 일상 표현은 금방 따라왔지만, 의문문으로 바꾸는 건 어려워했어요.`}
                />
              </DivWithLabel>
            </div>
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
