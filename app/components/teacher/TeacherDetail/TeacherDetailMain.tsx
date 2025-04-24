"use client";
import { useSearchParams } from "next/navigation";

import ToggleBox from "@/ui/ToggleBox";

import IconTitleChip from "app/components/teacher/IconTitleChip";
import ProfileInfoBox from "app/components/teacher/ProfileInfoBox";
import { TEACHER_STYLE_ICON } from "app/constants/teacherStyle";
import { SubjectType } from "app/actions/get-teacher-detail";

interface TeacherDetailMainProps {
  comment: string;
  introduce: string;
  teachingHistory: number;
  teachingExperiences: Array<string>;
  foreignExperiences?: Array<string>;
  university: string;
  major: string;
  highSchool: string;
  teachingStyle1: string;
  teachingStyleInfo1: string;
  teachingStyle2: string;
  teachingStyleInfo2: string;
}

export default function TeacherDetailMain(props: TeacherDetailMainProps) {
  const {
    comment,
    introduce,
    teachingHistory,
    teachingExperiences,
    foreignExperiences,
    university,
    major,
    highSchool,
    teachingStyle1,
    teachingStyleInfo1,
    teachingStyle2,
    teachingStyleInfo2,
  } = props;

  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") as SubjectType;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[10px] bg-primaryPale">
        <ProfileInfoBox title={comment}>{introduce}</ProfileInfoBox>
        <ProfileInfoBox
          title={
            <p className="mb-[20px]">
              선생님의 <span className="text-primaryNormal">경력과 경험</span>
              이에요.
            </p>
          }
        >
          <div className="flex flex-col gap-[14px]">
            {highSchool && (
              <ToggleBox
                title="학력"
                items={[`${university} ${major}`, highSchool]}
              />
            )}
            {teachingExperiences && teachingExperiences.length > 0 && (
              <ToggleBox
                title={`${subject === "english" ? "영어" : "수학"} 수업(${teachingHistory}년)`}
                items={teachingExperiences}
              />
            )}
            {foreignExperiences && foreignExperiences.length > 0 && (
              <ToggleBox title="해외 경험" items={foreignExperiences} />
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
                title={teachingStyle1}
                icon={
                  TEACHER_STYLE_ICON[
                    teachingStyle1 as keyof typeof TEACHER_STYLE_ICON
                  ]
                }
              />
              <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                {teachingStyleInfo1}
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <IconTitleChip
                title={teachingStyle2}
                icon={
                  TEACHER_STYLE_ICON[
                    teachingStyle2 as keyof typeof TEACHER_STYLE_ICON
                  ]
                }
              />
              <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                {teachingStyleInfo2}
              </p>
            </div>
          </div>
        </ProfileInfoBox>
      </div>
    </div>
  );
}
