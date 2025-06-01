"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";
import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionComplete from "@/components/teacher/Session/SessionComplete";
import { useGetSessionByToken } from "@/hooks/query/useGetSessionByToken";
import { formatDateShort } from "@/utils/getDayOfWeek";
import {
  calculateSessionEndTime,
  mixpanelIdentify,
  mixpanelSetPeople,
  mixpanelTrack,
} from "@/utils/mixpanel";
import { useGetSessions } from "@/hooks/query/useGetSessions";

export default function SessionCompletePage() {
  const toast = useGlobalSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const classSessionId = searchParams.get("sessionId");

  const { data: sessions } = useGetSessions(token);
  const { data, isLoading } = useGetSchedules({ token });
  const { data: sessionByToken } = useGetSessionByToken({ token: token ?? "" });

  const target = data?.find((item) => item.send);
  const isEmpty =
    !target ||
    Object.values(target.schedules).every((arr) => (arr ?? []).length === 0);

  // sessionId가 있을 경우 sessions에서 데이터 추출
  const sessionFromCache = classSessionId
    ? Object.values(sessions?.schedules ?? {})
        .flat()
        .find((session) => session.classSessionId === Number(classSessionId))
    : null;

  const activeSessionData = useMemo(() => {
    if (sessionFromCache) {
      return {
        isComplete: sessionFromCache.complete,
        classTime: {
          start: sessionFromCache.classStart,
          classMinute: sessionFromCache.classMinute,
        },
        sessionDate: sessionFromCache.classDate,
        teacherId: sessionByToken?.teacherId,
      };
    }

    if (sessionByToken?.sessionDate) {
      return sessionByToken;
    }

    return null;
  }, [sessionFromCache, sessionByToken]);

  const titleDate = activeSessionData?.sessionDate
    ? formatDateShort(activeSessionData.sessionDate)
    : "과외 완료";

  const endTime = useMemo(() => {
    if (activeSessionData?.classTime) {
      return calculateSessionEndTime(
        activeSessionData.classTime.start,
        activeSessionData.classTime.classMinute,
      );
    }
    return "";
  }, [activeSessionData]);

  const goToSchedulePage = (classId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sessionId");
    if (classId)
      router.push(
        `/teacher/session-schedule?${params.toString()}&classId=${classId}`,
      );
    else router.push(`/teacher/session-schedule?${params.toString()}`);
  };

  useEffect(() => {
    if (isEmpty) return;

    // 일정변경된 과외건인 경우
    if (!activeSessionData) goToSchedulePage(target?.applicationFormId);

    if (activeSessionData?.isComplete) {
      goToSchedulePage(target?.applicationFormId);
      toast.success("이미 리뷰 작성을 완료한 수업입니다");
    }
  }, [activeSessionData, searchParams, isEmpty]);

  useEffect(() => {
    if (!activeSessionData) return;

    mixpanelIdentify(String(activeSessionData.teacherId));
    mixpanelSetPeople({
      role: "teacher",
    });

    if (!activeSessionData.isComplete) {
      mixpanelTrack("수업 리뷰 페이지 진입", {
        teacherId: activeSessionData.teacherId,
        endTime,
      });
    }
  }, [activeSessionData]);

  if (isLoading || (!activeSessionData && !isEmpty)) {
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
            onBack={() => goToSchedulePage(target?.applicationFormId)}
            mainClassName="pt-8 w-full px-5"
          >
            <SessionComplete
              token={token ?? ""}
              classSessionId={classSessionId || ""}
              date={titleDate}
              endTime={endTime}
              classMinute={activeSessionData?.classTime.classMinute ?? 0}
            />
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
