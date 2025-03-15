import { useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";

import { getSplitHoursToStringFormat } from "@/utils/date";

interface TimeCell {
  day: string;
  time: string;
}

export function TimeTable() {
  const MOCK_TIME_DATA: Record<string, string[]> = {
    월: [],
    화: ["18:00:00", "19:00:00", "20:00:00"],
    수: ["20:00:00", "21:00:00", "22:00:00"],
    목: ["09:00:00", "09:30:00", "10:00:00", "11:00:00"],
    금: ["09:00:00", "10:00:00", "11:00:00"],
    토: ["12:00:00", "13:00:00", "14:00:00"],
    일: [],
  };

  const [currentDate, setCurrentDate] =
    useState<Record<string, string[]>>(MOCK_TIME_DATA);
  const [startCell, setStartCell] = useState<TimeCell>({ day: "", time: "" });
  const [endCell, setEndCell] = useState<TimeCell>({ day: "", time: "" });

  const week = ["월", "화", "수", "목", "금", "토", "일"];

  const handleCellClick = (day: string, time: string) => {
    setStartCell({ day, time });
    if (day === startCell.day) {
      setEndCell({ day, time });
      const [startHour, startMinute] = startCell.time.split(":").map(Number);
      const [endHour, endMinute] = time.split(":").map(Number);

      const selectedDateRange = eachMinuteOfInterval({
        start: new Date(2025, 2, 26, startHour, startMinute),
        end: new Date(2025, 2, 26, endHour, endMinute),
      });
      const splitByMinutes = selectedDateRange.filter(
        (_, index) => index % 30 === 0,
      );
      const toFormatHHMM = splitByMinutes.map(
        (date) => format(date, "HH:mm") + ":00",
      );

      setCurrentDate((prev) => ({
        ...prev,
        [day]: [...new Set([...prev[day], ...toFormatHHMM])],
      }));

      setStartCell({ day: "", time: "" });
      setEndCell({ day: "", time: "" });
    }
  };

  return (
    <div className="m-5 mx-auto flex w-full flex-col">
      <div className="center flex-end mb-2 flex w-full justify-end gap-1">
        {week.map((day) => (
          <div
            key={day}
            className="mx-1 w-[32px] rounded text-center transition"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex w-full">
        <div className="flex w-[32px] flex-col items-start">
          {getSplitHoursToStringFormat().map((v, index) => (
            <div
              key={v}
              className="flex size-[32px] justify-center rounded align-middle text-[12px] text-primaryNormal"
            >
              {index % 2 !== 0 ? "" : v}
            </div>
          ))}
        </div>

        <div className="flex grow">
          {week.map((day) => (
            <div key={day} className="mx-1 flex grow flex-col">
              {getSplitHoursToStringFormat().map((time) => {
                const isAvailable = MOCK_TIME_DATA[day]?.includes(time + ":00");

                const isSelected =
                  (startCell.day === day && startCell.time === time) ||
                  (endCell.day === day && endCell.time === time) ||
                  (startCell.day === day &&
                    new Date(`1970-01-01T${time}:00`) >=
                      new Date(`1970-01-01T${startCell.time}:00`) &&
                    new Date(`1970-01-01T${time}:00`) <=
                      new Date(`1970-01-01T${endCell.time}:00`)) ||
                  currentDate[day]?.includes(time + ":00");

                // 이미 선택되어있는경우 -> 해당 시간 ~ 선택된 최대 시간 찾기

                return (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCellClick(day, time)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCellClick(day, time);
                      }
                    }}
                    key={time}
                    className={`size-[32px] border border-gray-300 p-2 text-center text-[12px] ${
                      isAvailable || isSelected
                        ? "bg-primary text-white"
                        : "bg-[#E4EFFF] text-primaryNormal"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
