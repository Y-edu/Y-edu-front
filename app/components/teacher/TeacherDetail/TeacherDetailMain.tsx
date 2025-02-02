"use client";
import { useParams, useSearchParams } from "next/navigation";
import { TEACHER_STYLE_ICON } from "../../../constants/teacherStyle";
import data from "../../../data/teacherDetailMain.json";
import BulletList from "../../../ui/List/BulletList";
import DividerList from "../../../ui/List/DividerList";
import ToggleBox from "../../../ui/ToggleBox";
import IconTitleChip from "../IconTitleChip";
import ProfileInfoBox from "../ProfileInfoBox";

export default function TeacherDetailMain() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teacherId = params.id;
  const subject = searchParams.get("subject");

  return (
    <div className="w-full">
      <DividerList textList={data.data.appealPoint} />
      <div className="flex flex-col gap-[10px] bg-primaryPale">
        <ProfileInfoBox title={data.data.comment}>
          {data.data.introduce}
        </ProfileInfoBox>
        <ProfileInfoBox
          title={
            <p>
              선생님의 <span className="text-primaryNormal">경력과 경험</span>
              이에요.
            </p>
          }
        >
          <div className="flex flex-col gap-[14px]">
            <ToggleBox
              title={`영어(${data.data.teachingHistory}년)`}
              items={data.data.teachingExperience.map(
                (item) => `${item.experience} ${item.period}`,
              )}
            />
            <ToggleBox
              title="해외 경험"
              items={data.data.foreignExperience.map(
                (item) => `${item.experience} ${item.period}`,
              )}
            />
            <ToggleBox
              title="학력"
              items={[
                `${data.data.university} ${data.data.major}`,
                data.data.highSchool,
              ]}
            />
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
                    data.data.teachingStyle1 as keyof typeof TEACHER_STYLE_ICON
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
                    data.data.teachingStyle2 as keyof typeof TEACHER_STYLE_ICON
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
          <BulletList items={data.data.recommendStudent} />
        </ProfileInfoBox>
      </div>
    </div>
  );
}
