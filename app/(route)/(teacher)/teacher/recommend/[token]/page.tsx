"use client"; // client component 분리는 리팩토링때 진행하겠습니다 😅
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TeacherDetailRegionTime from "@/components/teacher/TeacherDetail/TeacherDetailRegionTime";
import ProfileTop from "@/components/teacher/ProfileTop";
import TeacherDetailClass from "@/components/teacher/TeacherDetail/TeacherDetailClass";
import TeacherDetailMain from "@/components/teacher/TeacherDetail/TeacherDetailMain";
import TabBar from "@/ui/Bar/TabBar";
import ErrorUI from "@/ui/ErrorUI";
import { useGetTeacherAllDetails } from "@/hooks/query/useGetTeacherAllDetails";
import Button from "@/ui/Button";
import { useRecommendStore } from "@/store/teacher/recommend/useRecommendStore";

export default function TeacherPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { token } = params;
  const { data, error } = useGetTeacherAllDetails({ token });
  const { setClassTime, setClassCount, setAvailable } = useRecommendStore();

  if (error) throw error;

  useEffect(() => {
    if (data) {
      setClassTime(data.classTime);
      setClassCount(data.classCount);
      setAvailable(data.available);
    }
  }, [data, setClassTime, setClassCount, setAvailable]);

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      {data && (
        <div className="w-full pb-[60px]">
          <ProfileTop profile={data.profile} nickName={data.nickName} />
          <TabBar
            scrollMode
            tabs={[
              {
                trigger: "선생님",
                content: (
                  <TeacherDetailMain
                    comment={data.comment}
                    introduce={data.introduce}
                    teachingHistory={data.teachingHistory}
                    teachingExperiences={data.teachingExperiences}
                    foreignExperiences={data.foreignExperiences}
                    university={data.university}
                    major={data.major}
                    highSchool={data.highSchool}
                    teachingStyle1={data.teachingStyle1}
                    teachingStyleInfo1={data.teachingStyleInfo1}
                    teachingStyle2={data.teachingStyle2}
                    teachingStyleInfo2={data.teachingStyleInfo2}
                  />
                ),
              },
              {
                trigger: "수업",
                content: (
                  <TeacherDetailClass
                    teachingStyle={data.teachingStyle}
                    video={data.video}
                  />
                ),
              },
              {
                trigger: "지역/시간",
                content: (
                  <TeacherDetailRegionTime
                    districts={data.districts}
                    available={data.available}
                  />
                ),
              },
            ]}
          />
          <Button
            className="fixed bottom-[10px] left-1/2 z-50 w-[335px] -translate-x-1/2"
            onClick={() => {
              router.push(`/teacher/recommend/${token}/select-time`);
            }}
          >
            이 선생님과 할래요
          </Button>
        </div>
      )}
    </ErrorBoundary>
  );
}
