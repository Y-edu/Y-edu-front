"use client";
import { useParams, useSearchParams } from "next/navigation";
import data from "../../../data/teacherDetailClass.json";
import ProfileInfoBox from "../ProfileInfoBox";

export default function TeacherDetailClass() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teacherId = params.id;
  const subject = searchParams.get("subject");

  return (
    <div className="flex flex-col gap-[10px] bg-primaryPale">
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
        {data.data.teachingStyle}
      </ProfileInfoBox>
      {/* 과목 처리 필요(영어, 수학) */}
      <ProfileInfoBox
        title={
          <p className="whitespace-pre-line">
            영여 역량을 키울 수 있도록{"\n"}
            <span className="text-primaryNormal">학생 관리</span>는 이렇게 해요!
          </p>
        }
      >
        {data.data.managementStyle}
      </ProfileInfoBox>
    </div>
  );
}
