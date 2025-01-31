"use client";

import ProfileInfoBox from "../../../../components/teacher/ProfileInfoBox";

export default function TeacherPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ProfileInfoBox title="예시 텍스트입니다.">
        예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다.
        예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다. 예시텍스트입니다.
        예시텍스트입니다.
        {params.id}
      </ProfileInfoBox>
    </div>
  );
}
