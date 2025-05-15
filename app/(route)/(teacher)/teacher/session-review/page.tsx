"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";
import { useMemo } from "react";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionReviewView from "@/components/teacher/Session/SessionReviewView";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import type { SessionResponse } from "@/actions/post-getSessions";

export default function SessionReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const sessionIdStr = searchParams.get("sessionId") ?? "";
  const sessionId = Number(sessionIdStr);

  const { data, isLoading } = useGetSessions(token);

  const targetSession: SessionResponse | undefined = useMemo(() => {
    if (!data) return undefined;

    for (const sessions of Object.values(data.schedules)) {
      const found = sessions.find((s) => s.classSessionId === sessionId);
      if (found) return found;
    }
    return undefined;
  }, [data, sessionId]);

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
    <div className="flex w-full flex-col items-center">
      <ErrorBoundary fallback={<ErrorUI />}>
        <HeaderWithBack
          title={targetSession!.classDate ?? "수업 리뷰"}
          hasBack
          onBack={onClickBack}
          mainClassName="pt-8 w-full px-5"
        >
          <SessionReviewView
            homeworkPercentage={targetSession!.homeworkPercentage ?? 0}
            understanding={targetSession!.understanding ?? "내용이 없습니다."}
          />
        </HeaderWithBack>
      </ErrorBoundary>
    </div>
  );
}
