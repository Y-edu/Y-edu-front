"use client";

import Badge from "@/ui/Badge";
import cn from "@/utils/cn";

export interface SimpleSessionCardProps {
  date: Date;
  roundNumber: number;
  className?: string;
}

export default function ParentSessionListCard({
  date,
  roundNumber,
  className = "",
}: SimpleSessionCardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] bg-white p-4",
        "shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-[600] text-gray-900">
          {`${date.getMonth() + 1}.${date.getDate()} ${date.toLocaleDateString(
            "ko-KR",
            { weekday: "long" },
          )}`}
        </span>

        <Badge className="border-0 bg-primaryTint px-2 py-[2px] font-bold leading-[18px] text-primary">
          {roundNumber}회차
        </Badge>
      </div>
    </div>
  );
}
