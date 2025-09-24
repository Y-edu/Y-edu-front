"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionList from "@/components/teacher/SessionList";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import TabBar from "@/ui/Bar/TabBar";
import LoadingUI from "@/ui/LoadingUI";
import MonthDurationNavigator from "@/components/teacher/Session/MonthDurationNavigator";

export default function TeacherSessionScheduleListPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { data, isLoading } = useGetSessions(token, 0, 3);
  const { data: schedulesData } = useGetSchedules({ token });

  if (isLoading) {
    return <LoadingUI />;
  }
  const schedules = data?.schedules ?? {};
  const classIds = Object.keys(schedules);
  const defaultClassId =
    classIds.find((id) => schedules[id].send === true) ?? classIds[0];
  const currentMonth = new Date().getMonth() + 1;
  const tabs = classIds.map((classId) => {
    const matchedSchedule = schedulesData?.find(
      (item) => item.applicationFormId === classId,
    );
    const classMatchingId = matchedSchedule?.classMatchingId;

    return {
      trigger: classId,
      content: (
        <div key={classId}>
          <div className="flex items-center px-5 py-2">
            {typeof classMatchingId === "number" && (
              <MonthDurationNavigator
                classId={classMatchingId}
                defaultMonth={currentMonth}
              />
            )}
          </div>
          <SessionList classId={classId} />
        </div>
      ),
    };
  });

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack title="내 과외 관리" className="border-none">
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
