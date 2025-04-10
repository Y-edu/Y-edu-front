"use client";

import Button from "@/ui/Button";
import ScrollPicker from "@/ui/ScrollPicker";
import { Schedule } from "@/components/result/ConfirmedResult/useConfirmedResult";

import { useTimePicker } from "./useTimePicker";

interface TimePickerProps {
  day?: string;
  schedule?: Omit<Schedule, "day"> | null;
  onSelect: (schedule: Schedule) => void;
}

export default function TimePicker({
  day = "",
  schedule,
  onSelect,
}: TimePickerProps) {
  const PERIODS = ["오전", "오후"];
  const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const MINUTES = Array.from(
    { length: 12 },
    (_, i) => `${(i * 5).toString().padStart(2, "0")} 부터`,
  );
  const DURATIONS = [
    "50분 진행",
    "60분 진행",
    "75분 진행",
    "100분 진행",
    "120분 진행",
    "150분 진행",
    "200분 진행",
  ];

  const { selected, handleChange, getSchedule } = useTimePicker(schedule);

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white p-[20px]">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">수업 시간</h2>
      <div className="mb-[40px] flex items-center justify-center gap-[12px]">
        <ScrollPicker
          options={PERIODS}
          selected={selected.period}
          onSelect={(val) => handleChange("period", val)}
        />
        <div className="relative">
          <ScrollPicker
            options={HOURS}
            selected={selected.hour}
            onSelect={(val) => handleChange("hour", val)}
          />
          <span className="absolute right-[-10px] top-[40%] text-[20px] font-bold">
            :
          </span>
        </div>
        <ScrollPicker
          options={MINUTES}
          selected={selected.minute}
          onSelect={(val) => handleChange("minute", val)}
        />

        <ScrollPicker
          options={DURATIONS}
          selected={selected.duration}
          onSelect={(val) => handleChange("duration", val)}
        />
      </div>
      <Button onClick={() => onSelect(getSchedule(day))}>선택</Button>
    </div>
  );
}
