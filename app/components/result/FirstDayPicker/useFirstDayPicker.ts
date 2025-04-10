import { useMemo, useState } from "react";
import { addMonths, format, getDaysInMonth } from "date-fns";

import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

const today = new Date();

const generateMonthOptions = () =>
  Array.from({ length: 3 }, (_, i) => format(addMonths(today, i), "M월"));

const getDaysArray = (year: number, month: number): string[] => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
};

type OptionKey = "month" | "day" | "period" | "hour" | "minute";

export const useFirstDayPicker = (firstDay?: FirstDay | null) => {
  const MONTHS = useMemo(() => generateMonthOptions(), []);
  const PERIODS = ["오전", "오후"];
  const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const MINUTES = Array.from({ length: 12 }, (_, i) =>
    `${i * 5}`.padStart(2, "0"),
  );

  const {
    year = today.getFullYear(),
    month = `${today.getMonth() + 1}월`,
    day = "1일",
    period = "오후",
    time = "2:00",
  } = firstDay ?? {};

  const [selected, setSelected] = useState({
    year,
    month,
    day,
    period,
    hour: time.split(":")[0],
    minute: time.split(":")[1],
  });

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
