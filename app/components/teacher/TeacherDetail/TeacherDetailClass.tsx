"use client";
import { useParams, useSearchParams } from "next/navigation";

import ProfileInfoBox from "../ProfileInfoBox";
import { useGetTeacherDetailsClass } from "../../../hooks/query/useGetTeacherDetails";
import { SubjectType } from "../../../actions/get-teacher-detail";

export default function TeacherDetailClass() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const subject = searchParams.get("subject") as SubjectType;
  const { data } = useGetTeacherDetailsClass({ teacherId, subject });

  return (
    <div className="flex flex-col gap-[10px] bg-primaryPale">
      {data && (
        <>
          <ProfileInfoBox
            title={
              <div className="flex flex-col gap-1">
                <p>
                  <span className="text-primaryNormal">커리큘럼</span>을
                  안내드려요.
                </p>
                <p className="text-[15px] font-medium leading-[152%] text-labelAssistive">
                  더 자세한 커리큘럼은 매칭 후 선생님이 안내드려요!
                </p>
              </div>
            }
          >
            {data.data.teachingStyle}
          </ProfileInfoBox>
          <ProfileInfoBox
            title={
              <p className="whitespace-pre-line">
                {subject === "english" ? "영어" : "수학"} 역량을 키울 수 있도록
                {"\n"}
                <span className="text-primaryNormal">학생 관리</span>는 이렇게
                해요!
              </p>
            }
          >
            {data.data.managementStyle}
          </ProfileInfoBox>
        </>
      )}
    </div>
  );
}
