import { ErrorBoundary } from "react-error-boundary";

import TeacherDetailRegionTime from "@/components/teacher/TeacherDetail/TeacherDetailRegionTime";
import ProfileTop from "@/components/teacher/ProfileTop";
import TeacherDetailClass from "@/components/teacher/TeacherDetail/TeacherDetailClass";
import TeacherDetailMain from "@/components/teacher/TeacherDetail/TeacherDetailMain";
import TabBar from "@/ui/Bar/TabBar";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherPage() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div className="w-full">
        <ProfileTop />
        <TabBar
          tabs={[
            { trigger: "선생님", content: <TeacherDetailMain /> },
            { trigger: "수업", content: <TeacherDetailClass /> },
            { trigger: "지역/시간", content: <TeacherDetailRegionTime /> },
          ]}
        />
      </div>
    </ErrorBoundary>
  );
}
