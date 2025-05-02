"use client"; // client component 분리는 리팩토링때 진행하겠습니다 😅
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "next/navigation";

import TeacherDetailRegionTime from "@/components/teacher/TeacherDetail/TeacherDetailRegionTime";
import ProfileTop from "@/components/teacher/ProfileTop";
import TeacherDetailClass from "@/components/teacher/TeacherDetail/TeacherDetailClass";
import TeacherDetailMain from "@/components/teacher/TeacherDetail/TeacherDetailMain";
import TabBar from "@/ui/Bar/TabBar";
import ErrorUI from "@/ui/ErrorUI";
import { SubjectType } from "@/actions/get-teacher-detail";
import { useGetTeacherAllDetailsByTeacherId } from "@/hooks/query/useGetTeacherDetails";

export default function TeacherIdPage({ params }: { params: { id: string } }) {
  const { id: teacherId } = params;
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") as SubjectType;
  const { data, isLoading, error } = useGetTeacherAllDetailsByTeacherId({
    teacherId,
    subject,
  });

  if (isLoading) return null;
  if (error) return <ErrorUI />;

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      {data && (
        <div className="w-full pb-[60px]">
          <ProfileTop
            profile={data.profile || ""}
            nickName={data.nickName || ""}
          />
          <TabBar
            tabs={[
              {
                trigger: "선생님",
                content: (
                  <TeacherDetailMain
                    comment={data.comment || ""}
                    introduce={data.introduce || ""}
                    teachingHistory={data.teachingHistory || 0}
                    teachingExperiences={data.teachingExperiences || []}
                    foreignExperiences={data.foreignExperiences}
                    university={data.university || ""}
                    major={data.major || ""}
                    highSchool={data.highSchool || ""}
                    teachingStyle1={data.teachingStyle1 || ""}
                    teachingStyleInfo1={data.teachingStyleInfo1 || ""}
                    teachingStyle2={data.teachingStyle2 || ""}
                    teachingStyleInfo2={data.teachingStyleInfo2 || ""}
                  />
                ),
              },
              {
                trigger: "수업",
                content: (
                  <TeacherDetailClass
                    teachingStyle={data.teachingStyle || ""}
                    video={data.video}
                  />
                ),
              },
              {
                trigger: "지역/시간",
                content: (
                  <TeacherDetailRegionTime
                    districts={data.districts || []}
                    available={
                      data.available || {
                        월: [],
                        화: [],
                        수: [],
                        목: [],
                        금: [],
                        토: [],
                        일: [],
                      }
                    }
                  />
                ),
              },
            ]}
          />
        </div>
      )}
    </ErrorBoundary>
  );
}
