import { ErrorBoundary } from "react-error-boundary";

import TeacherSettingLogin from "@/components/teacher/TeacherSetting/TeacherSettingLogin";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherSettingLoginPage() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <TeacherSettingLogin />
      </div>
    </ErrorBoundary>
  );
}
