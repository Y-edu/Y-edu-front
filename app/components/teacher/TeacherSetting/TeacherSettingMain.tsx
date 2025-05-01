"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

import SettingBox from "@/ui/Box/SettingBox";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingAlarmTalk } from "@/hooks/mutation/usePatchTeacherSettingAlarmTalk";
import { Modal } from "@/ui/Modal";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherSettingMain() {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const isQueryEnabled = Boolean(teacherName && teacherPhone);
  const { data, isLoading, isError } = useGetTeacherSettingInfo(
    {
      name: teacherName,
      phoneNumber: teacherPhone,
    },
    {
      enabled: isQueryEnabled,
    },
  );

  const { mutate: patchAlarmTalk } = usePatchTeacherSettingAlarmTalk();

  useEffect(() => {
    if (data) {
      setIsToggled(data.alarmTalk);
    }
  }, [data]);

  if (!isQueryEnabled) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorUI />;
  }

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (!newValue) {
      setShowModal(true);
    } else {
      setIsToggled(true);
      patchAlarmTalk({
        name: teacherName,
        phoneNumber: teacherPhone,
        alarmTalk: true,
      });
    }
  };

  const chunkArray = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const chunked = chunkArray(data.districts, 5);
  const districtStr = chunked.map((chunk) => chunk.join(", ")).join("\n");

  return (
    <div>
      <Modal
        isOpen={showModal}
        title="과외 공지 수신을 중단할까요?"
        message={`수신 중단 시, 더 이상 선생님께 카톡으로\n과외 공지를 전송드리지 않아요.`}
        confirmText="중단"
        cancelText="계속 받기"
        handleOnConfirm={() => {
          setIsToggled(false);
          patchAlarmTalk({
            name: teacherName,
            phoneNumber: teacherPhone,
            alarmTalk: false,
          });
          setShowModal(false);
        }}
        handleOnCancel={() => {
          setIsToggled(true);
          setShowModal(false);
        }}
      />
      <p className="border-b border-primaryPale pb-5 pt-10 text-center font-pretendard text-xl font-bold text-labelStrong">
        {data.name} 선생님 과외 설정
      </p>
      <div className="flex flex-col gap-[2px] bg-primaryPale">
        <SettingBox
          title="과외 공지 받기"
          isToggle
          toggleChecked={isToggled}
          onToggleChange={handleToggleChange}
        >
          <span className="text-primary">
            {isToggled
              ? "카카오톡으로 과외 공지를 받을 수 있어요."
              : "카카오톡으로 과외 공지를 받을 수 없어요."}
          </span>
        </SettingBox>
        <Link href="/teachersetting/region">
          <SettingBox title="과외 가능지역">
            <span className="whitespace-pre-line text-primary">
              {districtStr}
            </span>
          </SettingBox>
        </Link>
        <Link href="/teachersetting/time">
          <SettingBox title="과외 가능시간">
            <span className="text-primary">
              {Object.entries(data.available)
                .filter(([, times]) => times.length > 0)
                .map(([day]) => day)
                .join(", ")}
            </span>
          </SettingBox>
        </Link>
      </div>
    </div>
  );
}
