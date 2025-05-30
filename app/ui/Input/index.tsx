import IconWarning from "@/icons/IconWarning";
import cn from "@/utils/cn";

type InputStatus = "default" | "warning";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unit?: string;
  errorMessage?: string;
  status?: InputStatus;
}

export default function Input({
  value,
  onChange,
  placeholder,
  unit,
  errorMessage,
  status = "default",
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border p-4 pr-10 outline-none transition-colors placeholder:text-gray-400",
            status === "warning"
              ? "border-2 border-warning focus:border-warning"
              : "border border-gray-200 focus:border-primary",
          )}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900">
            {unit}
          </span>
        )}
      </div>
      {errorMessage && (
        <div className="flex items-center gap-1 text-sm text-warning">
          <IconWarning />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
