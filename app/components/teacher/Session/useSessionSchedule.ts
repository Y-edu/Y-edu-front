import { useMemo, useState } from "react";

import { DayOfWeek } from "@/actions/get-teacher-detail";

export const DAYS: Array<DayOfWeek> = [
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
];

export interface Schedule {
  period: string;
  day: string;
  time: string;
  classMinute: number;
}

export function useSessionSchedule() {
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedDayForTimePicker, setSelectedDayForTimePicker] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isTimeVariesByDay, setIsTimeVariesByDay] = useState(false);
  const [commonSchedule, setCommonSchedule] = useState<Omit<
    Schedule,
    "day"
  > | null>(null);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) => {
      const isRemoving = prev.includes(day);
      const updatedDays = isRemoving
        ? prev.filter((d) => d !== day)
        : [...prev, day];

      if (isRemoving) {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.day !== day),
        );
      }

      return updatedDays;
    });
  };

  const updateSchedule = (schedule: Schedule) => {
    // 요일별 다른 수업시간일 경우
    if (schedule.day) {
      setSchedules((prev) => {
        const exists = prev.find((s) => s.day === schedule.day);
        if (exists) {
          return prev.map((s) => (s.day === schedule.day ? schedule : s));
        }
        return [...prev, schedule];
      });
    }
    // 공통 수업시간일 경우
    else {
      setCommonSchedule(schedule);
    }
  };

  const sortedSelectedDays = useMemo(
    () => [...selectedDays].sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b)),
    [selectedDays],
  );

  return {
    selectedDays,
    selectedDayForTimePicker,
    setSelectedDayForTimePicker,
    toggleDay,
    isTimeVariesByDay,
    setIsTimeVariesByDay,
    schedules,
    commonSchedule,
    updateSchedule,
    sortedSelectedDays,
  };
}
