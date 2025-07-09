"use client";
import { useEffect } from "react";

import { useRecommendStore } from "@/store/teacher/recommend/useRecommendStore";
import TeacherDetailRegionTime from "@/components/teacher/TeacherDetail/TeacherDetailRegionTime";
import ProfileTop from "@/components/teacher/ProfileTop";
import TeacherDetailClass from "@/components/teacher/TeacherDetail/TeacherDetailClass";
import TeacherDetailMain from "@/components/teacher/TeacherDetail/TeacherDetailMain";
import TabBar from "@/ui/Bar/TabBar";
import SelectBtn from "@/components/teacher/TeacherDetail/SelectBtn";
import { useGetTeacherAllDetails } from "@/hooks/query/useGetTeacherAllDetails";

export default function TeacherRecommendPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const { data } = useGetTeacherAllDetails({ token });

  const { setClassTime, setClassCount, setAvailable } = useRecommendStore();

  useEffect(() => {
    if (data) {
      setClassTime(data.classTime);
      setClassCount(data.classCount);
      setAvailable(data.available);
    }
  }, [data, setClassTime, setClassCount, setAvailable]);

  return (
    data && (
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
        <SelectBtn />
      </div>
    )
  );
}
