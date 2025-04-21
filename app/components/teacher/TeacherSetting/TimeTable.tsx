import { useEffect, useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";
import { Snackbar } from "@mui/material";

import { getSplitHoursToStringFormat } from "@/utils/date";
import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";
import Button from "@/ui/Button";

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

  const handleSubmit = () => {
    if (!patchTime) return;
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
      <div className="mb-[40px] flex h-[677px] w-full justify-between px-5">
        {/* 시간 영역 */}
        <div className="mr-1 mt-[-14px] flex h-[697px] w-[37px] flex-col items-center">
          {(() => {
            const times = Array.from(
              { length: 23 - 9 + 1 },
              (_, i) => `${9 + i}:00`,
            );
            const gaps = [
              18, // 9→10
              24, // 10→11
              10, // 11→12
              16, // 12→13
              ...Array(23 - 11).fill(24),
              0,
            ];

            return times.map((time, i) => {
              const hour = parseInt(time, 10);
              const gap = gaps[i] ?? 0;
              const isSpecial = hour === 9 || hour === 12;
              const label = hour === 9 ? "오전" : hour === 12 ? "오후" : null;

              return (
                <div
                  key={time}
                  className={`text-[14px] text-gray-500 ${isSpecial ? "flex flex-col items-center" : ""} `}
                  style={{ marginBottom: `${gap}px` }}
                >
                  {isSpecial ? (
                    <>
                      <span>{label}</span>
                      <span>{hour}</span>
                    </>
                  ) : (
                    <span>{hour}</span>
                  )}
                </div>
              );
            });
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
      <div className="fixed inset-x-0 bottom-0 bg-white px-5 pb-5">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges || patchTime === undefined}
          onClick={handleSubmit}
          className="h-[59px] w-full rounded-[12px] font-bold"
        >
          변경된 시간 저장
        </Button>
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
