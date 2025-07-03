import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

export function convertToFirstDay(date: Date, rawTime: string): FirstDay {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}월`;

  const dayOfWeek = format(date, "eee", { locale: ko });
  const day = `${date.getDate()}일 (${dayOfWeek})`;

  const [period, time] = rawTime.trim().split(" ");

  return {
    year,
    month,
    day,
    period,
    time,
  };
}

export function to24HourTime(period: string, time: string) {
  const [hourStr, minuteStr] = time.split(":");
  let hour = Number(hourStr);

  if (period === "오전") {
    if (hour === 12) hour = 0;
  } else if (period === "오후") {
    if (hour !== 12) hour += 12;
  }

  const paddedHour = String(hour).padStart(2, "0");
  return `${paddedHour}:${minuteStr}:00`;
}

export function cleanDateString(dateStr: string, suffix: string): string {
  return dateStr
    .replace(/\s*\(.*\)$/, "")
    .replace(suffix, "")
    .padStart(2, "0");
}

export function formatFirstDayToDateString(firstDay: FirstDay): {
  formattedDate: string;
  formattedTime: string;
} {
  const cleanMonth = cleanDateString(firstDay.month, "월");
  const cleanDay = cleanDateString(firstDay.day, "일");

  const formattedDate = `${firstDay.year}-${cleanMonth}-${cleanDay}`;
  const formattedTime = to24HourTime(firstDay.period, firstDay.time);

  return { formattedDate, formattedTime };
}
