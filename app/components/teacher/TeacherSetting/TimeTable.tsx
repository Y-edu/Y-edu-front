import { isEqual } from "date-fns";
import { useState } from "react";

import { getSplitHoursToStringFormat } from "@/utils/date";

export function TimeTable() {
  const MOCK_TIME_DATA = {
    월: [],
    화: ["18:00:00", "19:00:00", "20:00:00"],
    수: ["20:00:00", "21:00:00", "22:00:00"],
    목: ["09:00:00", "09:30:00", "10:00:00", "11:00:00"],
    금: ["09:00:00", "10:00:00", "11:00:00"],
    토: ["12:00:00", "13:00:00", "14:00:00"],
    일: [],
  };

  const [currentDate, setCurrentDate] = useState(MOCK_TIME_DATA);
  const [startCell, setStartCell] = useState({ day: "", time: "" });
  const [endCell, setEndCell] = useState({ day: "", time: "" });

  const week = ["월", "화", "수", "목", "금", "토", "일"];

  const handleCellClick = (day, time) => {
    if (!startCell.day && !startCell.time) {
      setStartCell({ day, time });
      return;
    }

    if (!startCell.day && !startCell.time) {
      setStartCell({ day, time });
    } else {
      // 선택된 셀의 시작 시간과 끝 시간을 설정
      setEndCell({ day, time });
    }
  };

  return (
    <div className="m-5 mx-auto flex w-full flex-col">
      <div className="mb-2 flex w-full">
        {["", "월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <div key={day} className="w-[50px] rounded text-center transition">
            {day}
          </div>
        ))}
      </div>

      <div className="flex w-full">
        <div className="flex w-[50px] flex-col items-start">
          {getSplitHoursToStringFormat().map((v, index) => (
            <div
              key={v}
              className="rounded p-2 text-center text-[12px] text-primaryNormal"
            >
              {index % 2 !== 0 ? "" : v}
            </div>
          ))}
        </div>

        {/* 요일별 시간 박스 */}
        <div className="flex grow">
          {week.map((day) => (
            <div key={day} className="flex grow flex-col">
              {getSplitHoursToStringFormat().map((time) => {
                const isAvailable = MOCK_TIME_DATA[day].some((availableTime) =>
                  isEqual(
                    new Date(`1970-01-01T${time}:00`),
                    new Date(`1970-01-01T${availableTime}`),
                  ),
                );

                const isSelected =
                  (startCell.day === day && startCell.time === time) ||
                  (endCell.day === day && endCell.time === time) ||
                  (startCell.day === day &&
                    new Date(`1970-01-01T${time}:00`) >=
                      new Date(`1970-01-01T${startCell.time}:00`) &&
                    new Date(`1970-01-01T${time}:00`) <=
                      new Date(`1970-01-01T${endCell.time}:00`));

                return (
                  <div
                    onClick={() => handleCellClick(day, time)}
                    key={time}
                    className={`grow rounded border border-gray-300 p-2 text-center text-[12px] ${
                      isAvailable || isSelected
                        ? "bg-red-500 text-white"
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
