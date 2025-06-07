"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionList from "@/components/teacher/SessionList";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import TabBar from "@/ui/Bar/TabBar";

export default function TeacherSessionScheduleListPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { data, isLoading } = useGetSessions(token);

  const currentMonth = new Date().getMonth() + 1;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const tabs = Object.keys(data!.schedules).map((classId) => ({
    trigger: classId,
    content: <SessionList key={classId} classId={classId} />,
  }));

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack
        title={`${currentMonth}월 과외 일정`}
        className="border-none"
      >
        <TabBar
          tabs={tabs}
          paramKey="classId"
          listClassName="overflow-x-auto whitespace-nowrap scrollbar-hide"
          buttonClassName="flex-initial px-[10px] scroll-ml-5"
        />
      </HeaderWithBack>
    </ErrorBoundary>
  );
}
