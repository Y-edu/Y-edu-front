import { useMemo, useState } from "react";
import { addMonths, format, getDaysInMonth } from "date-fns";

import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";

const today = new Date(2024, 11);

const generateMonthOptions = () =>
  Array.from({ length: 3 }, (_, i) => format(addMonths(today, i), "M월"));

const getDaysArray = (year: number, month: number): string[] => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
};

export const useFirstDayPicker = (initial?: FirstDay | null) => {
  const monthOptions = useMemo(() => generateMonthOptions(), []);
  const periodOptions = ["오전", "오후"];
  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    `${i * 5}`.padStart(2, "0"),
  );

  const [selected, setSelected] = useState<FirstDay>(
    initial || {
      year: today.getFullYear(),
      month: `${today.getMonth() + 1}월`,
      day: "1일",
      period: "오후",
      hour: "1",
      minute: "00",
    },
  );

  const handleChangeMonth = (val: string) => {
    const monthIndex = monthOptions.findIndex((m) => m === val);
    const newDate = addMonths(today, monthIndex);

    setSelected((prev) => ({
      ...prev,
      year: newDate.getFullYear(),
      month: val,
    }));
  };

  const selectedMonthIndex = monthOptions.findIndex(
    (m) => m === selected.month,
  );
  const selectedDate = addMonths(today, selectedMonthIndex);

  const dayOptions = useMemo(
    () => getDaysArray(selectedDate.getFullYear(), selectedDate.getMonth()),
    [selectedMonthIndex],
  );

  return {
    selected,
    setSelected,
    handleChangeMonth,
    options: {
      month: monthOptions,
      day: dayOptions,
      period: periodOptions,
      hour: hourOptions,
      minute: minuteOptions,
    },
  };
};
