import { useRef, useState } from "react";

import cn from "@/utils/cn";
import Button from "@/ui/Button";

import { Schedule } from "./ConfirmedResult";

const ITEM_HEIGHT = 56;

const PERIODS = ["오전", "오후"];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 12 }, (_, i) =>
  `${i * 5}`.padStart(2, "0"),
);
const DURATIONS = ["50분 진행", "60분 진행", "70분 진행"];

const OPTIONS = {
  period: PERIODS,
  hour: HOURS,
  minute: MINUTES,
  duration: DURATIONS,
} as const;

type OptionKey = keyof typeof OPTIONS;

interface TimePickerProps {
  onSelect: (schedule: Schedule) => void;
  day?: string;
}

export default function TimePicker({ day = "", onSelect }: TimePickerProps) {
  const [selected, setSelected] = useState<Record<OptionKey, string>>({
    period: "오후",
    hour: "1",
    minute: "00",
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

    clearTimeout(scrollTimers.current[key]!);
    scrollTimers.current[key] = setTimeout(() => {
      const index = Math.floor(el.scrollTop / ITEM_HEIGHT);
      const value = OPTIONS[key][index];
      if (value && value !== selected[key]) {
        setSelected((prev) => ({ ...prev, [key]: value }));
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
        <div className="flex w-full flex-col items-center py-[56px]">
          {OPTIONS[key].map((opt) => (
            <div
              key={opt}
              className={cn(
                "flex h-[56px] w-full snap-center items-center justify-center whitespace-nowrap px-[14px] text-[16px] font-medium text-[#C9CBCF] transition-all",
                selected[key] === opt && "text-grey-900",
              )}
            >
              {key === "minute" ? `${opt}분` : opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const handleSelect = () => {
    const time = `${selected.hour}:${selected.minute}`;
    const classMinute = parseInt(selected.duration);

    onSelect({ period: selected.period, day, time, classMinute });
  };

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

      <Button onClick={handleSelect}>선택</Button>
    </div>
  );
}
