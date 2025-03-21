"use client";

import { ErrorBoundary } from "react-error-boundary";

import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherTimeSetting() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <TeacherSettingTime />
      </div>
    </ErrorBoundary>
  );
}
