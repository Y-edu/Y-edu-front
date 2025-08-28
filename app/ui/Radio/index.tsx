"use client";

import IconRoundCheck from "@/icons/IconRoundCheck";

interface CustomRadioProps {
  label: React.ReactNode;
  subLabel?: string;
  selected: boolean;
  onClick?: () => void;
}

export default function Radio({
  label,
  selected,
  onClick,
  subLabel = "",
}: CustomRadioProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between"
      role="radio"
      aria-checked={selected}
    >
      <div className="flex items-center gap-2">
        <IconRoundCheck isFill={selected} />
        <span className="text-gray-700">{label}</span>
      </div>
      {subLabel && (
        <span
          className={`font-bold ${
            selected ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {subLabel}
        </span>
      )}
    </button>
  );
}
