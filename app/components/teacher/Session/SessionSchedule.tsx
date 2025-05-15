"use client";
import { useState } from "react";

import DivWithLabel from "@/components/result/DivWithLabel";
import TitleSection from "@/ui/TitleSection";
import TimePicker from "@/components/result/TimePicker";
import Chip from "@/ui/Chip";
import Checkbox from "@/ui/CheckBox";
import SelectButton from "@/components/result/SelectButton";
import BottomSheet from "@/ui/BottomSheet";
import Button from "@/ui/Button";
import cn from "@/utils/cn";

import {
  DAYS,
  useSessionSchedule,
  DisplaySchedule,
  Schedule,
} from "./useSessionSchedule";

export interface SessionScheduleProps {
  title: string;
  token: string;
  className?: string;
  initialSchedules?: Schedule[];
}

export default function SessionSchedule(props: SessionScheduleProps) {
  const { title, className = "", token, initialSchedules = [] } = props;
  const {
    selectedDays,
    toggleDay,
    isTimeVariesByDay,
    setIsTimeVariesByDay,
    schedules,
    commonSchedule,
    updateSchedule,
    selectedDayForTimePicker,
    setSelectedDayForTimePicker,
    sortedSelectedDays,
    handleSubmit,
    isScheduleValid,
  } = useSessionSchedule({ token, initialSchedules });
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleOpenTimePicker = (day: string) => {
    setSelectedDayForTimePicker(day);
    setIsTimePickerOpen(true);
  };

  return (
    <div className={cn("flex flex-col gap-10 px-5", className)}>
      <TitleSection>
        <TitleSection.Title className="whitespace-pre">
          {title}
        </TitleSection.Title>
      </TitleSection>
      <div>
        <DivWithLabel label="수업 요일">
          <div className="flex flex-wrap justify-between gap-1">
            {DAYS.map((day) => (
              <Chip
                key={day}
                chipText={day}
                isSelected={selectedDays.includes(day)}
                onClick={() => toggleDay(day)}
              />
            ))}
          </div>
        </DivWithLabel>
      </div>
      <div className="flex flex-col gap-[12px]">
        {isTimeVariesByDay ? (
          sortedSelectedDays.map((day) => {
            const matched = schedules.find((s) => s.day === day) || null;
            return (
              <DivWithLabel
                key={day}
                label="수업 시간"
                subLabel={`(${day}요일)`}
              >
                <SelectButton
                  text={
                    matched &&
                    `${matched.period} ${matched.time} ${matched.classMinute}분 진행`
                  }
                  isActive={
                    isTimePickerOpen && selectedDayForTimePicker === day
                  }
                  onClick={() => handleOpenTimePicker(day)}
                />
              </DivWithLabel>
            );
          })
        ) : (
          <DivWithLabel label="수업 시간">
            <SelectButton
              text={
                commonSchedule &&
                `${commonSchedule.period} ${commonSchedule.time} ${commonSchedule.classMinute}분 진행`
              }
              isActive={isTimePickerOpen && selectedDayForTimePicker === ""}
              onClick={() => handleOpenTimePicker("")}
            />
          </DivWithLabel>
        )}
        <Checkbox
          id="time-picker"
          label="요일마다 수업 시간이 달라요"
          isChecked={isTimeVariesByDay}
          onChange={() => setIsTimeVariesByDay((prev) => !prev)}
          className="mt-[4px]"
        />

        {/* 나중에 toast alert 추가하기 */}
        <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
          <Button
            className="w-[335px]"
            disabled={!isScheduleValid}
            onClick={handleSubmit}
          >
            완료하기
          </Button>
        </div>
      </div>

      <BottomSheet
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
      >
        <TimePicker
          day={selectedDayForTimePicker}
          schedule={
            isTimeVariesByDay
              ? schedules.find((s) => s.day === selectedDayForTimePicker)
              : commonSchedule
          }
          onSelect={(selected: DisplaySchedule) => {
            updateSchedule(selected);
            setIsTimePickerOpen(false);
          }}
        />
      </BottomSheet>
    </div>
  );
}
