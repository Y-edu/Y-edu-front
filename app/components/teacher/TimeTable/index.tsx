"use client";

import { Snackbar } from "@mui/material";

import { getSplitHoursToStringFormat } from "@/utils/date";
import Button from "@/ui/Button";

import { useTimeTable } from "./useTimeTable";

interface TimeTableProps {
  initialPhoneNumber: string;
  initialName: string;
  initialSelectTime: Record<string, string[]>;
  onHasTimeChange?: (hasChanges: boolean) => void;
}

export function TimeTable(props: TimeTableProps) {
  const {
    currentDate,
    selectedCell,
    snackbarOpen,
    hasChanges,
    handleCellClick,
    handleNotClick,
    handleSubmit,
    closeSnackbar,
  } = useTimeTable(
    props.initialSelectTime,
    props.initialName,
    props.initialPhoneNumber,
    props.onHasTimeChange,
  );

  const week = ["월", "화", "수", "목", "금", "토", "일"];
  const times = getSplitHoursToStringFormat();

  return (
    <div className="m-5 mx-auto flex w-full flex-col pb-[100px]">
      {/* 요일 헤더 */}
      <div className="mb-3 flex justify-between pl-[61px] pr-5">
        {week.map((d) => (
          <div key={d} className="mx-1 w-[37px] text-center">
            {d}
          </div>
        ))}
      </div>

      {/* 테이블 영역 */}
      <div className="mb-[40px] flex h-[677px] w-full justify-between px-5">
        {/* 시간축 */}
        <div className="mr-1 mt-[-14px] flex h-[697px] w-[37px] flex-col items-center">
          {times.map((time, i) => {
            const hour = parseInt(time, 10);
            const gap =
              [18, 24, 10, 16, ...Array(times.length - 4).fill(24), 0][i] ?? 0;
            const isSpec = hour === 9 || hour === 12;
            const label = hour === 9 ? "오전" : hour === 12 ? "오후" : null;
            return (
              <div
                key={time}
                className={`text-[14px] text-gray-500 ${
                  isSpec ? "flex flex-col items-center" : ""
                }`}
                style={{ marginBottom: `${gap}px` }}
              >
                {isSpec ? (
                  <>
                    <span>{label}</span>
                    <span>{hour}</span>
                  </>
                ) : (
                  <span>{hour}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* 요일별 셀 */}
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

      {/* 저장 버튼 */}
      <div className="fixed inset-x-0 bottom-0 bg-white px-5 pb-5">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges}
          onClick={handleSubmit}
          className="h-[59px] w-full rounded-[12px] font-bold"
        >
          변경된 시간 저장
        </Button>
      </div>

      {/* 스낵바 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={closeSnackbar}
        message="변경된 시간이 저장되었습니다."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: "81%", mx: "20px" }}
      />
    </div>
  );
}
