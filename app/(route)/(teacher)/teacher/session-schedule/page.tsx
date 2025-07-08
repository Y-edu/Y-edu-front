"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionList from "@/components/teacher/SessionList";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import TabBar from "@/ui/Bar/TabBar";
import LoadingUI from "@/ui/LoadingUI";

export default function TeacherSessionScheduleListPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { data, isLoading } = useGetSessions(token, 0, 3);

  if (isLoading) {
    return <LoadingUI />;
  }
  const schedules = data?.schedules ?? {};
  const classIds = Object.keys(schedules);
  const defaultClassId =
    classIds.find((id) => schedules[id].send === true) ?? classIds[0];

  const tabs = classIds.map((classId) => ({
    trigger: classId,
    content: <SessionList key={classId} classId={classId} />,
  }));

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack title="과외 일정" className="border-none">
        <TabBar
          tabs={tabs}
          paramKey="classId"
          initialTab={defaultClassId}
          listClassName="overflow-x-auto whitespace-nowrap scrollbar-hide"
          buttonClassName="flex-initial px-[10px] scroll-ml-5"
        />
      </HeaderWithBack>
    </ErrorBoundary>
  );
}
