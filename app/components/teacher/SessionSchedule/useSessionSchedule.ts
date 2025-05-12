import { useMemo } from "react";

import { ActionButton } from "@/ui/Card/SessionScheduleCard";
import { SessionResponse } from "@/actions/post-getSessions";

export interface SessionItem {
  id: number;
  date: Date;
  time: string;
  statusLabel: string;
  actions: ActionButton[];
  showMoneyReminder: boolean;
  complete: boolean;
}

export function useSessionSchedule(data: SessionResponse[]): SessionItem[] {
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
          actions = [
            {
              label: "휴강 취소하기",
              variant: "outline",
              handleOnClick: () => {},
            },
          ];
          break;

        // 2) 완료된 수업
        case complete:
          statusLabel = "";
          actions = [
            {
              label: "작성한 리뷰보기",
              variant: "outline",
              handleOnClick: () => {},
            },
          ];
          break;

        // 3) 오늘
        case diffDays === 0:
          statusLabel = "오늘";
          actions = [
            {
              label: "날짜 변경",
              variant: "secondary",
              handleOnClick: () => {},
            },
            {
              label: "휴강 처리",
              variant: "secondary",
              handleOnClick: () => {},
            },
            {
              label: "과외 완료",
              variant: "primary",
              handleOnClick: () => {},
            },
          ];
          break;

        // 4) 미래 수업 일정
        case diffDays > 0:
          statusLabel = `${diffDays}일 전`;
          actions = [
            {
              label: "날짜 변경",
              variant: "secondary",
              handleOnClick: () => {},
            },
            {
              label: "휴강 처리",
              variant: "secondary",
              handleOnClick: () => {},
            },
          ];
          break;

        // 5) 과거(미완료)
        default:
          statusLabel = "";
          actions = [
            {
              label: "날짜 변경",
              variant: "secondary",
              handleOnClick: () => {},
            },
            {
              label: "휴강 처리",
              variant: "secondary",
              handleOnClick: () => {},
            },
            {
              label: "과외 완료",
              variant: "primary",
              handleOnClick: () => {},
            },
          ];
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
