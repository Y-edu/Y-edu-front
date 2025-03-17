"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import BulletList from "@/ui/List/BulletList";

import { TimeTable } from "./TimeTable";

import BackArrow from "public/images/arrow-black.png";

interface SettingTeacherTimeProps {
  name: string;
  phoneNumber: string;
  available: Record<string, string[]>;
}

export function SettingTeacherTime({
  name,
  phoneNumber,
  available,
}: SettingTeacherTimeProps) {
  const router = useRouter();
  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <Image
          onClick={() => router.back()}
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
      <BulletList
        items={[
          "선택 후 다시 누르면 해당 시간이 취소됩니다",
          "변경된 시간 저장 버튼을 눌러 저장하세요",
        ]}
        className="mb-10 py-3 pl-10"
      />
      <TimeTable
        initialName={name}
        initialPhoneNumber={phoneNumber}
        initialSelectTime={available}
      />
    </div>
  );
}
