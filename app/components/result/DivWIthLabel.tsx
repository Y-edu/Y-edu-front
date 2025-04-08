import cn from "@/utils/cn";

interface DivWithLabelProps {
  label: string;
  subLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DivWithLabel({
  label,
  subLabel,
  children,
  className,
}: DivWithLabelProps) {
  return (
    <div className={cn("flex flex-col gap-[12px]", className)}>
      <p className="flex gap-[4px]">
        <span className="text-[16px] font-bold">{label}</span>
        <span className="text-[16px] font-medium text-grey-500">
          {subLabel}
        </span>
      </p>

      {children}
    </div>
  );
}
