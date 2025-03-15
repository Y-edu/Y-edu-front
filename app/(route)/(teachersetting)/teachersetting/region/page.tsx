import { ErrorBoundary } from "react-error-boundary";

import TeacherSettingRegion from "@/components/teacher/TeacherSetting/TeacherSettingRegion";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherRegionSettingPage() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <TeacherSettingRegion />
      </div>
    </ErrorBoundary>
  );
}
