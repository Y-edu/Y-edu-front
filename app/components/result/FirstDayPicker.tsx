"use client";

import { useRef, useState } from "react";
import { getDaysInMonth } from "date-fns";

import cn from "@/utils/cn";
import Button from "@/ui/Button";

const ITEM_HEIGHT = 56;

const today = new Date();
const year = today.getFullYear();
const currentMonth = today.getMonth();

function getDaysArray(year: number, month: number): string[] {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
}

const monthOptions = [currentMonth, currentMonth + 1, currentMonth + 2]
  .filter((m) => m <= 11)
  .map((m) => `${m + 1}월`);

const periodOptions = ["오전", "오후"];
const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteOptions = Array.from({ length: 12 }, (_, i) =>
  `${i * 5}`.padStart(2, "0"),
);

type OptionKey = "month" | "day" | "period" | "hour" | "minute";

export default function FirstDayPicker() {
  const [selected, setSelected] = useState({
    month: `${currentMonth}월`,
    day: "1일",
    period: "오전",
    hour: "1",
    minute: "00",
  });

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
    <div
      ref={(el) => {
        columnRefs.current[key] = el;
      }}
      onScroll={() => handleScroll(key)}
      className="relative h-[160px] snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[calc(50%-20px)] h-[40px]" />
      <div className="flex w-fit flex-col items-center py-[56px]">
        {options[key].map((opt) => (
          <div
            key={opt}
            className={cn(
              "flex h-[56px] w-full min-w-[56px] snap-center items-center justify-center whitespace-nowrap px-[14px] text-[16px] font-medium text-[#C9CBCF] transition-all",
              selected[key] === opt &&
                "border-y-2 border-gray-200 text-gray-900",
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

      <Button>선택</Button>
    </div>
  );
}
