"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import BulletList from "@/ui/List/BulletList";
import ProfileInfoBox from "@/components/teacher/ProfileInfoBox";
import { buttonLabels } from "@/constants/buttonLabels";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";

import BackArrow from "public/images/arrow-black.png";

const teacherName = "김기동";
const teacherPhone = "01087654321";

const arraysEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, i) => val === sortedB[i]);
};

export default function TeacherSettingRegion() {
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [initialActive, setInitialActive] = useState<number[]>([]);

  const { data, isLoading, error } = useGetTeacherSettingInfo({
    name: teacherName,
    phoneNumber: teacherPhone,
  });

  useEffect(() => {
    if (data) {
      const initial = buttonLabels.reduce<number[]>((acc, label, index) => {
        return data.districts.includes(label) ? [...acc, index] : acc;
      }, []);
      setActiveButtons(initial);
      setInitialActive(initial);
    }
  }, [data]);

  const onClickButton = (index: number) =>
    setActiveButtons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  const buttons = useMemo(
    () =>
      buttonLabels.map((label, index) => {
        const isActive = activeButtons.includes(index);
        const btnClass = isActive
          ? "bg-primaryNormal text-white"
          : "bg-[#eeeeee] text-labelAssistive";
        return (
          <button
            key={index}
            onClick={() => onClickButton(index)}
            className={`${btnClass} h-[48px] rounded-[12px]`}
          >
            {label}
          </button>
        );
      }),
    [activeButtons],
  );

  const hasChanges = useMemo(
    () => !arraysEqual(activeButtons, initialActive),
    [activeButtons, initialActive],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error occurred</div>;

  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <Link href="/teachersetting">
          <Image
            src={BackArrow}
            alt="뒤로가기"
            className="mr-2 size-8 cursor-pointer"
          />
        </Link>
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 지역
        </p>
      </div>
      <ProfileInfoBox
        title={`${data.name} 선생님의 과외 가능지역`}
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
        <button
          disabled={!hasChanges}
          className={`h-[48px] w-full rounded-[12px] ${
            hasChanges
              ? "bg-primaryNormal text-white"
              : "bg-[#eeeeee] text-labelAssistive"
          }`}
        >
          <span>변경된 지역 저장</span>
        </button>
      </div>
    </div>
  );
}
