/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import LoadingUI from "@/ui/LoadingUI";

export default function SessionCompletePage() {
  const toast = useGlobalSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const classSessionId = searchParams.get("sessionId");

  const { data: sessions } = useGetSessions(token, 0, 3);
  const { data, isLoading } = useGetSchedules({ token });
  const { data: sessionByToken } = useGetSessionByToken({ token: token ?? "" });

  const target = data?.find((item) => item.send);

  // sessionId가 있을 경우 sessions에서 데이터 추출
  const sessionFromCache = classSessionId
    ? (Object.values(sessions?.schedules ?? {})
        .flatMap((schedulePage) => schedulePage.schedules.content)
        .find((session) => session.classSessionId === Number(classSessionId)) ??
      null)
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

  const isEmpty = !activeSessionData;

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
    if (classId) router.push(`/teacher/session-schedule?${params.toString()}`);
    else router.push(`/teacher/session-schedule?${params.toString()}`);
  };

  useEffect(() => {
    if (isEmpty) return;

    // 이미 리뷰를 작성한 수업이면 일정 페이지로 이동
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

  if (isLoading) {
    return <LoadingUI />;
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
