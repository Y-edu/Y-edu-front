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

export interface SessionItem {
  id: number;
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder: boolean;
  complete: boolean;
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
      const showMoneyReminder = isTodayOrPast && !complete && !cancel;

      let statusLabel = "";
      let actions: ActionButton[] = [];

      switch (true) {
        case cancel:
          statusLabel = "휴강";
          actions = [BTN_CANCEL_RESTORE];
          break;
        case complete:
          actions = [BTN_VIEW_REVIEW];
          break;
        case isToday:
          statusLabel = "오늘";
          actions = [BTN_CANCEL, BTN_RESCHEDULE, BTN_COMPLETE];
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
      };
    });

    return mapped;
  }, [data]);
}
