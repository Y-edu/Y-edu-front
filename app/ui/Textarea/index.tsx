"use client";

import IconWarning from "@/icons/IconWarning";
import cn from "@/utils/cn";

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  errorMessage?: string;
}

export default function Textarea({
  placeholder = "",
  value,
  onChange,
  errorMessage,
}: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border-1 min-h-[104px] w-full resize-none rounded-[12px] border border-grey-200 p-[16px] text-[16px] outline-none placeholder:text-gray-400 focus:border-2 focus:border-primary",
          errorMessage && "border-2 border-warning focus:border-warning",
        )}
      />

      {errorMessage && (
        <div className="flex items-center gap-[4px] text-[14px] text-warning">
          <IconWarning />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
