"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import BulletList from "@/ui/List/BulletList";
import ProfileInfoBox from "@/components/teacher/ProfileInfoBox";

import { TimeTable } from "./TimeTable";

import BackArrow from "public/images/arrow-black.png";

export function SettingTeacherTime() {
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
      <ProfileInfoBox
        title="크리스 선생님의 과외 가능 시간"
        className="gap-[4px]"
      >
        <span className="text-labelAssistive">
          가능 시간을 최신 상태로 유지하면 매칭 확률이 늘어나요
        </span>
        <BulletList
          items={[
            "선택하려는 시간의 시작과 끝 시간을 누르세요",
            "한 칸만 선택하려면 해당 칸을 두 번 누르세요",
            "선택된 영역을 다시 누르면 해당 영역이 취소됩니다",
            "변경 후 아래 저장 버튼을 클릭해 저장하세요",
          ]}
          className="pt-[14px]"
        />
        <TimeTable />
      </ProfileInfoBox>
      <div className="grid h-auto w-full grid-cols-3 grid-rows-11 gap-3 bg-white px-5 pb-[30px]" />
      <div className="flex h-auto w-full bg-white px-5 pb-[30px]">
        <button className="h-[48px] w-full rounded-[12px] bg-primaryNormal text-white">
          <span className="text-white">변경된 시간 저장</span>
        </button>
      </div>
    </div>
  );
}
