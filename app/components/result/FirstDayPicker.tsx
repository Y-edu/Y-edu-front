"use client";

import { useRef, useState } from "react";
import { getDaysInMonth } from "date-fns";

import cn from "@/utils/cn";
import Button from "@/ui/Button";

import { FirstDay } from "./ConfirmedResult";

const ITEM_HEIGHT = 56;

const today = new Date();
const year = today.getFullYear();
const currentMonth = today.getMonth();

function getDaysArray(year: number, month: number): string[] {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
}

const monthOptions = Array.from({ length: 3 }, (_, i) => {
  const date = new Date(year, currentMonth + i);
  return `${date.getMonth() + 1}월`;
});

const periodOptions = ["오전", "오후"];
const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteOptions = Array.from({ length: 12 }, (_, i) =>
  `${i * 5}`.padStart(2, "0"),
);

type OptionKey = "month" | "day" | "period" | "hour" | "minute";

interface FirstDayPickerProps {
  firstDay: FirstDay | null;
  onSelect: (value: FirstDay) => void;
}

export default function FirstDayPicker({
  firstDay,
  onSelect,
}: FirstDayPickerProps) {
  const [selected, setSelected] = useState<FirstDay>(
    firstDay || {
      month: `${currentMonth + 1}월`,
      day: "1일",
      period: "오전",
      hour: "1",
      minute: "00",
    },
  );

  const selectedMonthIndex = monthOptions.findIndex(
    (m) => m === selected.month,
  );
  const selectedMonthNumber = parseInt(monthOptions[selectedMonthIndex]) - 1;
  const dayOptions = getDaysArray(year, selectedMonthNumber);

  const options: Record<OptionKey, string[]> = {
    month: monthOptions,
    day: dayOptions,
    period: periodOptions,
    hour: hourOptions,
    minute: minuteOptions,
  };

  const columnRefs = useRef<Record<OptionKey, HTMLDivElement | null>>({
    month: null,
    day: null,
    period: null,
    hour: null,
    minute: null,
  });

  const scrollTimers = useRef<Record<OptionKey, NodeJS.Timeout | null>>({
    month: null,
    day: null,
    period: null,
    hour: null,
    minute: null,
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
      const newValue = options[key][index];

      if (newValue && newValue !== selected[key]) {
        setSelected((prev) => ({ ...prev, [key]: newValue }));
      }
    }, 80);
  };
  const renderColumn = (key: OptionKey) => (
    <div className="relative h-[160px]">
      <div className="pointer-events-none absolute left-0 top-[52px] z-10 h-[2px] w-full bg-grey-200" />
      <div className="pointer-events-none absolute left-0 top-[104px] z-10 h-[2px] w-full bg-grey-200" />
      <div
        ref={(el) => {
          columnRefs.current[key] = el;
        }}
        onScroll={() => handleScroll(key)}
        className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide"
      >
        <div className="flex w-fit flex-col items-center py-[56px]">
          {options[key].map((opt) => (
            <div
              key={opt}
              className={cn(
                "flex h-[56px] w-full min-w-[56px] snap-center items-center justify-center whitespace-nowrap px-[14px] text-[16px] font-medium text-[#C9CBCF] transition-all",
                selected[key] === opt && "text-grey-900",
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white p-[20px]">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">수업 시작일</h2>
      <div className="mb-[40px] flex items-center justify-center gap-[12px]">
        {renderColumn("month")}
        {renderColumn("day")}
        {renderColumn("period")}
        <div className="relative">
          {renderColumn("hour")}
          <span className="absolute right-[-10px] top-[40%] text-[20px] font-bold">
            :
          </span>
        </div>
        {renderColumn("minute")}
      </div>

      <Button onClick={() => onSelect(selected)}>선택</Button>
    </div>
  );
}
