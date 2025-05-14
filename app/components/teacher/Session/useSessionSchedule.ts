import { useEffect, useMemo, useState } from "react";

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
  start: string; // "17:00" 형태의 24시간제 시간
  day: string;
  classMinute: number;
}

// UI 표시용 타입
export interface DisplaySchedule {
  period: string; // "오전" 또는 "오후"
  time: string; // "5:00 부터" 형태
  day: string;
  classMinute: number;
}

// 시간 변환 함수 (UI 표시용 -> 내부 저장용)
export function convertToTimeFormat(period: string, time: string): string {
  // "5:00 부터"에서 숫자 부분만 추출
  const timeMatch = time.match(/(\d+):(\d+)/);
  if (!timeMatch) return "00:00";

  let hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2];

  // 오후이고 12시가 아니면 12를 더함
  if (period === "오후" && hours !== 12) {
    hours += 12;
  }
  // 오전이고 12시면 0시로 변경
  else if (period === "오전" && hours === 12) {
    hours = 0;
  }

  // 시간을 두 자리 숫자로 포맷팅
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}`;
}

// 시간 변환 함수 (내부 저장용 -> UI 표시용)
export function convertFromTimeFormat(time: string): {
  period: string;
  time: string;
} {
  const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));

  let period = "오전";
  let displayHours = hours;

  if (hours >= 12) {
    period = "오후";
    displayHours = hours === 12 ? 12 : hours - 12;
  }
  if (hours === 0) {
    displayHours = 12;
  }

  return {
    period,
    time: `${displayHours}:${minutes.toString().padStart(2, "0")} 부터`,
  };
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

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

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

  const updateSchedule = (schedule: DisplaySchedule) => {
    // Display 형식에서 내부 저장 형식으로 변환
    const convertedSchedule: Schedule = {
      start: convertToTimeFormat(schedule.period, schedule.time),
      day: schedule.day,
      classMinute: schedule.classMinute,
    };

    // 요일별 다른 수업시간일 경우
    if (convertedSchedule.day) {
      setSchedules((prev) => {
        const exists = prev.find((s) => s.day === convertedSchedule.day);
        if (exists) {
          return prev.map((s) =>
            s.day === convertedSchedule.day ? convertedSchedule : s,
          );
        }
        return [...prev, convertedSchedule];
      });
    }
    // 공통 수업시간일 경우
    else {
      setCommonSchedule({
        start: convertedSchedule.start,
        classMinute: convertedSchedule.classMinute,
      });

      // 공통 시간을 선택하면 모든 선택된 요일에 동일한 시간을 적용
      if (selectedDays.length > 0) {
        setSchedules((prev) => {
          const newSchedules = [...prev];

          // 기존 스케줄에서 선택된 요일에 해당하는 항목 제거 또는 업데이트
          const updatedSchedules = newSchedules.filter(
            (s) => !selectedDays.includes(s.day as DayOfWeek),
          );

          // 선택된 모든 요일에 대해 새 스케줄 추가
          selectedDays.forEach((day) => {
            updatedSchedules.push({
              start: convertedSchedule.start,
              day,
              classMinute: convertedSchedule.classMinute,
            });
          });

          return updatedSchedules;
        });
      }
    }
  };

  // UI에 표시하기 위한 변환된 스케줄
  const displaySchedules = useMemo(() => {
    return schedules.map((schedule) => {
      const { period, time } = convertFromTimeFormat(schedule.start);
      return {
        period,
        time,
        day: schedule.day,
        classMinute: schedule.classMinute,
      };
    });
  }, [schedules]);

  // UI에 표시하기 위한 변환된 공통 스케줄
  const displayCommonSchedule = useMemo(() => {
    if (!commonSchedule) return null;

    const { period, time } = convertFromTimeFormat(commonSchedule.start);
    return {
      period,
      time,
      classMinute: commonSchedule.classMinute,
    };
  }, [commonSchedule]);

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
    schedules: displaySchedules, // UI 표시용 변환된 스케줄
    commonSchedule: displayCommonSchedule, // UI 표시용 변환된 공통 스케줄
    updateSchedule,
    sortedSelectedDays,
  };
}
