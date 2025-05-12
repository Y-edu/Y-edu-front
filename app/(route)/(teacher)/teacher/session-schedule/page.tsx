"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionSchedule from "@/components/teacher/SessionSchedule";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import TabBar from "@/ui/Bar/TabBar";

export default function TeacherSessionSchedulePage() {
  const token = useSearchParams().get("token") ?? "";
  const { data, isLoading } = useGetSessions(token);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const tabs = Object.entries(data!.schedules).map(([classId, sessions]) => ({
    trigger: classId,
    content: <SessionSchedule sessions={sessions} />,
  }));

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack title="과외 일정" className="border-none">
        <TabBar tabs={tabs} />
      </HeaderWithBack>
    </ErrorBoundary>
  );
}
