"use client";

import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionSchedule from "@/components/teacher/SessionSchedule";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import TabBar from "@/ui/Bar/TabBar";

export default function TeacherSessionSchedulePage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const { data, isLoading, isError } = useGetSessions(token);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  if (isError || !data) {
    return <ErrorUI />;
  }

  const tabs = Object.entries(data.schedules).map(([classId, sessions]) => ({
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
