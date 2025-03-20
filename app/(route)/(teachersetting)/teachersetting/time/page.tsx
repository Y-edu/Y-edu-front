"use client";

import { ErrorBoundary } from "react-error-boundary";

import { SettingTeacherTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherTimeSetting() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <SettingTeacherTime />
      </div>
    </ErrorBoundary>
  );
}
