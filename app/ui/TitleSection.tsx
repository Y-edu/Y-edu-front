import { ReactNode } from "react";

import cn from "@/utils/cn";

interface TitleSectionProps {
  children: ReactNode;
  className?: string;
}

function TitleSection({ children, className }: TitleSectionProps) {
  return (
    <div className={cn("flex flex-col items-start gap-[8px]", className)}>
      {children}
    </div>
  );
}

TitleSection.Title = function TitleSectionTitle({
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

TitleSection.Description = function TitleSectionDescription({
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

export default TitleSection;
