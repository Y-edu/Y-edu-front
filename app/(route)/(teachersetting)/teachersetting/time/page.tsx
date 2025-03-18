"use client";

import { useSearchParams } from "next/navigation";

import { SettingTeacherTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherTimeSetting() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phoneNumber");
  const name = searchParams.get("name");
  const available = JSON.parse(searchParams.get("available") as string);

  if (!phone || !name || !available) {
    return <ErrorUI />;
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
