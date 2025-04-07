"use client";

import cn from "@/utils/cn";

interface DayButtonProps {
  day: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DayButton({
  day,
  isSelected,
  onClick,
}: DayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-[40px] w-[42px] rounded-full border border-grey-200 bg-white text-[16px] font-medium text-black transition-colors",
        isSelected && "border-none bg-grey-800 text-white",
      )}
    >
      {day}
    </button>
  );
}
