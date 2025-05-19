import { useMemo, useState } from "react";
import { addMonths, format, getDaysInMonth } from "date-fns";
import { ko } from "date-fns/locale";

import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

const today = new Date();

const generateMonthOptions = () =>
  Array.from({ length: 3 }, (_, i) => format(addMonths(today, i), "M월"));

const getDaysArray = (year: number, month: number): string[] => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => {
    const currentDate = new Date(year, month, i + 1);
    const dayOfWeek = format(currentDate, "eee", { locale: ko });
    return `${i + 1}일 (${dayOfWeek})`;
  });
};

type OptionKey = "month" | "day" | "period" | "hour" | "minute";

export const useFirstDayPicker = (firstDay?: FirstDay | null) => {
  const MONTHS = useMemo(() => generateMonthOptions(), []);
  const PERIODS = ["오전", "오후"];
  const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const MINUTES = Array.from({ length: 12 }, (_, i) =>
    `${i * 5}`.padStart(2, "0"),
  );

  const getInitialSelected = () => {
    const {
      year = today.getFullYear(),
      month = `${today.getMonth() + 1}월`,
      day = `1일 (${today.getDay()})`,
      period = "오후",
      time = "2:00",
    } = firstDay ?? {};

    const [hour = "2", minute = "00"] = time.split(":");

    return {
      year,
      month,
      day,
      period,
      hour,
      minute,
    };
  };

  const [selected, setSelected] = useState(getInitialSelected);

  const handleChangeMonth = (val: string) => {
    const monthIndex = MONTHS.findIndex((m) => m === val);
    const newDate = addMonths(today, monthIndex);

    setSelected((prev) => ({
      ...prev,
      year: newDate.getFullYear(),
      month: val,
    }));
  };

  const handleChange = (key: OptionKey, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const convertToFirstDayDTO = (): FirstDay => ({
    year: selected.year,
    month: selected.month,
    day: selected.day,
    period: selected.period,
    time: `${selected.hour}:${selected.minute}`,
  });

  const selectedMonthIndex = MONTHS.findIndex((m) => m === selected.month);
  const selectedDate = addMonths(today, selectedMonthIndex);

  const dayOptions = useMemo(
    () => getDaysArray(selectedDate.getFullYear(), selectedDate.getMonth()),
    [selectedDate],
  );

  return {
    selected,
    setSelected,
    handleChangeMonth,
    handleChange,
    convertToFirstDayDTO,
    options: {
      month: MONTHS,
      day: dayOptions,
      period: PERIODS,
      hour: HOURS,
      minute: MINUTES,
    },
  };
};
