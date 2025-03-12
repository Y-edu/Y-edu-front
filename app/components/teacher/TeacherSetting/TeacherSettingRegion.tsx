"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BulletList from "@/ui/List/BulletList";
import ProfileInfoBox from "@/components/teacher/ProfileInfoBox";
import { buttonLabels } from "@/constants/buttonLabels";

import BackArrow from "public/images/arrow-black.png";

export default function TeacherSettingRegion() {
  const router = useRouter();
  const [activeButtons, setActiveButtons] = useState<number[]>([]);

  const toggleButton = (index: number) => {
    setActiveButtons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const buttons = buttonLabels.map((label, index) => {
    const isActive = activeButtons.includes(index);
    const buttonClass = isActive
      ? "bg-primaryNormal text-white"
      : "bg-[#eeeeee] text-labelAssistive";

    return (
      <button
        key={index}
        onClick={() => toggleButton(index)}
        className={`${buttonClass} h-[48px] rounded-[12px]`}
      >
        {label}
      </button>
    );
  });

  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <Image
          onClick={() => router.back()}
          src={BackArrow}
          alt="뒤로가기"
          className="mr-2 size-8 cursor-pointer"
        />
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 지역
        </p>
      </div>
      <ProfileInfoBox
        title="크리스 선생님의 과외 가능지역"
        className="!gap-[4px]"
      >
        <span className="text-labelAssistive">
          가능 지역을 최신 상태로 유지하면 매칭 확률이 높아져요.
        </span>
        <BulletList
          items={[
            "지역 수정하기 버튼 클릭 후 가능 지역을 수정하세요.",
            "변경된 지역 저장 버튼을 눌러야 최종 저장됩니다.",
          ]}
          className="pt-[14px]"
        />
      </ProfileInfoBox>
      <div className="grid h-auto w-full grid-cols-3 grid-rows-11 gap-3 bg-white px-5 pb-[40px]">
        {buttons}
      </div>
      <div className="flex h-auto w-full bg-white px-5 pb-[30px]">
        <button className="h-[48px] w-full rounded-[12px] bg-primaryNormal text-white">
          <span className="text-white">변경된 지역 저장</span>
        </button>
      </div>
    </div>
  );
}
