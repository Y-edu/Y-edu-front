"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { useGetSchedules } from "@/hooks/query/useGetSchedules";
import SessionSchedule from "@/components/teacher/Session/SessionSchedule";

export default function SessionCompletePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useGetSchedules({ token: token ?? "" });
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (Object.keys(data?.schedules ?? {}).length === 0) setIsEmpty(true);
    else setIsEmpty(false);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {/* 일정 비어 있으면 일정 설정 페이지, 아니면 일정 확인 페이지 */}
      {!isEmpty ? (
        <div className="flex flex-col items-center">
          <div className="mb-8 flex h-12 w-full items-center justify-center text-lg text-grey-900">
            과외 식별자
          </div>
          <SessionSchedule
            className="mb-24"
            title={`Y-edu 에게 진행 중인\n과외 일정을 알려주세요`}
            token={token ?? ""}
          />
        </div>
      ) : (
        <div>
          {Object.entries(data?.schedules ?? {}).map(([day, times]) => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {times.map((time, idx) => (
                  <li key={idx}>
                    시작 시간: {time.start}, 수업 시간: {time.classMinute}분
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
