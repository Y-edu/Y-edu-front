import cn from "@/utils/cn";

interface DivWithLabelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function DivWithLabel({
  label,
  children,
  className,
}: DivWithLabelProps) {
  return (
    <div className={cn("flex flex-col gap-[12px]", className)}>
      <p className="text-[16px] font-bold">{label}</p>
      {children}
    </div>
  );
}
