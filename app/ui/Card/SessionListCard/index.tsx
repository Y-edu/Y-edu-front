"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";
import cn from "@/utils/cn";
import BottomSheet from "@/ui/BottomSheet";
import { useBottomSheet } from "@/components/teacher/SessionList/useBottomSheet";
import RescheduleSheet from "@/components/teacher/SessionList/RescheduleSheet";
import CancelSheet from "@/components/teacher/SessionList/CancelSheet";
import RevertSheet from "@/components/teacher/SessionList/RevertSheet";

export interface ActionButton {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  value: string;
  handleOnClick?: () => void;
}

export interface SessionListCardProps {
  classSessionId: number;
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder?: boolean;
  className?: string;
  initialOpen?: boolean;
}

export default function SessionListCard({
  classSessionId,
  date,
  time,
  statusLabel,
  actions,
  showMoneyReminder,
  className = "",
  initialOpen = false,
}: SessionListCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sheetType, openSheet, closeSheet, isSheetOpen } = useBottomSheet();

  const defaultOpen =
    initialOpen ||
    showMoneyReminder ||
    actions.some((btn) => btn.value === "view_review");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isToggle = !defaultOpen;

  const handleActionClick = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sessionId", classSessionId.toString());
      switch (value) {
        case "complete":
          router.push(`/teacher/session-complete?${params.toString()}`);
          break;
        case "view_review":
          router.push(`/teacher/session-review?${params.toString()}`);
          break;
        default:
          openSheet(value);
      }
    },
    [router, searchParams, classSessionId, openSheet],
  );

  return (
    <div
      className={cn(
        "rounded-[16px] bg-white p-4",
        "shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]",
        className,
        isToggle && "cursor-pointer",
      )}
      onClick={() => {
        if (isToggle) setIsOpen((prev) => !prev);
      }}
      aria-hidden="true"
    >
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
                "mr-2 text-[16px] font-semibold",
                statusLabel === "오늘" && "text-primary",
                statusLabel === "휴강" && "text-red-500",
              )}
            >
              {statusLabel}
            </span>
          )}
          <span className="text-[16px] font-[600] text-gray-900">
            {`${date.getMonth() + 1}.${date.getDate()} ${date.toLocaleDateString(
              "ko-KR",
              {
                weekday: "long",
              },
            )} ${time}`}
          </span>
        </div>
        <IconDown
          className={cn({
            hidden: !isToggle,
            "rotate-180": isOpen,
          })}
        />
      </div>
      {showMoneyReminder && (
        <p className="text-[14px] text-gray-500">
          보수를 받으려면 과외 완료를 꼭 눌러주세요
        </p>
      )}
      {(defaultOpen || isOpen) && (
        <div className="flex gap-2">
          {actions.map((btn, idx) => (
            <Button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                btn.handleOnClick?.();
                handleActionClick(btn.value);
              }}
              className={cn(
                { "mt-3": isOpen },
                "h-11 flex-1 whitespace-normal px-0 text-[16px] font-[700]",
                "max-[355px]:text-sm",
                btn.variant === "primary"
                  ? "bg-primary text-white"
                  : btn.variant === "secondary"
                    ? "bg-primaryTint text-primary"
                    : "mt-3 border border-gray-300 bg-white text-gray-600",
              )}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}

      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet}>
        {sheetType === "reschedule" && (
          <RescheduleSheet
            sessionId={classSessionId}
            date={date}
            time={time}
            close={closeSheet}
          />
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
