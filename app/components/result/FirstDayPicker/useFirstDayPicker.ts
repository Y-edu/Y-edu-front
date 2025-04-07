import { useMemo, useState } from "react";
import { getDaysInMonth } from "date-fns";

import { FirstDay } from "@/components/result/ConfirmedResult";

const today = new Date();
const year = today.getFullYear();
const currentMonth = today.getMonth();

const generateMonthOptions = () =>
  Array.from({ length: 3 }, (_, i) => {
    const date = new Date(year, currentMonth + i);
    return `${date.getMonth() + 1}월`;
  });

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
      month: `${currentMonth + 1}월`,
      day: "1일",
      period: "오후",
      hour: "1",
      minute: "00",
    },
  );

  const selectedMonthIndex = monthOptions.findIndex(
    (m) => m === selected.month,
  );
  const selectedMonthNumber = parseInt(monthOptions[selectedMonthIndex]) - 1;

  const dayOptions = useMemo(
    () => getDaysArray(year, selectedMonthNumber),
    [selectedMonthNumber],
  );

  return {
    selected,
    setSelected,
    options: {
      month: monthOptions,
      day: dayOptions,
      period: periodOptions,
      hour: hourOptions,
      minute: minuteOptions,
    },
  };
};
