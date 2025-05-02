"use client";
import ProfileInfoBox from "app/components/teacher/ProfileInfoBox";
import { getYoutubeEmbedLink } from "app/utils/getYoutubeEmbedLink";

interface TeacherDetailClassProps {
  teachingStyle: string;
  video?: string;
}

export default function TeacherDetailClass(props: TeacherDetailClassProps) {
  const { teachingStyle, video } = props;

  return (
    <div className="flex flex-col gap-[10px] bg-primaryPale pb-[10px]">
      <ProfileInfoBox
        title={
          <div className="flex flex-col gap-1">
            <p>
              <span className="text-primaryNormal">커리큘럼</span>을 안내드려요.
            </p>
            <p className="text-[15px] font-medium leading-[152%] text-labelAssistive">
              더 자세한 커리큘럼은 매칭 후 선생님이 안내드려요!
            </p>
          </div>
        }
      >
        {teachingStyle}
      </ProfileInfoBox>

      {video && (
        <ProfileInfoBox
          title={
            <p>
              <span className="text-primaryNormal">선생님 스피킹 영상</span>
              이에요.
            </p>
          }
        >
          <iframe
            width={335}
            height={188}
            src={getYoutubeEmbedLink(video)}
            className="rounded-xl"
            title="선생님 스피킹 영상"
          />
        </ProfileInfoBox>
      )}
    </div>
  );
}
