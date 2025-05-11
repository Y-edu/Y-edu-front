"use client";

import Image from "next/image";
import Calender from "public/images/calendar.svg";

import Button from "@/ui/Button";

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
