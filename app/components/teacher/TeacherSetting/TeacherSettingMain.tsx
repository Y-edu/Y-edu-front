"use client";
import Link from "next/link";
import { useState } from "react";

import SettingBox from "@/ui/Box/SettingBox";

export default function TeacherSettingMain() {
  const teacherId = "123";
  const teacherPhone = "01012345678";

  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(event.target.checked);
  };

  return (
    <div>
      <p className="border-b border-primaryPale pb-5 pt-10 text-center font-pretendard text-xl font-bold text-labelStrong">
        크리스 선생님 과외 설정
      </p>
      <div className="flex flex-col gap-[2px] bg-primaryPale">
        <SettingBox
          title="활동상태"
          isToggle
          toggleChecked={isToggled}
          onToggleChange={handleToggleChange}
        >
          <span className="text-labelAssistive">활동중</span>
        </SettingBox>
        <Link href={`/teachersetting/${teacherId}/${teacherPhone}/region`}>
          <SettingBox title="과외 가능지역">
            <span className="text-labelAssistive">
              동작구, 서초구, 성북구, 양천구, 인천, 분당, 온라인
            </span>
          </SettingBox>
        </Link>
        <Link href={`/teachersetting/${teacherId}/${teacherPhone}/time`}>
          <SettingBox title="과외 가능시간">
            <span className="whitespace-pre-line text-labelAssistive">
              월: 19시 - 23시{"\n"}
              화: 21시 - 23시{"\n"}
              수: 11시 - 13시, 19시 - 23시{"\n"}
              목: 12시 - 22시{"\n"}
              금: 13시 - 15시, 19시 - 21시{"\n"}
              토: 9시 - 11시, 12시 - 14시, 15시 - 19시
            </span>
          </SettingBox>
        </Link>
      </div>
    </div>
  );
}
