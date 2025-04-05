import cn from "@/utils/cn";
import IconCheck from "@/icons/IconCheck";
import Button from "@/ui/Button";

interface CheckboxWithLabelProps {
  id: string;
  label?: string;
  isChecked: boolean;
  onChange: (id: string) => void;
  isRequired?: boolean;
}

export default function CheckboxWithLabel({
  id,
  label,
  isChecked,
  onChange,
  isRequired = false,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex w-full items-center gap-[8px]">
      <Button
        onClick={() => onChange(id)}
        className={cn(
          "flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-grey-400 bg-white p-0",
          isChecked && "border-none",
        )}
      >
        <IconCheck IconColor={!isChecked && "transparent"} />
      </Button>
      <span className="text-[14px] font-medium">
        {label}
        {isRequired && <span className="ml-1 text-[#ea7465]">*</span>}
      </span>
    </div>
  );
}
