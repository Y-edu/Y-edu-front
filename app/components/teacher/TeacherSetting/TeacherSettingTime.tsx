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

  const { data, isLoading } = useGetTeacherSettingInfo({
    name: teacherName,
    phoneNumber: teacherPhone,
  });

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (!data) return <ErrorUI />;

  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <Image
          onClick={() => router.push("/teachersetting")}
          src={BackArrow}
          width={24}
          height={24}
          alt="뒤로가기"
          className="mr-2 size-8 cursor-pointer"
        />
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 시간
        </p>
      </div>
      <div className="m-4 rounded-md border border-blue-300 bg-blue-100 p-4">
        <p className="text-sm text-blue-800">
          현재, 가능 시간과 관계 없이 모든 과외건 공지가 전송되며, 추후 설정한
          시간에 맞는 공지를 받을 수 있도록 기능이 추가될 예정이에요.😊
        </p>
      </div>
      <BulletList
        items={[
          "선택 후 다시 누르면 해당 시간이 취소됩니다",
          "변경된 시간 저장 버튼을 눌러 저장하세요",
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
