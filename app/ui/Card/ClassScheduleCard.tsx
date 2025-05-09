"use client";

import { useState } from "react";

import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";
import cn from "@/utils/cn";

export interface ActionButton {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  handleOnClick?: () => void;
}

export interface ClassScheduleCardProps {
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  className?: string;
}

export default function ClassScheduleCard({
  date,
  time,
  statusLabel,
  actions,
  className = "",
}: ClassScheduleCardProps) {
  const isToggle = statusLabel !== "오늘";
  const [isOpen, setIsOpen] = useState(statusLabel === "오늘");

  return (
    <div className={cn("rounded-xl bg-white p-4 shadow", className)}>
      <div
        className={cn(
          "flex items-center justify-between",
          isOpen ? "mb-4" : "mb-0",
        )}
      >
        <div className="flex items-center">
          {statusLabel && (
            <span className="mr-2 text-[16px] font-semibold text-primary">
              {statusLabel}
            </span>
          )}
          <span className="text-[16px] font-bold text-gray-900">
            {date.toLocaleDateString("ko-KR", {
              month: "numeric",
              day: "numeric",
              weekday: "short",
            })}{" "}
            {time}
          </span>
        </div>
        {isToggle && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label={isOpen ? "Hide actions" : "Show actions"}
          >
            {isOpen ? <IconDown className="rotate-180" /> : <IconDown />}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="flex gap-2">
          {actions.map((btn, idx) => (
            <Button
              key={idx}
              onClick={btn.handleOnClick}
              className={cn(
                "h-11 flex-1",
                btn.variant === "primary"
                  ? "bg-primary text-white"
                  : btn.variant === "secondary"
                    ? "bg-primaryTint text-primary"
                    : "border border-gray-300 bg-white text-gray-600",
              )}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
