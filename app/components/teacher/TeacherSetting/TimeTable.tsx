import { useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";

import { getSplitHoursToStringFormat } from "@/utils/date";
import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";

interface TimeCell {
  day: string;
  time: string;
}

interface TimeTableProps {
  initialPhoneNumber: string;
  initialName: string;
  initialSelectTime: Record<string, string[]>;
}

export function TimeTable({
  initialName,
  initialPhoneNumber,
  initialSelectTime,
}: TimeTableProps) {
  const { mutate } = useUpdateTeacherAvailable();
  const [currentDate, setCurrentDate] =
    useState<Record<string, string[]>>(initialSelectTime);
  const [selectedCell, setSelectedCell] = useState<TimeCell>({
    day: "",
    time: "",
  });

  const week = ["월", "화", "수", "목", "금", "토", "일"];

  const handleCellClick = (day: string, time: string) => {
    const timeWithSeconds = time + ":00";

    if (day === selectedCell.day && time === selectedCell.time) {
      setSelectedCell({ day: "", time: "" });
      setCurrentDate((prev) => ({
        ...prev,
        [day]: prev[day].filter((t) => t !== timeWithSeconds),
      }));
    } else {
      setSelectedCell({ day, time });
      const [startHour, startMinute] = time.split(":").map(Number);

      const selectedDateRange = eachMinuteOfInterval({
        start: new Date(2025, 2, 26, startHour, startMinute),
        end: new Date(2025, 2, 26, startHour, startMinute + 59),
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

  const handleNotClick = (day: string, time: string) => {
    if (currentDate[day]?.includes(time + ":00")) {
      setCurrentDate((prev) => ({
        ...prev,
        [day]: prev[day].filter((t) => t !== time + ":00"),
      }));
    }
    setSelectedCell({ day: "", time: "" });
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
                const isAvailable = currentDate[day]?.includes(time + ":00");

                const isSelected =
                  (selectedCell.day === day && selectedCell.time === time) ||
                  currentDate[day]?.includes(time + ":00");

                return (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (isSelected || isAvailable) {
                        handleNotClick(day, time);
                      } else {
                        handleCellClick(day, time);
                      }
                    }}
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
      <div className="mt-[30px] flex h-auto w-full bg-white px-5 pb-[30px]">
        <button
          disabled={
            Object.entries(initialSelectTime).toString() ===
            Object.entries(currentDate).toString()
          }
          className={`h-[48px] w-full rounded-[12px] ${
            Object.entries(initialSelectTime).toString() ===
            Object.entries(currentDate).toString()
              ? "cursor-not-allowed bg-gray-400"
              : "bg-primaryNormal text-white"
          }`}
          onClick={() => {
            if (confirm("변경된 시간을 저장하시겠습니까?")) {
              mutate(
                {
                  phoneNumber: initialPhoneNumber,
                  name: initialName,
                  available: currentDate,
                },
                {
                  onSuccess: () => {
                    alert("저장되었습니다.");
                  },
                },
              );
            }
          }}
        >
          <span className="text-white">변경된 시간 저장</span>
        </button>
      </div>
    </div>
  );
}
