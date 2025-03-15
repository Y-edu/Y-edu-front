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
  const [selectedCell, setSelectedCell] = useState<TimeCell>({
    day: "",
    time: "",
  });

  const week = ["월", "화", "수", "목", "금", "토", "일"];

  const handleCellClick = (day: string, time: string) => {
    const timeWithSeconds = time + ":00"; // Add seconds for comparison

    if (day === selectedCell.day && time === selectedCell.time) {
      // If the same cell is clicked, deselect it
      setSelectedCell({ day: "", time: "" });
      setCurrentDate((prev) => ({
        ...prev,
        [day]: prev[day].filter((t) => t !== timeWithSeconds), // Remove the time from currentDate
      }));
    } else {
      // Select the new cell
      setSelectedCell({ day, time });
      const [startHour, startMinute] = time.split(":").map(Number);

      const selectedDateRange = eachMinuteOfInterval({
        start: new Date(2025, 2, 26, startHour, startMinute),
        end: new Date(2025, 2, 26, startHour, startMinute + 59), // Select one hour range
      });
      const splitByMinutes = selectedDateRange.filter(
        (_, index) => index % 60 === 0,
      );
      const toFormatHHMM = splitByMinutes.map(
        (date) => format(date, "HH:mm") + ":00",
      );

      setCurrentDate((prev) => ({
        ...prev,
        [day]: [...new Set([...prev[day], ...toFormatHHMM])],
      }));
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
          {getSplitHoursToStringFormat().map((v) => (
            <div
              key={v}
              className="flex size-[32px] justify-center rounded align-middle text-[12px] text-primaryNormal"
            >
              {v}
            </div>
          ))}
        </div>

        <div className="flex grow">
          {week.map((day) => (
            <div key={day} className="mx-1 flex grow flex-col">
              {getSplitHoursToStringFormat().map((time) => {
                const isAvailable = MOCK_TIME_DATA[day]?.includes(time + ":00");

                const isSelected =
                  (selectedCell.day === day && selectedCell.time === time) ||
                  currentDate[day]?.includes(time + ":00");

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
