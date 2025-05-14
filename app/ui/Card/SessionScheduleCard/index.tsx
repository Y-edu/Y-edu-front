"use client";

import { useState } from "react";

import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";
import cn from "@/utils/cn";
import BottomSheet from "@/ui/BottomSheet";
import { useBottomSheet } from "@/components/teacher/SessionSchedule/useBottomSheet";
import RescheduleSheet from "@/components/teacher/SessionSchedule/RescheduleSheet";
import CancelSheet from "@/components/teacher/SessionSchedule/CancelSheet";
import RevertSheet from "@/components/teacher/SessionSchedule/RevertSheet";

export interface ActionButton {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  value: string;
  handleOnClick?: () => void;
}

export interface SessionScheduleCardProps {
  classSessionId: number;
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder?: boolean;
  className?: string;
}

export default function SessionScheduleCard({
  classSessionId,
  date,
  time,
  statusLabel,
  actions,
  showMoneyReminder,
  className = "",
}: SessionScheduleCardProps) {
  const { sheetType, openSheet, closeSheet, isSheetOpen } = useBottomSheet();

  const defaultOpen = statusLabel === "오늘" || showMoneyReminder;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isToggle = !defaultOpen;

  return (
    <div className={cn("rounded-xl bg-white p-4 shadow", className)}>
      <div
        className={cn(
          "flex items-center justify-between",
          isOpen ? "mb-1" : "mb-0",
        )}
      >
        <div className="flex items-center">
          {statusLabel && (
            <span
              className={cn(
                "mr-2 font-semibold",
                statusLabel === "오늘"
                  ? "text-[16px] text-primary"
                  : statusLabel === "휴강"
                    ? "text-[16px] text-red-500"
                    : "text-[14px] text-gray-500",
              )}
            >
              {statusLabel}
            </span>
          )}
          <span className="text-[16px] font-[600] text-gray-900">
            {date.toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "short",
            })}{" "}
            {time}
          </span>
        </div>
        {isToggle && (
          <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
            <IconDown className={cn(isOpen && "rotate-180")} />
          </button>
        )}
      </div>
      {showMoneyReminder && (
        <p className="mb-4 text-[14px] text-gray-500">
          보수를 받으려면 과외 완료를 꼭 눌러주세요
        </p>
      )}
      {isOpen && (
        <div className="flex gap-2">
          {actions.map((btn, idx) => (
            <Button
              key={idx}
              onClick={() => openSheet(btn.value)}
              className={cn(
                "h-11 flex-1 whitespace-normal text-[16px] font-[700]",
                "max-[355px]:text-sm",
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

      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet}>
        {sheetType === "reschedule" && (
          <RescheduleSheet sessionId={classSessionId} close={closeSheet} />
        )}
        {sheetType === "cancel" && (
          <CancelSheet sessionId={classSessionId} close={closeSheet} />
        )}
        {sheetType === "cancel_restore" && (
          <RevertSheet sessionId={classSessionId} close={closeSheet} />
        )}
      </BottomSheet>
    </div>
  );
}
