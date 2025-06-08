import { useMemo, useState } from "react";
import { addMonths, format, getDaysInMonth } from "date-fns";
import { ko } from "date-fns/locale";

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

export const useStartDatePicker = (date?: string) => {
  const MONTHS = useMemo(() => generateMonthOptions(), []);

  const getInitialSelected = () => {
    const {
      year = today.getFullYear(),
      month = `${today.getMonth() + 1}월`,
      day = `1일 (${today.getDay()})`,
    } = date ?? {};

    return {
      year,
      month,
      day,
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
    options: {
      month: MONTHS,
      day: dayOptions,
    },
  };
};
