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

    return data.map((session) => {
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

      // diffDays 계산
      const classDay = new Date(dateObj);
      classDay.setHours(0, 0, 0, 0);
      const diffDays = Math.round(
        (classDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      // 오늘·과거 알림용 플래그
      const isTodayOrPast = diffDays <= 0;
      const showMoneyReminder = isTodayOrPast && !complete && !cancel;

      let statusLabel = "";
      let actions: ActionButton[] = [];

      switch (true) {
        // 1) 휴강
        case cancel:
          statusLabel = "휴강";
          actions = [BTN_CANCEL_RESTORE];
          break;

        // 2) 완료된 수업
        case complete:
          statusLabel = "";
          actions = [BTN_VIEW_REVIEW];
          break;

        // 3) 오늘
        case diffDays === 0:
          statusLabel = "오늘";
          actions = [BTN_CANCEL, BTN_RESCHEDULE, BTN_COMPLETE];
          break;

        // 4) 미래 일정
        case diffDays > 0:
          if (diffDays <= 7) {
            statusLabel = `${diffDays}일 전`;
          } else {
            statusLabel = "";
          }
          actions = [BTN_CANCEL, BTN_RESCHEDULE];
          break;

        // 5) 과거(미완료)
        default:
          statusLabel = "";
          actions = [BTN_CANCEL, BTN_RESCHEDULE, BTN_COMPLETE];
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
  }, [data]);
}
