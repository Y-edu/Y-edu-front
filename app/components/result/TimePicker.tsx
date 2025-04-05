"use client";

import { useRef, useState } from "react";

import cn from "@/utils/cn";
import Button from "@/ui/Button";

const ITEM_HEIGHT = 56;

const OPTIONS = {
  period: ["오전", "오후"],
  hour: Array.from({ length: 12 }, (_, i) => String(i + 1)),
  minute: Array.from(
    { length: 12 },
    (_, i) => `${i * 5}`.padStart(2, "0") + " 부터",
  ),
  duration: ["50분 진행", "60분 진행", "70분 진행"],
};

type OptionKey = keyof typeof OPTIONS;

export default function TimePickerSnap() {
  const [selected, setSelected] = useState({
    period: "오후",
    hour: "1",
    minute: "00 부터",
    duration: "50분 진행",
  });

  const columnRefs = useRef<Record<OptionKey, HTMLDivElement | null>>({
    period: null,
    hour: null,
    minute: null,
    duration: null,
  });

  const scrollTimers = useRef<Record<OptionKey, NodeJS.Timeout | null>>({
    period: null,
    hour: null,
    minute: null,
    duration: null,
  });

  const handleScroll = (key: OptionKey) => {
    const el = columnRefs.current[key];
    if (!el) return;

    if (scrollTimers.current[key]) {
      clearTimeout(scrollTimers.current[key]);
    }

    scrollTimers.current[key] = setTimeout(() => {
      const scrollTop = el.scrollTop;
      const index = Math.floor(scrollTop / ITEM_HEIGHT);
      const newValue = OPTIONS[key][index];

      if (newValue && newValue !== selected[key]) {
        setSelected((prev) => ({ ...prev, [key]: newValue }));
      }
    }, 80);
  };

  const renderColumn = (key: OptionKey) => (
    <div
      ref={(el) => {
        columnRefs.current[key] = el;
      }}
      onScroll={() => handleScroll(key)}
      className="relative h-[160px] snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[calc(50%-20px)] h-[40px]" />
      <div className="flex w-fit flex-col items-center py-[56px]">
        {OPTIONS[key].map((opt) => (
          <div
            key={opt}
            className={cn(
              "flex h-[56px] w-full min-w-[56px] snap-center items-center justify-center whitespace-nowrap px-[14px] text-[16px] font-medium transition-all",
              selected[key] === opt
                ? "border-y-2 border-gray-200 text-gray-900"
                : "text-[#C9CBCF]",
            )}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white p-[20px]">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">수업 시간</h2>
      <div className="mb-[40px] flex items-center justify-center gap-[12px]">
        {renderColumn("period")}
        <div className="relative">
          {renderColumn("hour")}
          <span className="absolute right-[-10px] top-[40%] text-[20px] font-bold">
            :
          </span>
        </div>
        {renderColumn("minute")}
        {renderColumn("duration")}
      </div>

      <Button>선택</Button>
    </div>
  );
}
