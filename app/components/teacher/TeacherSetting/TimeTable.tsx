import { useEffect, useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";
import { Snackbar } from "@mui/material";

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
  onHasTimeChange?: (hasChanges: boolean) => void;
}

export function TimeTable({
  initialName,
  initialPhoneNumber,
  initialSelectTime,
  onHasTimeChange,
}: TimeTableProps) {
  const { mutate: patchTime } = useUpdateTeacherAvailable();
  const [currentDate, setCurrentDate] =
    useState<Record<string, string[]>>(initialSelectTime);
  const [savedSelectTime, setSavedSelectTime] =
    useState<Record<string, string[]>>(initialSelectTime);
  const [selectedCell, setSelectedCell] = useState<TimeCell>({
    day: "",
    time: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const hasChanges =
    JSON.stringify(savedSelectTime) !== JSON.stringify(currentDate);

  useEffect(() => {
    if (onHasTimeChange) {
      onHasTimeChange(hasChanges);
    }
  }, [hasChanges, onHasTimeChange]);

  return (
    <div className="m-5 mx-auto flex w-full flex-col pb-[100px]">
      {/* 요일 영역 */}
      <div className="mb-3 flex justify-between pl-[61px] pr-5">
        {week.map((day) => (
          <div key={day} className="mx-1 w-[37px] rounded text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="flex h-[677px] w-full justify-between px-5">
        {/* 시간 영역 */}
        <div className="mr-1 mt-[-10px] flex h-[697px] w-[37px] flex-col items-center justify-between">
          {(() => {
            const times = getSplitHoursToStringFormat();

            if (times[times.length - 1] !== "24:00") {
              times.push("24:00");
            }

            return times.map((v) => (
              <div key={v} className="text-[14px] text-primaryNormal">
                {v}
              </div>
            ));
          })()}
        </div>
        {/* 테이블 영역 */}
        <div className="flex w-full">
          {week.map((day, dayIndex) => {
            const times = getSplitHoursToStringFormat();

            return (
              <div key={day} className="flex size-full flex-col">
                {times.map((time, timeIndex) => {
                  const isAvailable = currentDate[day]?.includes(time + ":00");
                  const isSelected =
                    (selectedCell.day === day && selectedCell.time === time) ||
                    currentDate[day]?.includes(time + ":00");

                  // 각 모서리 border-radius 설정
                  const extraClasses =
                    dayIndex === 0 && timeIndex === 0
                      ? "rounded-tl-[5px]"
                      : dayIndex === 0 && timeIndex === times.length - 1
                        ? "rounded-bl-[5px]"
                        : dayIndex === week.length - 1 && timeIndex === 0
                          ? "rounded-tr-[5px]"
                          : dayIndex === week.length - 1 &&
                              timeIndex === times.length - 1
                            ? "rounded-br-[5px]"
                            : "";

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
                      className={`size-full border border-gray-300 ${
                        dayIndex !== week.length - 1 ? "border-r-0" : ""
                      } ${
                        timeIndex !== times.length - 1 ? "border-b-0" : ""
                      } ${isAvailable || isSelected ? "bg-primary" : "bg-white"} ${extraClasses} `}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[375px] bg-white px-5 pb-4 pt-2">
        <button
          disabled={!hasChanges || patchTime === undefined}
          className={`h-[48px] w-full rounded-[12px] font-bold ${
            !hasChanges
              ? "bg-gray-400 text-white"
              : "bg-primaryNormal text-white"
          }`}
          onClick={() => {
            patchTime(
              {
                phoneNumber: initialPhoneNumber,
                name: initialName,
                available: currentDate,
              },
              {
                onSuccess: () => {
                  setSnackbarOpen(true);
                  setSavedSelectTime(currentDate);
                },
              },
            );
          }}
        >
          <span>변경된 시간 저장</span>
        </button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        message="변경된 시간이 저장되었습니다."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "81%",
          mx: "20px",
        }}
      />
    </div>
  );
}
