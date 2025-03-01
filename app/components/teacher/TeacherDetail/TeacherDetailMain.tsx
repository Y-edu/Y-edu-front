"use client";
import { useParams, useSearchParams } from "next/navigation";

import ToggleBox from "@/ui/ToggleBox";

import IconTitleChip from "app/components/teacher/IconTitleChip";
import ProfileInfoBox from "app/components/teacher/ProfileInfoBox";
import { TEACHER_STYLE_ICON } from "app/constants/teacherStyle";
import { useGetTeacherDetailsTeacher } from "app/hooks/query/useGetTeacherDetails";
import { SubjectType } from "app/actions/get-teacher-detail";

export default function TeacherDetailMain() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const subject = searchParams.get("subject") as SubjectType;
  const { data, error } = useGetTeacherDetailsTeacher({
    teacherId,
    subject,
  });

  if (error) throw error;

  return (
    <div className="w-full">
      {data && (
        <div className="flex flex-col gap-[10px] bg-primaryPale">
          <ProfileInfoBox title={data.comment}>{data.introduce}</ProfileInfoBox>
          <ProfileInfoBox
            title={
              <p className="mb-[20px]">
                선생님의 <span className="text-primaryNormal">경력과 경험</span>
                이에요.
              </p>
            }
          >
            <div className="flex flex-col gap-[14px]">
              {data.highSchool && (
                <ToggleBox
                  title="학력"
                  items={[`${data.university} ${data.major}`, data.highSchool]}
                />
              )}
              {data.teachingExperiences &&
                data.teachingExperiences.length > 0 && (
                  <ToggleBox
                    title={`${subject === "english" ? "영어" : "수학"} 수업(${data.teachingHistory}년)`}
                    items={data.teachingExperiences}
                  />
                )}
              {data.foreignExperiences &&
                data.foreignExperiences.length > 0 && (
                  <ToggleBox
                    title="해외 경험"
                    items={data.foreignExperiences}
                  />
                )}
            </div>
          </ProfileInfoBox>
          <ProfileInfoBox
            title={
              <p>
                이런 <span className="text-primaryNormal">스타일</span>의
                선생님이에요.
              </p>
            }
          >
            <div className="flex flex-col gap-[22px]">
              <div className="mt-[18px] flex flex-col gap-[12px]">
                <IconTitleChip
                  title={data.teachingStyle1}
                  icon={
                    TEACHER_STYLE_ICON[
                      data.teachingStyle1 as keyof typeof TEACHER_STYLE_ICON
                    ]
                  }
                />
                <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                  {data.teachingStyleInfo1}
                </p>
              </div>
              <div className="flex flex-col gap-[12px]">
                <IconTitleChip
                  title={data.teachingStyle2}
                  icon={
                    TEACHER_STYLE_ICON[
                      data.teachingStyle2 as keyof typeof TEACHER_STYLE_ICON
                    ]
                  }
                />
                <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                  {data.teachingStyleInfo2}
                </p>
              </div>
            </div>
          </ProfileInfoBox>
        </div>
      )}
    </div>
  );
}
