import { ErrorBoundary } from "react-error-boundary";

import TeacherSettingMain from "@/components/teacher/TeacherSetting/TeacherSettingMain";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherSettingMainPage() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <TeacherSettingMain />
      </div>
    </ErrorBoundary>
  );
}
