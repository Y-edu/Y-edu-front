"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

import SettingBox from "@/ui/Box/SettingBox";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingAlarmTalk } from "@/hooks/mutation/usePatchTeacherSettingAlarmTalk";
import { formatAvailableTimes } from "@/utils/formatAvailableTimes";

export default function TeacherSettingMain() {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("teacherName") || "";
    const storedPhone = localStorage.getItem("teacherPhone") || "";

    if (!storedName || !storedPhone) {
      alert("로그인하세요");
      router.push("/teachersetting/login");
      return;
    }

    setTeacherName(storedName);
    setTeacherPhone(storedPhone);
  }, [router]);

  const { data, isLoading } = useGetTeacherSettingInfo({
    name: teacherName,
    phoneNumber: teacherPhone,
  });

  const { mutate: patchAlarmTalk } = usePatchTeacherSettingAlarmTalk();

  useEffect(() => {
    if (data) {
      setIsToggled(data.alarmTalk);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (!data) return <div>Error occurred</div>;

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsToggled(newValue);
    patchAlarmTalk({
      name: teacherName,
      phoneNumber: teacherPhone,
      alarmTalk: newValue,
    });
  };

  const chunkArray = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const chunked = chunkArray(data.districts, 5);
  const districtStr = chunked.map((chunk) => chunk.join(", ")).join("\n");

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
            {isToggled
              ? "지역에 맞는 과외건 공지 메세지를 받습니다."
              : "과외건 공지 메세지를 받지 않습니다."}
          </span>
        </SettingBox>
        <Link href="/teachersetting/region">
          <SettingBox title="과외 가능지역">
            <span className="whitespace-pre-line text-labelAssistive">
              {districtStr}
            </span>
          </SettingBox>
        </Link>
        <Link href="/teachersetting/time">
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
