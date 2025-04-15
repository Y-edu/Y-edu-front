"use client";

import Button from "@/ui/Button";
import ScrollPicker from "@/ui/ScrollPicker";
import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

import { useFirstDayPicker } from "./useFirstDayPicker";

interface FirstDayPickerProps {
  firstDay: FirstDay | null;
  onSelect: (value: FirstDay) => void;
}

export default function FirstDayPicker({
  firstDay,
  onSelect,
}: FirstDayPickerProps) {
  const {
    selected,
    setSelected,
    handleChangeMonth,
    convertToFirstDayDTO,
    options,
  } = useFirstDayPicker(firstDay);

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white p-[20px]">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">수업 시작일</h2>
      <div className="mb-[40px] flex items-center justify-center gap-[10px]">
        <ScrollPicker
          options={options.month}
          selected={selected.month}
          onSelect={handleChangeMonth}
        />
        <ScrollPicker
          options={options.day}
          selected={selected.day}
          onSelect={(val) => setSelected((prev) => ({ ...prev, day: val }))}
        />
        <ScrollPicker
          options={options.period}
          selected={selected.period}
          onSelect={(val) => setSelected((prev) => ({ ...prev, period: val }))}
        />
        <div className="relative">
          <ScrollPicker
            options={options.hour}
            selected={selected.hour}
            onSelect={(val) => setSelected((prev) => ({ ...prev, hour: val }))}
          />
          <span className="absolute right-[-10px] top-[40%] text-[20px] font-bold">
            :
          </span>
        </div>
        <ScrollPicker
          options={options.minute}
          selected={selected.minute}
          onSelect={(val) => setSelected((prev) => ({ ...prev, minute: val }))}
        />
      </div>
      <Button onClick={() => onSelect(convertToFirstDayDTO())}>선택</Button>
    </div>
  );
}
