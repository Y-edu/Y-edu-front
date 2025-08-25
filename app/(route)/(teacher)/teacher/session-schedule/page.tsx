"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionList from "@/components/teacher/SessionList";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import TabBar from "@/ui/Bar/TabBar";
import LoadingUI from "@/ui/LoadingUI";
import { useGetSessionsMonth } from "@/hooks/query/useGetSessionsMonth";
import MonthDurationNavigator from "@/components/teacher/Session/MonthDurationNavigator";

export default function TeacherSessionScheduleListPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const classId = searchParams.get("classId");

  const { data, isLoading } = useGetSessions(token, 0, 3);
  const { data: sessionsMonthData } = useGetSessionsMonth(
    token
      ? { token, monthCount: 2 }
      : classId
        ? { classMatchingId: classId, monthCount: 2 }
        : { token: "", monthCount: 2 },
  );

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

  const currentMonth = new Date().getMonth() + 1;

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack title="내 과외 관리" className="border-none">
        <div className="flex items-center px-5 py-2">
          <MonthDurationNavigator
            defaultMonth={currentMonth}
            monthDuration={sessionsMonthData?.months || {}}
          />
        </div>
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
