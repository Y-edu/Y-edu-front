"use client";

import cn from "@/utils/cn";

interface ChipProps {
  chipText: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function Chip({
  chipText,
  isSelected,
  onClick,
  className,
}: ChipProps) {
  return (
    <button
      className={cn(
        "rounded-[20px] border border-grey-200 bg-white px-[14px] py-[8px] font-medium text-grey-900 transition-colors",
        isSelected && "border-none bg-grey-800 font-semibold text-white",
        className,
      )}
      onClick={onClick}
    >
      {chipText}
    </button>
  );
}
