"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";
import cn from "@/utils/cn";
import BottomSheet from "@/ui/BottomSheet";
import { useBottomSheet } from "@/components/teacher/SessionList/useBottomSheet";
import RescheduleSheet from "@/components/teacher/SessionList/RescheduleSheet";
import {
  NotSameDayCancelSheet,
  SameDayCancelSheet,
} from "@/components/teacher/SessionList/CancelSheet";
import RevertSheet from "@/components/teacher/SessionList/RevertSheet";
import Badge from "@/ui/Badge";
import { CancelReason } from "@/actions/patch-sessions";
import { useModal } from "@/hooks/custom";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import { Modal } from "@/ui/Modal/Modal";
import { CANCEL_TEXT } from "@/constants/session/cancel";

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
  classMinute: number;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder?: boolean;
  className?: string;
  initialOpen?: boolean;
  currentRound?: number;
  maxRound?: number;
  cancel?: boolean;
}

export default function SessionListCard({
  classSessionId,
  date,
  time,
  classMinute,
  statusLabel,
  actions,
  showMoneyReminder,
  className = "",
  initialOpen = false,
  currentRound,
  maxRound,
  cancel = false,
}: SessionListCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sheetType, openSheet, closeSheet, isSheetOpen } = useBottomSheet();
  const [cancelReason, setCancelReason] = useState<CancelReason | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { mutate } = useSessionMutations().cancelMutation;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessionDate = new Date(date);
  sessionDate.setHours(0, 0, 0, 0);

  // 오늘 포함 이전 날짜인지 확인하는 변수
  const isTodayOrPast = sessionDate <= today;

  const defaultOpen =
    initialOpen ||
    showMoneyReminder ||
    actions.some((btn) => btn.value === "view_review");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isToggle = !defaultOpen;

  const cancelSameDaySession = () => {
    if (!cancelReason) return;
    mutate({
      sessionId: classSessionId,
      reason: cancelReason,
      isTodayCancel: cancelReason !== "TOGETHER",
    });
    closeModal();
  };

  const handleSameDayCancel = (reason: CancelReason) => {
    setCancelReason(reason);
    closeSheet();
    if (reason === "PARENT" || reason === "TEACHER") openModal();
    if (reason === "TOGETHER")
      mutate({
        sessionId: classSessionId,
        reason,
        isTodayCancel: false,
      });
  };

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

  // Badge 표시 조건을 명확하게 분리
  const shouldShowBadge = (() => {
    // 당일휴강 상태면 Badge 안 보임
    if (statusLabel === "선생님 당일휴강") {
      return false;
    }

    // cancel이 true이고 currentRound가 0이면 Badge 안 보임
    if (cancel && currentRound === 0) {
      return false;
    }

    // currentRound와 maxRound가 유효한 값이어야 Badge 보임
    return (
      currentRound !== undefined && maxRound !== undefined && currentRound >= 0
    );
  })();

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
          "flex items-start justify-between",
          isOpen ? "mb-1" : "mb-0",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            {(statusLabel === "휴강" || statusLabel === "오늘") && (
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
              {`${date.getMonth() + 1}.${date.getDate()} (${date.toLocaleDateString(
                "ko-KR",
                { weekday: "short" },
              )}) ${time}`}
            </span>
            {classMinute &&
              classMinute > 0 &&
              statusLabel !== "선생님 당일휴강" &&
              statusLabel !== "휴강" &&
              currentRound !== 0 && ( // 무료보강
                <span className="ml-[6px] text-gray-500">{`${classMinute}분`}</span>
              )}
          </div>
          {(statusLabel === "선생님 당일휴강" ||
            statusLabel === "학부모 당일휴강") && (
            <span className="mt-1 text-[15px] font-semibold text-red-500">
              {statusLabel}
            </span>
          )}
        </div>
        {shouldShowBadge && currentRound !== undefined && (
          <div className="flex items-center">
            {currentRound > 0 && (
              <Badge className={cn(isToggle && "mr-2")}>
                <strong className="font-semibold">
                  {currentRound ?? "-"}회차
                </strong>
              </Badge>
            )}
            {currentRound === 0 && (
              <Badge className="font-semibold text-primary">무료보강</Badge>
            )}
            <IconDown
              className={cn({
                hidden: !isToggle,
                "rotate-180": isOpen,
              })}
            />
          </div>
        )}
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
                { "mt-3": isOpen || defaultOpen },
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
        {sheetType === "cancel" &&
          (isTodayOrPast ? (
            <SameDayCancelSheet
              close={closeSheet}
              onRequestCancel={handleSameDayCancel}
            />
          ) : (
            <NotSameDayCancelSheet
              sessionId={classSessionId}
              close={closeSheet}
            />
          ))}
        {sheetType === "cancel_restore" && (
          <RevertSheet sessionId={classSessionId} close={closeSheet} />
        )}
      </BottomSheet>
      <Modal
        isOpen={isModalOpen}
        title={CANCEL_TEXT.SAME_DAY_CANCEL_ALERT}
        handleOnConfirm={cancelSameDaySession}
        handleOnCancel={closeModal}
        confirmText="진행할게요"
        cancelText="아니요"
      />
    </div>
  );
}
