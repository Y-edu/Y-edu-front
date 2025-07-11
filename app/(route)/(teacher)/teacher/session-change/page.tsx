"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import { Schedule } from "@/components/teacher/Session/useSessionSchedule";
import { DayOfWeek } from "@/actions/get-teacher-detail";
import { ClassTimeDTO } from "@/actions/get-schedules";
import LoadingUI from "@/ui/LoadingUI";

export default function SessionChangePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const classId = searchParams.get("classId");
  const { data, isLoading } = useGetSchedules({ token });

  const onClickBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sessionId");
    router.push(`/teacher/session-schedule?${params.toString()}`);
  };

  const convertToSchedules = (
    scheduleData: Partial<Record<DayOfWeek, ClassTimeDTO[]>> | undefined,
  ): Schedule[] => {
    if (!scheduleData) return [];

    const result: Schedule[] = [];

    Object.entries(scheduleData).forEach(([day, classTimes]) => {
      if (classTimes && classTimes.length > 0) {
        const classTime = classTimes[0];
        result.push({
          day,
          start: classTime.start,
          classMinute: classTime.classMinute,
        });
      }
    });

    return result;
  };

  const target = data?.find((item) => item.applicationFormId === classId);
  const schedules = convertToSchedules(target?.schedules);

  if (isLoading) {
    return <LoadingUI />;
  }

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <HeaderWithBack
            title={classId || "과외 일정"}
            mainClassName="pt-8 overflow-auto"
            hasBack
            onBack={onClickBack}
          >
            <SessionSchedule
              title={`학부모와 협의 후\n일정을 업데이트해 주세요`}
              token={classId ? undefined : (token ?? undefined)}
              classMatchingId={target?.classMatchingId}
              startDateOptions={target?.changeStartDates}
              initialSchedules={schedules}
            />
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
