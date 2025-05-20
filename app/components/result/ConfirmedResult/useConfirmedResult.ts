"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  FirstDayDTO,
  ScheduleDTO,
  ScheduleRequest,
} from "@/actions/put-schedule";
import { usePutSchedule } from "@/hooks/mutation/usePutSchedule";
import { useTextareaWithMaxLength } from "@/ui/Textarea/useMaxLengthValidator";

export const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export interface Schedule {
  period: string;
  day: string;
  time: string;
  classMinute: number;
}

export interface FirstDay {
  year: number;
  month: string;
  day: string; // ex. 5일 (목)
  period: string;
  time: string;
}

export function useConfirmedResult() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDayForTimePicker, setSelectedDayForTimePicker] = useState("");

  const [isTimeVariesByDay, setIsTimeVariesByDay] = useState(false);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [commonSchedule, setCommonSchedule] = useState<Omit<
    Schedule,
    "day"
  > | null>(null);
  const [firstDay, setFirstDay] = useState<FirstDay | null>(null);

  const { mutate } = usePutSchedule();
  const { managementId } = useParams();
  const {
    value: bookInfo,
    error: bookInfoError,
    onChange: setBookInfo,
  } = useTextareaWithMaxLength(30);

  const toggleDay = (day: string) => {
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

  const sortedSelectedDays = useMemo(
    () => [...selectedDays].sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b)),
    [selectedDays],
  );

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

  const isScheduleValid = useMemo(() => {
    return isTimeVariesByDay
      ? schedules.length === selectedDays.length
      : !!commonSchedule?.time && !!commonSchedule?.classMinute;
  }, [isTimeVariesByDay, schedules, selectedDays.length, commonSchedule]);

  const isFormValid = useMemo(() => {
    return (
      bookInfo.trim() !== "" &&
      bookInfo.length <= 30 &&
      !!firstDay &&
      selectedDays.length > 0 &&
      isScheduleValid
    );
  }, [bookInfo, firstDay, selectedDays.length, isScheduleValid]);

  const to24HourFormat = (period: string, timeWithSuffix: string): string => {
    const time = timeWithSuffix.replace("부터", "").trim();
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");

    if (period === "오전") {
      if (hour === 12) hour = 0;
    } else if (period === "오후") {
      if (hour !== 12) hour += 12;
    }

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };

  const handleSubmit = () => {
    if (!firstDay || !bookInfo) {
      alert("수업 시작일과 교재 정보를 입력해주세요.");
      return;
    }

    const scheduleList: ScheduleDTO[] = isTimeVariesByDay
      ? schedules.map(({ period, day, time, classMinute }) => ({
          day,
          start: to24HourFormat(period, time),
          classMinute,
        }))
      : selectedDays.map((day) => ({
          day,
          start: to24HourFormat(commonSchedule!.period, commonSchedule!.time),
          classMinute: commonSchedule!.classMinute,
        }));

    const cleanMonth = firstDay.month
      .replace(/\s*\(.*\)$/, "")
      .replace("월", "")
      .padStart(2, "0");

    const cleanDay = firstDay.day
      .replace(/\s*\(.*\)$/, "")
      .replace("일", "")
      .padStart(2, "0");

    const firstDayDTO: FirstDayDTO = {
      date: `${firstDay.year}-${cleanMonth}-${cleanDay}`,
      start: to24HourFormat(firstDay.period, firstDay.time),
    };

    const payload: ScheduleRequest = {
      classScheduleManagementId: managementId as string,
      textBook: bookInfo,
      schedules: scheduleList,
      firstDay: firstDayDTO,
    };

    mutate(payload, {
      onSuccess: () => {
        router.replace(`?step=submitted`);
      },
    });
  };

  return {
    selectedDays,
    toggleDay,
    isTimeVariesByDay,
    setIsTimeVariesByDay,
    sortedSelectedDays,
    schedules,
    commonSchedule,
    updateSchedule,
    firstDay,
    setFirstDay,
    bookInfo,
    setBookInfo,
    bookInfoError,
    handleSubmit,
    selectedDayForTimePicker,
    setSelectedDayForTimePicker,
    isFormValid,
  };
}
