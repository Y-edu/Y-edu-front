"use client";

import { useSearchParams } from "next/navigation";

import { SettingTeacherTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";

export default function TeacherTimeSetting() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phoneNumber");
  const name = searchParams.get("name");
  const available = JSON.parse(searchParams.get("available") as string);

  if (!phone || !name || !available) {
    return <div>올바른 선생님이 아닙니다</div>;
  }
  return (
    <div className="w-full">
      <SettingTeacherTime
        name={name}
        phoneNumber={phone}
        available={available}
      />
    </div>
  );
}
