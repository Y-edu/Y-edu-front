"use client";

import { useState } from "react";

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
  maxLength,
  errorMessage,
}: TextareaProps) {
  const [maxLengthError, setMaxLengthError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      setMaxLengthError(`${maxLength}자 이내로 적어주세요`);
    } else {
      setMaxLengthError("");
      onChange(newValue);
    }
  };

  const isError = !!errorMessage || !!maxLengthError;

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          "border-1 min-h-[104px] w-full resize-none rounded-[12px] border border-grey-200 p-[16px] text-[16px] outline-none placeholder:text-gray-400 focus:border-2 focus:border-primary",
          isError && "border-2 border-warning focus:border-warning",
        )}
      />

      {isError && (
        <div className="flex items-center gap-[4px] text-[14px] text-warning">
          <IconWarning />
          <span>{maxLengthError || errorMessage}</span>
        </div>
      )}
    </div>
  );
}
