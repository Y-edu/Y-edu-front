"use client";

import { getSplitHoursToStringFormat } from "@/utils/date";

interface TimeTableProps {
  currentDate: Record<string, string[]>;
  selectedCell: { day: string; time: string };
  onCellClick: (day: string, time: string) => void;
  onCellUnclick: (day: string, time: string) => void;
}

export default function TimeTable({
  currentDate,
  selectedCell,
  onCellClick,
  onCellUnclick,
}: TimeTableProps) {
  const WEEK = ["월", "화", "수", "목", "금", "토", "일"];
  const times = getSplitHoursToStringFormat();
  const gaps = [18, 24, 10, 16, ...Array(times.length - 4).fill(24), 0];

  // 각 모서리 border-radius 계산 헬퍼
  const getCornerClass = (dayIdx: number, timeIdx: number) => {
    if (dayIdx === 0 && timeIdx === 0) return "rounded-tl-[5px]";
    if (dayIdx === WEEK.length - 1 && timeIdx === 0) return "rounded-tr-[5px]";
    if (dayIdx === 0 && timeIdx === times.length - 1) return "rounded-bl-[5px]";
    if (dayIdx === WEEK.length - 1 && timeIdx === times.length - 1)
      return "rounded-br-[5px]";
    return "";
  };

  return (
    <div className="m-5 mx-auto flex w-full flex-col pb-[100px]">
      {/* 요일 헤더 */}
      <div className="mb-3 flex justify-between pl-[61px] pr-5">
        {WEEK.map((day) => (
          <div key={day} className="mx-1 w-[37px] text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 테이블 영역 */}
      <div className="mb-[40px] flex h-[677px] w-full justify-between px-5">
        {/* 시간축 */}
        <div className="mr-1 mt-[-14px] flex h-[697px] w-[37px] flex-col items-center">
          {times.map((time, idx) => {
            const hour = parseInt(time, 10);
            const gap = gaps[idx] ?? 0;
            const isSpec = hour === 9 || hour === 12;
            const label = hour === 9 ? "오전" : hour === 12 ? "오후" : null;
            return (
              <div
                key={time}
                className={`text-[14px] text-gray-500 ${isSpec ? "flex flex-col items-center" : ""}`}
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
          {WEEK.map((day, dayIdx) => (
            <div key={day} className="flex size-full flex-col">
              {times.map((time, timeIdx) => {
                const slotKey = time + ":00";
                const isAvailable = currentDate[day]?.includes(slotKey);
                const isSelected =
                  selectedCell.day === day && selectedCell.time === time;
                const isActive = isAvailable || isSelected;
                const cornerClass = getCornerClass(dayIdx, timeIdx);
                const toggle = () =>
                  isActive ? onCellUnclick(day, time) : onCellClick(day, time);

                return (
                  <div
                    key={time}
                    role="button"
                    tabIndex={0}
                    onClick={toggle}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") && toggle()
                    }
                    className={`size-full border border-gray-300 ${
                      dayIdx !== WEEK.length - 1 ? "border-r-0" : ""
                    } ${timeIdx !== times.length - 1 ? "border-b-0" : ""} ${
                      isActive ? "bg-primary" : "bg-white"
                    } ${cornerClass}`}
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
