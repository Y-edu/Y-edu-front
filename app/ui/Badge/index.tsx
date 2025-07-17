"use client";

import cn from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[20px] border border-grey-200 bg-white px-2 py-[2px] text-[12px] leading-[18px] text-grey-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
