"use client";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import { Schedule } from "@/components/teacher/Session/useSessionSchedule";
import { DayOfWeek } from "@/actions/get-teacher-detail";
import { ClassTimeDTO } from "@/actions/get-schedules";

export default function SessionChangePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useGetSchedules({ token: token ?? "" });

  const convertToSchedules = (
    scheduleData: Partial<Record<DayOfWeek, ClassTimeDTO[]>> | undefined,
  ): Schedule[] => {
    if (!scheduleData) return [];

    const result: Schedule[] = [];

    // Object.entries를 사용하여 [day, classTimes] 쌍을 순회
    Object.entries(scheduleData).forEach(([day, classTimes]) => {
      if (classTimes && classTimes.length > 0) {
        // 각 요일에 대한 첫 번째 ClassTimeDTO 사용
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

  // 데이터 변환
  const schedules = convertToSchedules(data?.schedules);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <HeaderWithBack title="과외 식별자" mainClassName="pt-8" hasBack>
            <SessionSchedule
              className="mb-24"
              title={`학부모와 협의 후\n일정을 업데이트해 주세요`}
              token={token ?? ""}
              initialSchedules={schedules}
            />
          </HeaderWithBack>
        </div>
      )}
    </div>
  );
}
