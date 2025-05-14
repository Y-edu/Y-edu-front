"use client";

import Image from "next/image";

import Button from "@/ui/Button";

import Calender from "public/images/calendar.svg";

export default function SessionCompletePage() {
  return (
    <Button
      leftIcon={<Image src={Calender} width={20} height={20} alt="calender" />}
      className="text-grey-700 w-fit justify-normal gap-1 bg-transparent px-3 py-[6px] text-sm"
    >
      전체 일정 변경
    </Button>
  );
}
