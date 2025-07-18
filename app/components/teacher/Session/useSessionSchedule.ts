import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DayOfWeek } from "@/actions/get-teacher-detail";
import { usePutSchedules } from "@/hooks/mutation/usePutSchedules";
import { SchedulesRequestProps } from "@/actions/put-schedules";

export const DAYS: Array<DayOfWeek> = [
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
];

// 서버 전송용 타입
export interface Schedule {
  start: string;
  day: string;
  classMinute: number;
}

// UI 표시용 타입
export interface DisplaySchedule {
  period: string;
  time: string;
  day: string;
  classMinute: number;
}

// 시간 변환 함수 (UI 표시용 -> 서버 전송용)
export function convertToTimeFormat(period: string, time: string): string {
  const timeMatch = time.match(/(\d+):(\d+)/);
  if (!timeMatch) return "00:00";

  let hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2];

  if (period === "오후" && hours !== 12) {
    hours += 12;
  }
  if (period === "오전" && hours === 12) {
    hours = 0;
  }

  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}`;
}

// 시간 변환 함수 (서버 전송용 -> UI 표시용)
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

export function useSessionSchedule({
  token,
  classMatchingId,
  initialSchedules,
  startDate,
}: {
  token?: string;
  classMatchingId?: number;
  initialSchedules?: Schedule[];
  startDate?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedDayForTimePicker, setSelectedDayForTimePicker] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isTimeVariesByDay, setIsTimeVariesByDay] = useState(false);
  const [commonSchedule, setCommonSchedule] = useState<Omit<
    Schedule,
    "day"
  > | null>(null);

  const { mutate, isPending } = usePutSchedules();

  useEffect(() => {
    if (initialSchedules && initialSchedules.length > 0) {
      // 초기 선택된 요일 설정
      const days = initialSchedules.map(
        (schedule) => schedule.day as DayOfWeek,
      );
      setSelectedDays(days);

      // 스케줄 데이터 설정
      setSchedules(initialSchedules);

      // 요일별로 시간이 다른지 확인
      const hasVaryingTimes = initialSchedules.some((schedule, _, arr) =>
        arr.some(
          (s) =>
            s.start !== schedule.start ||
            s.classMinute !== schedule.classMinute,
        ),
      );

      setIsTimeVariesByDay(hasVaryingTimes);

      // 만약 시간이 모두 같다면 공통 스케줄 설정
      if (!hasVaryingTimes && initialSchedules[0]) {
        setCommonSchedule({
          start: initialSchedules[0].start,
          classMinute: initialSchedules[0].classMinute,
        });
      }
    }
  }, [initialSchedules]);

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
      } else if (!isTimeVariesByDay && commonSchedule) {
        // 새로운 요일이 추가되고 공통 시간을 사용하는 경우
        setSchedules((prevSchedules) => {
          // 이미 해당 요일의 스케줄이 있다면 그대로 유지
          if (prevSchedules.some((s) => s.day === day)) {
            return prevSchedules;
          }

          return [
            ...prevSchedules,
            {
              day,
              start: commonSchedule.start,
              classMinute: commonSchedule.classMinute,
            },
          ];
        });
      }

      return updatedDays;
    });
  };

  const updateSchedule = (schedule: DisplaySchedule) => {
    // UI 표시 형식에서 서버에 보낼 형식으로 변환
    const convertedSchedule: Schedule = {
      start: convertToTimeFormat(schedule.period, schedule.time),
      day: schedule.day,
      classMinute: schedule.classMinute,
    };

    // 요일별 다른 수업시간
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
    // 공통 수업시간
    else {
      setCommonSchedule({
        start: convertedSchedule.start,
        classMinute: convertedSchedule.classMinute,
      });

      if (selectedDays.length > 0) {
        setSchedules((prev) => {
          const newSchedules = [...prev];

          const updatedSchedules = newSchedules.filter(
            (s) => !selectedDays.includes(s.day as DayOfWeek),
          );

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

  // 기본 일정 데이터 유효성 검사
  const hasValidScheduleData = (
    isTimeVariesByDay: boolean,
    schedules: Schedule[],
    selectedDays: DayOfWeek[],
    commonSchedule: Omit<Schedule, "day"> | null,
  ) => {
    if (selectedDays.length === 0) return false;

    if (isTimeVariesByDay) {
      return selectedDays.every((day) =>
        schedules.some((s) => s.day === day && s.start && s.classMinute > 0),
      );
    } else {
      return !!commonSchedule?.start && !!commonSchedule?.classMinute;
    }
  };

  // 선택된 요일 변경 여부 검사
  const hasSelectedDaysChanged = (
    selectedDays: DayOfWeek[],
    initialSchedules: Schedule[],
  ) => {
    const initialDays = initialSchedules.map((s) => s.day as DayOfWeek);

    return (
      selectedDays.length !== initialDays.length ||
      selectedDays.some((day) => !initialDays.includes(day)) ||
      initialDays.some((day) => !selectedDays.includes(day))
    );
  };

  // 수업 시간 변경 여부 검사
  const hasScheduleTimesChanged = (
    isTimeVariesByDay: boolean,
    schedules: Schedule[],
    commonSchedule: Omit<Schedule, "day"> | null,
    initialSchedules: Schedule[],
  ) => {
    if (isTimeVariesByDay) {
      return schedules.some((schedule) => {
        const initialSchedule = initialSchedules.find(
          (initial) => initial.day === schedule.day,
        );
        return (
          initialSchedule &&
          (initialSchedule.start !== schedule.start ||
            initialSchedule.classMinute !== schedule.classMinute)
        );
      });
    } else {
      return (
        commonSchedule &&
        initialSchedules.some(
          (initial) =>
            initial.start !== commonSchedule.start ||
            initial.classMinute !== commonSchedule.classMinute,
        )
      );
    }
  };

  const isScheduleValid = useMemo(() => {
    // 1. 기본 스케줄 데이터 유효성 검사
    const hasValidData = hasValidScheduleData(
      isTimeVariesByDay,
      schedules,
      selectedDays,
      commonSchedule,
    );

    if (!hasValidData) return false;

    // 2. 초기 스케줄이 없는 경우 (새로 생성하는 경우)
    if (!initialSchedules || initialSchedules.length === 0) return true;

    // 3. 초기 스케줄이 있는 경우 (수정하는 경우) - 변경사항이 있어야 유효
    const daysChanged = hasSelectedDaysChanged(selectedDays, initialSchedules);
    const timesChanged = hasScheduleTimesChanged(
      isTimeVariesByDay,
      schedules,
      commonSchedule,
      initialSchedules,
    );

    return (daysChanged || timesChanged) && startDate;
  }, [
    isTimeVariesByDay,
    schedules,
    selectedDays,
    commonSchedule,
    initialSchedules,
    startDate,
  ]);

  const handleSubmit = () => {
    if (!isScheduleValid) return;

    const sendSchedules: Schedule[] = isTimeVariesByDay
      ? schedules
      : selectedDays.map((day) => ({
          day,
          start: commonSchedule!.start,
          classMinute: commonSchedule!.classMinute,
        }));

    const payload: SchedulesRequestProps = {
      schedules: sendSchedules,
      changeStartDate: startDate,
    };

    if (classMatchingId) payload.classMatchingId = classMatchingId;
    else if (token) payload.token = token;
    else {
      alert("토큰이나 classMatchingId가 없습니다.");
      return;
    }

    mutate(payload, {
      onSuccess: () => {
        if (token) {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("sessionId");
          router.push(`/teacher/session-schedule?${params.toString()}`);
        } else router.back();
      },
    });
  };

  return {
    selectedDays,
    selectedDayForTimePicker,
    setSelectedDayForTimePicker,
    toggleDay,
    isTimeVariesByDay,
    setIsTimeVariesByDay,
    schedules: displaySchedules,
    commonSchedule: displayCommonSchedule,
    updateSchedule,
    sortedSelectedDays,
    handleSubmit,
    isScheduleValid,
    isPending,
  };
}
