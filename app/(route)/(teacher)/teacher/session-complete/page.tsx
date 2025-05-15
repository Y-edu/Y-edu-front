"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionComplete from "@/components/teacher/Session/SessionComplete";
import { useGetSessionByToken } from "@/hooks/query/useGetSessionByToken";
import { formatDateShort } from "@/utils/getDayOfWeek";

export default function SessionCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const classSessionId = searchParams.get("sessionId");
  const { data, isLoading } = useGetSchedules({ token: token ?? "" });
  const { data: sessionData } = useGetSessionByToken({ token: token ?? "" });
  const isEmpty = !data || Object.keys(data.schedules ?? {}).length === 0;

  const onClickBack = () => {
    router.push(`/teacher/session-schedule?token=${token}`);
  };

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
            title={sessionData ? formatDateShort(sessionData) : "과외 완료"}
            hasBack
            onBack={onClickBack}
            mainClassName="pt-8 w-full px-5"
          >
            <SessionComplete
              token={token ?? ""}
              classSessionId={classSessionId || ""}
              date={sessionData || ""}
            />
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
