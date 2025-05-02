"use client";

import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "next/navigation";

import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import ErrorUI from "@/ui/ErrorUI";
import { useGetTeacherSettingTimeByToken } from "@/hooks/query/useGetTeacherSettingTimeByToken";

export default function TeacherTimeSetting() {
  const token = useSearchParams().get("token");
  const { data } = useGetTeacherSettingTimeByToken({
    token: token || "",
  });

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <TeacherSettingTime initialAvailable={data?.available} />
      </div>
    </ErrorBoundary>
  );
}
