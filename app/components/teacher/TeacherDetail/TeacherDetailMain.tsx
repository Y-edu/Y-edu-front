"use client";
import { useParams, useSearchParams } from "next/navigation";

import { TEACHER_STYLE_ICON } from "../../../constants/teacherStyle";
import BulletList from "../../../ui/List/BulletList";
import DividerList from "../../../ui/List/DividerList";
import ToggleBox from "../../../ui/ToggleBox";
import IconTitleChip from "../IconTitleChip";
import ProfileInfoBox from "../ProfileInfoBox";
import { useGetTeacherDetailsTeacher } from "../../../hooks/query/useGetTeacherDetails";
import { SubjectType } from "../../../actions/get-teacher-detail";

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
        <>
          <DividerList textList={data.data.appealPoints} />
          <div className="flex flex-col gap-[10px] bg-primaryPale">
            <ProfileInfoBox title={data.data.comment}>
              {data.data.introduce}
            </ProfileInfoBox>
            <ProfileInfoBox
              title={
                <p>
                  선생님의{" "}
                  <span className="text-primaryNormal">경력과 경험</span>
                  이에요.
                </p>
              }
            >
              <div className="flex flex-col gap-[14px]">
                <ToggleBox
                  title="학력"
                  items={[
                    `${data.data.university} ${data.data.major}`,
                    data.data.highSchool,
                  ]}
                />
                <ToggleBox
                  title={`${subject === "english" ? "영어" : "수학"} 수업(${data.data.teachingHistory}년)`}
                  items={data.data.teachingExperiences}
                />
                {data.data.foreignExperiences && (
                  <ToggleBox
                    title="해외 경험"
                    items={data.data.foreignExperiences}
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
                <div className="flex flex-col gap-[12px]">
                  <IconTitleChip
                    title={data.data.teachingStyle1}
                    icon={
                      TEACHER_STYLE_ICON[
                        data.data
                          .teachingStyle1 as keyof typeof TEACHER_STYLE_ICON
                      ]
                    }
                  />
                  <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                    {data.data.teachingStyleInfo1}
                  </p>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <IconTitleChip
                    title={data.data.teachingStyle2}
                    icon={
                      TEACHER_STYLE_ICON[
                        data.data
                          .teachingStyle2 as keyof typeof TEACHER_STYLE_ICON
                      ]
                    }
                  />
                  <p className="text-[15px] leading-[156%] tracking-[-0.02em] text-labelNormal">
                    {data.data.teachingStyleInfo2}
                  </p>
                </div>
              </div>
            </ProfileInfoBox>
            <ProfileInfoBox title="이런 학생에게 잘 맞아요!">
              <BulletList items={data.data.recommendStudents} />
            </ProfileInfoBox>
          </div>
        </>
      )}
    </div>
  );
}
