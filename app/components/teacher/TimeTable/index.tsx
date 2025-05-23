"use client";

import { useEffect, useState } from "react";

import { getSplitHoursToStringFormat } from "@/utils/date";

import GuideTimeTable from "./GuideTimeTable";

export type Mode = "teacher" | "parent";

interface Session {
  day: string;
  startTime: string;
  slots: string[];
}

interface TimeTableProps {
  mode: Mode;
  currentTime: Record<string, string[]>;
  selectedCell?: { day: string; time: string };
  selectedSessions?: Session[];
  onCellClick: (day: string, time: string) => void;
  onCellUnclick: (day: string, time: string) => void;
}

const WEEK = ["월", "화", "수", "목", "금", "토", "일"];
const times = getSplitHoursToStringFormat();
const gaps = [18, 24, 10, 16, ...Array(times.length - 4).fill(24), 0];
const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !("MSStream" in window);

export default function TimeTable({
  mode,
  currentTime,
  selectedSessions,
  onCellClick,
  onCellUnclick,
}: TimeTableProps) {
  const isTeacher = mode === "teacher";
  const isParent = mode === "parent";

  // 각 모서리 border-radius
  const getCornerClass = (dayIdx: number, timeIdx: number) => {
    if (dayIdx === 0 && timeIdx === 0) return "rounded-tl-[5px]";
    if (dayIdx === WEEK.length - 1 && timeIdx === 0) return "rounded-tr-[5px]";
    if (dayIdx === 0 && timeIdx === times.length - 1) return "rounded-bl-[5px]";
    if (dayIdx === WEEK.length - 1 && timeIdx === times.length - 1)
      return "rounded-br-[5px]";
    return "";
  };

  const [hasMounted, setHasMounted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const isEmpty = Object.values(currentTime).every((arr) => arr.length === 0);
    if (!showGuide) setShowGuide(isEmpty);
    setHasMounted(true);
  }, [currentTime]);

  if (!hasMounted) return null;

  return (
    <>
      {showGuide && <GuideTimeTable />}

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
            {WEEK.map((day, dIdx) => (
              <div key={day} className="flex flex-1 flex-col">
                {times.map((time, tIdx) => {
                  const slotKey = `${time}:00`;
                  const session = selectedSessions?.find((s) => s.day === day);
                  const isAvailable =
                    currentTime[day]?.includes(slotKey) ?? false;
                  const isSelected =
                    isParent && session?.slots.includes(slotKey);

                  const clickable =
                    isTeacher || (isParent && (isAvailable || isSelected));

                  let bgClass = "bg-white";
                  if (isTeacher) {
                    bgClass = isAvailable ? "bg-primary" : "bg-white";
                  } else {
                    if (isSelected) bgClass = "bg-primary";
                    else if (isAvailable) bgClass = "bg-[#C9DEFF]";
                  }

                  const cornerClass = getCornerClass(dIdx, tIdx);
                  const toggle = () => {
                    if (!clickable) return;

                    if (isTeacher) {
                      isAvailable
                        ? onCellUnclick(day, time)
                        : onCellClick(day, time);
                    } else {
                      if (session?.slots.includes(slotKey)) {
                        onCellUnclick(day, time);
                      } else {
                        onCellClick(day, time);
                      }
                    }
                  };

                  return (
                    <div
                      key={time}
                      role={clickable ? "button" : undefined}
                      tabIndex={clickable ? 0 : undefined}
                      onPointerUp={isIOS ? () => toggle() : undefined}
                      onClick={!isIOS ? () => toggle() : undefined}
                      onKeyDown={(e) =>
                        clickable &&
                        (e.key === "Enter" || e.key === " ") &&
                        toggle()
                      }
                      style={{
                        touchAction: "pan-y",
                        cursor: "pointer",
                        overscrollBehaviorY: "contain",
                      }}
                      className={`flex-1 border border-gray-300 ${dIdx !== WEEK.length - 1 ? "border-r-0" : ""} ${tIdx !== times.length - 1 ? "border-b-0" : ""} ${bgClass} ${cornerClass} `}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
