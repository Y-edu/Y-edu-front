import { ChangeEvent } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  type?: string;
  className?: string;
  unit?: string;
  onChange: (value: string) => void;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  unit,
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex w-full items-start self-stretch rounded-lg border border-gray-200 p-4 pr-10 placeholder:text-gray-400"
      />
      {unit && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-gray-900">
          {unit}
        </span>
      )}
    </div>
  );
}
