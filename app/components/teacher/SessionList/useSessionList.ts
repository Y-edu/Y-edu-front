import { useMemo } from "react";

import { ActionButton } from "@/ui/Card/SessionListCard";
import { SessionResponse } from "@/actions/post-getSessions";
import {
  BTN_CANCEL,
  BTN_CANCEL_RESTORE,
  BTN_COMPLETE,
  BTN_RESCHEDULE,
  BTN_VIEW_REVIEW,
} from "@/ui/Card/SessionListCard/ActionButtons";
import { CancelReason } from "@/actions/patch-sessions";
import { CANCEL_TEXT } from "@/constants/session/cancel";

export interface SessionItem {
  id: number;
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder: boolean;
  complete: boolean;
  currentRound?: number;
  maxRound?: number;
  isTodayCancel?: boolean;
  cancelReason?: CancelReason;
  cancel?: boolean;
  classMinute: number;
}

export function useSessionList(data: SessionResponse[]): SessionItem[] {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mapped: SessionItem[] = data.map((session) => {
      const {
        classSessionId: id,
        cancel,
        complete,
        classDate,
        classStart,
        currentRound,
        maxRound,
        isTodayCancel,
        cancelReason,
        classMinute,
      } = session;

      // Date 객체 생성 및 시간 포맷
      const dateObj = new Date(`${classDate}T${classStart}`);
      dateObj.setSeconds(0, 0);
      const hours = dateObj.getHours();
      const period = hours < 12 ? "오전" : "오후";
      const hour12 = ((hours + 11) % 12) + 1;
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");
      const time = `${period} ${hour12}:${minutes}`;

      // 오늘·과거 알림용 플래그
      const classDay = new Date(dateObj);
      classDay.setHours(0, 0, 0, 0);
      const isToday = classDay.getTime() === today.getTime();
      const isTodayOrPast = classDay.getTime() <= today.getTime();
      const isFuture = classDay.getTime() > today.getTime();
      const isFreeSupplement = !cancel && currentRound === 0;
      const showMoneyReminder = isTodayOrPast && !complete && !cancel;

      let statusLabel = "";
      let actions: ActionButton[] = [];

      switch (true) {
        case isFreeSupplement:
          actions = [BTN_RESCHEDULE, BTN_COMPLETE];
          break;
        case isTodayCancel && cancelReason === "TEACHER":
          statusLabel = CANCEL_TEXT.SAME_DAY_CANCEL_BY_TEACHER_SHORT;
          break;
        case isTodayCancel && cancelReason === "PARENT":
          statusLabel = CANCEL_TEXT.SAME_DAY_CANCEL_BY_PARENTS_SHORT;
          break;
        case cancel:
          statusLabel = "휴강";
          actions = [BTN_CANCEL_RESTORE];
          break;
        case complete:
          actions = [BTN_VIEW_REVIEW];
          break;
        case isTodayCancel && cancelReason === "TOGETHER":
          statusLabel = "당일 휴강";
          actions = [BTN_CANCEL_RESTORE];
          break;
        case isToday:
          statusLabel = "오늘";
          actions = [BTN_CANCEL, BTN_RESCHEDULE, BTN_COMPLETE];
          break;
        case isFuture:
          actions = [BTN_CANCEL, BTN_RESCHEDULE];
          break;
        default:
          actions = [BTN_CANCEL, BTN_RESCHEDULE, BTN_COMPLETE];
          break;
      }

      return {
        id,
        date: dateObj,
        time,
        statusLabel,
        actions,
        showMoneyReminder,
        complete,
        currentRound,
        maxRound,
        cancel,
        classMinute,
      };
    });

    return mapped;
  }, [data]);
}
