"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SettingBox from "@/ui/Box/SettingBox";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingAlarmTalk } from "@/hooks/mutation/usePatchTeacherSettingAlarmTalk";
import { formatAvailableTimes } from "@/utils/formatAvailableTimes";

export default function TeacherSettingMain() {
  const [isToggled, setIsToggled] = useState(false);

  const teacherName = "김기동";
  const teacherPhone = "01087654321";

  const { data, isLoading, error } = useGetTeacherSettingInfo({
    name: teacherName,
    phoneNumber: teacherPhone,
  });

  const { mutate: patchAlarmTalk } = usePatchTeacherSettingAlarmTalk();

  useEffect(() => {
    if (data) {
      setIsToggled(data.alarmTalk);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error occurred</div>;

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsToggled(newValue);
    patchAlarmTalk({
      name: teacherName,
      phoneNumber: teacherPhone,
      alarmTalk: newValue,
    });
  };

  const districtStr = data.districts.join(", ");

  return (
    <div>
      <p className="border-b border-primaryPale pb-5 pt-10 text-center font-pretendard text-xl font-bold text-labelStrong">
        {data.name} 선생님 과외 설정
      </p>
      <div className="flex flex-col gap-[2px] bg-primaryPale">
        <SettingBox
          title="활동상태"
          isToggle
          toggleChecked={isToggled}
          onToggleChange={handleToggleChange}
        >
          <span className="text-labelAssistive">
            {isToggled ? "활동중" : "비활동"}
          </span>
        </SettingBox>
        <Link href="/teachersetting/region">
          <SettingBox title="과외 가능지역">
            <span className="text-labelAssistive">{districtStr}</span>
          </SettingBox>
        </Link>
        <Link
          href={`/teachersetting/time?name=${teacherName}&phoneNumber=${teacherPhone}$available=${JSON.stringify(data.available)}`}
        >
          <SettingBox title="과외 가능시간">
            <span className="whitespace-pre-line text-labelAssistive">
              {formatAvailableTimes(data.available).join("\n")}
            </span>
          </SettingBox>
        </Link>
      </div>
    </div>
  );
}
