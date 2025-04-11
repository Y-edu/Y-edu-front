"use client";

import cn from "@/utils/cn";
import IconDown from "@/icons/IconDown";

interface SelectButtonProps {
  text: string | null;
  isActive?: boolean;
  onClick: () => void;
}

export default function SelectButton({
  text,
  isActive = false,
  onClick,
}: SelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-[8px] border border-grey-200 bg-white px-[16px] py-[12px] text-[16px] font-medium text-grey-900 transition-colors",
        isActive && "border-2 border-primary",
      )}
    >
      <span>{text || "선택하세요"}</span>
      <IconDown IconColor={isActive && "#527dff"} />
    </button>
  );
}
