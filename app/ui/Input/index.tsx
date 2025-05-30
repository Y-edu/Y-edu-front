import { ChangeEvent } from "react";

import cn from "@/utils/cn";

type InputStatus = "default" | "warning" | "success";

interface InputProps {
  value: string;
  placeholder?: string;
  type?: string;
  className?: string;
  unit?: string;
  status?: InputStatus;
  onChange: (value: string) => void;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  unit,
  status = "default",
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const borderStyle = {
    default: "border border-gray-200 focus:border-primaryNormal",
    warning: "border-2 border-warning focus:border-warning",
    success: "border-2 border-green-500 focus:border-green-500",
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "flex w-full items-start self-stretch rounded-lg p-4 pr-10 outline-none transition-colors placeholder:text-grey-400",
          borderStyle[status],
        )}
      />
      {unit && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-grey-900">
          {unit}
        </span>
      )}
    </div>
  );
}
