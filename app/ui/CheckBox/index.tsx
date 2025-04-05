import cn from "@/utils/cn";
import IconCheck from "@/icons/IconCheck";

interface CheckboxProps {
  id: string;
  label?: string;
  isChecked: boolean;
  onChange: (id: string) => void;
  isRequired?: boolean;
}

export default function Checkbox({
  id,
  label,
  isChecked,
  onChange,
  isRequired = false,
}: CheckboxProps) {
  return (
    <div className="flex w-full items-center gap-[8px]">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={() => onChange(id)}
          className="sr-only"
          aria-required={isRequired}
        />
        <label
          htmlFor={id}
          className={cn(
            "flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-grey-400 bg-white",
            isChecked && "border-none",
          )}
        >
          <IconCheck iconColor={!isChecked && "transparent"} />
        </label>
      </div>

      <span className="text-[14px] font-medium">
        {label}
        {isRequired && <span className="ml-1 text-[#ea7465]">*</span>}
      </span>
    </div>
  );
}
