"use client";

import IconRoundCheck from "@/icons/IconRoundCheck";

interface CustomRadioProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function Radio({ label, selected, onClick }: CustomRadioProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between"
      role="radio"
      aria-checked={selected}
    >
      <div className="flex items-center gap-[8px]">
        <IconRoundCheck isFill={selected} />
        <span className="text-grey-700">{label}</span>
      </div>
    </button>
  );
}
