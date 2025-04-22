import { ReactNode } from "react";

import cn from "@/utils/cn";

interface TimerTableHeaderProps {
  children: ReactNode;
  className?: string;
}

function TimeTableHeader({ children, className }: TimerTableHeaderProps) {
  return (
    <div className={cn("flex flex-col items-start gap-[8px]", className)}>
      {children}
    </div>
  );
}

TimeTableHeader.Title = function SubtitleTitle({
  className,
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-[22px] font-bold leading-[140%]", className)}>
      {children}
    </div>
  );
};

TimeTableHeader.Description = function SubtitleDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[16px] font-medium leading-normal text-grey-400",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TimeTableHeader;
