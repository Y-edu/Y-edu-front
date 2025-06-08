"use client";

import Button from "@/ui/Button";
import ScrollPicker from "@/ui/ScrollPicker";
import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

import { useStartDatePicker } from "./useStartDatePicker";

interface FirstDayPickerProps {
  title?: string;
  firstDay: FirstDay | null;
  onSelect: (value: FirstDay) => void;
}

export default function StartDatePicker({
  title,
  firstDay,
  onSelect,
}: FirstDayPickerProps) {
  const { selected, setSelected, handleChangeMonth, options } =
    useStartDatePicker(firstDay);

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
        {title || "수업 시작일"}
      </h2>
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
      </div>
      <Button
        disabled={!isChanged}
        onClick={() => onSelect(convertToFirstDayDTO())}
      >
        선택
      </Button>
    </div>
  );
}
