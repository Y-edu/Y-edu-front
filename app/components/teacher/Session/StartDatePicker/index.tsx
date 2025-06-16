"use client";

import Button from "@/ui/Button";
import ScrollPicker from "@/ui/ScrollPicker";

import { useStartDatePicker } from "./useStartDatePicker";

interface StartDatePickerProps {
  options: string[];
  onSelect: (value: string) => void;
}

export default function StartDatePicker({
  options: startDateOptions,
  onSelect,
}: StartDatePickerProps) {
  const { options, selected, displaySelected, handleChangeMonth, setSelected } =
    useStartDatePicker(startDateOptions);

  const handleConfirm = () => {
    const selectedDate = `${selected.year}-${selected.month.padStart(2, "0")}-${selected.day.padStart(2, "0")}`;
    onSelect(selectedDate);
  };

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-t-[20px] bg-white">
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
        바뀐 일정을 언제부터 적용할까요?
      </h2>
      <div className="mb-[40px] flex items-center justify-center">
        <div className="flex w-[140px] items-center justify-center gap-[10px]">
          <ScrollPicker
            options={options.month}
            selected={displaySelected.month}
            onSelect={handleChangeMonth}
          />
          <ScrollPicker
            options={options.day}
            selected={displaySelected.day}
            onSelect={(val) => {
              const onlyDay = val.replace(/일.*/, "").padStart(2, "0");
              setSelected((prev) => ({ ...prev, day: onlyDay }));
            }}
          />
        </div>
      </div>
      <Button onClick={handleConfirm}>선택</Button>
    </div>
  );
}
