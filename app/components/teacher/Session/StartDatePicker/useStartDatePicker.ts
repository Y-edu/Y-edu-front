import { useMemo, useState } from "react";

interface UseStartDatePickerReturn {
  options: {
    year: string[];
    month: string[];
    day: string[];
  };
  selected: {
    year: string;
    month: string;
    day: string;
  };
  displaySelected: {
    year: string;
    month: string;
    day: string;
  };
  handleChangeMonth: (month: string) => void;
  setSelected: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
    }>
  >;
}

const dayOfWeekKor = ["일", "월", "화", "수", "목", "금", "토"];

export const useStartDatePicker = (
  startDateOptions: string[],
): UseStartDatePickerReturn => {
  const [selected, setSelected] = useState(() => {
    const fallback =
      startDateOptions[0] ?? new Date().toISOString().slice(0, 10);
    const date = new Date(fallback);

    return {
      year: String(date.getFullYear()),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      day: String(date.getDate()).padStart(2, "0"),
    };
  });

  const dateMap = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    startDateOptions.forEach((dateStr) => {
      const date = new Date(dateStr);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      if (!result[month]) result[month] = new Set();
      result[month].add(day);
    });
    return result;
  }, [startDateOptions]);

  const options = useMemo(() => {
    const monthList = Object.keys(dateMap)
      .sort()
      .map((month) => `${parseInt(month)}월`);

    const dayList = Array.from(dateMap[selected.month] || [])
      .sort()
      .map((day) => {
        const fullDate = `${selected.year}-${selected.month}-${day}`;
        const weekday = dayOfWeekKor[new Date(fullDate).getDay()];
        return `${parseInt(day)}일 (${weekday})`;
      });

    return {
      year: [],
      month: monthList,
      day: dayList,
    };
  }, [dateMap, selected.month]);

  const handleChangeMonth = (displayMonth: string) => {
    const month = displayMonth.replace("월", "").padStart(2, "0");
    setSelected((prev) => {
      const newDayList = Array.from(dateMap[month] || []).sort();
      const defaultDay = newDayList[0] || "01";
      return { ...prev, month, day: defaultDay };
    });
  };

  const displaySelected = {
    year: selected.year,
    month: `${parseInt(selected.month)}월`,
    day: (() => {
      const fullDate = `${selected.year}-${selected.month}-${selected.day}`;
      const weekday = dayOfWeekKor[new Date(fullDate).getDay()];
      return `${parseInt(selected.day)}일 (${weekday})`;
    })(),
  };

  return {
    options,
    selected,
    displaySelected,
    handleChangeMonth,
    setSelected,
  };
};
