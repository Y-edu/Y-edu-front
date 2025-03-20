"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import BulletList from "@/ui/List/BulletList";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import ErrorUI from "@/ui/ErrorUI";

import { TimeTable } from "./TimeTable";

import BackArrow from "public/images/arrow-black.png";

export function SettingTeacherTime() {
  const router = useRouter();
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

  const handleBackClick = () => {
    router.push("/teachersetting");
  };

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

  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <button onClick={handleBackClick} className="flex items-center">
          <Image
            src={BackArrow}
            alt="뒤로가기"
            className="mr-2 size-8 cursor-pointer"
          />
        </button>
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 시간
        </p>
      </div>
      <div className="m-5 rounded-md border border-blue-300 bg-blue-100 p-4">
        <p className="text-sm text-blue-800">
          과외 공지는 설정하신 가능시간과 상관 없이 발송되며,
          <br />
          시간 기반 매칭은 곧 출시 예정이에요 😊
        </p>
      </div>
      <BulletList
        items={[
          "가능시간이 많을수록, 매칭에 유리해요",
          "꼭 3개월 지도 가능한 정기일정을 설정해주세요",
        ]}
        className="mb-10 py-3 pl-[40px]"
      />
      <TimeTable
        initialName={teacherName}
        initialPhoneNumber={teacherPhone}
        initialSelectTime={data.available}
      />
    </div>
  );
}
