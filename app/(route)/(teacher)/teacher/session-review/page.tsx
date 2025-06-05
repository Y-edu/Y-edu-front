"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";
import { useMemo } from "react";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionReviewView from "@/components/teacher/Session/SessionReviewView";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import { formatDateShort } from "@/utils/getDayOfWeek";

export default function SessionReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const sessionIdStr = searchParams.get("sessionId") ?? "";
  const sessionId = Number(sessionIdStr);

  const { data, isLoading } = useGetSessions(token);

  const targetSession = useMemo(() => {
    if (!data) return undefined;
    return Object.values(data.schedules)
      .flatMap((schedulePage) => schedulePage.content)
      .find((s) => s.classSessionId === sessionId);
  }, [data, sessionId]);

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
    <div className="flex w-full flex-col items-center">
      <ErrorBoundary fallback={<ErrorUI />}>
        <HeaderWithBack
          title={formatDateShort(targetSession!.classDate) ?? "수업 리뷰"}
          hasBack
          onBack={onClickBack}
          mainClassName="pt-8 w-full px-5"
        >
          <SessionReviewView
            homework={targetSession!.homework ?? ""}
            understanding={targetSession!.understanding ?? "내용이 없습니다."}
          />
        </HeaderWithBack>
      </ErrorBoundary>
    </div>
  );
}
