"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionComplete from "@/components/teacher/Session/SessionComplete";
import { useGetSessionByToken } from "@/hooks/query/useGetSessionByToken";
import { formatDateShort } from "@/utils/getDayOfWeek";
import { SessionResponse } from "@/actions/post-getSessions";

interface SessionsCache {
  schedules: Record<string, SessionResponse[]>;
}

export default function SessionCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const classSessionId = searchParams.get("sessionId");
  const { data, isLoading } = useGetSchedules({ token: token ?? "" });
  const target = data?.find((item) => item.send);
  const { data: sessionData } = useGetSessionByToken({ token: token ?? "" });
  const isEmpty =
    !target ||
    Object.values(target.schedules).every((arr) => (arr ?? []).length === 0);

  const queryClient = useQueryClient();
  const sessionsCache = queryClient.getQueryData<SessionsCache>([
    "sessions",
    token ?? "",
  ]);

  let cachedDate: string | undefined;

  if (sessionsCache && classSessionId) {
    for (const arr of Object.values(sessionsCache.schedules)) {
      const found = arr.find(
        (s) => s.classSessionId === Number(classSessionId),
      );
      if (found) {
        cachedDate = found.classDate;
        break;
      }
    }
  }

  const titleDate = classSessionId
    ? cachedDate
      ? formatDateShort(cachedDate)
      : "과외 완료"
    : sessionData
      ? formatDateShort(sessionData.sessionDate)
      : "과외 완료";

  const onClickBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sessionId");
    router.push(`/teacher/session-schedule?${params.toString()}`);
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
            title={target?.applicationFormId || "과외 일정"}
            mainClassName="pt-8"
          >
            <SessionSchedule
              className="mb-24"
              title={`Y-edu 에게 진행 중인\n과외 일정을 알려주세요`}
              classMatchingId={target?.classMatchingId}
              token={token ?? ""}
            />
          </HeaderWithBack>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
          <HeaderWithBack
            title={titleDate}
            hasBack
            onBack={onClickBack}
            mainClassName="pt-8 w-full px-5"
          >
            <SessionComplete
              token={token ?? ""}
              classSessionId={classSessionId || ""}
              date={titleDate}
            />
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
