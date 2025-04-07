"use client";

import { useState } from "react";

import Button from "@/ui/Button";
import BottomSheet from "@/ui/BottomSheet";
import Checkbox from "@/ui/CheckBox";
import Textarea from "@/ui/Textarea";
import DivWithLabel from "@/components/result/DivWIthLabel";
import DayButton from "@/components/result/DayBtn";
import SelectButton from "@/components/result/SelectButton";
import TimePicker from "@/components/result/TimePicker";
import FirstDayPicker from "@/components/result/FirstDayPicker";

import { useConfirmedResult, DAYS } from "./useConfirmedResult";

export default function ConfirmedResult() {
  const {
    selectedDays,
    toggleDay,
    sortedSelectedDays,
    isTimeVariesByDay,
    setIsTimeVariesByDay,
    schedules,
    commonSchedule,
    updateSchedule,
    firstDay,
    setFirstDay,
    bookInfo,
    setBookInfo,
    selectedDayForTimePicker,
    setSelectedDayForTimePicker,
    handleSubmit,
    isFormValid,
  } = useConfirmedResult();

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isFirstDayPickerOpen, setIsFirstDayPickerOpen] = useState(false);

  const handleOpenTimePicker = (day: string) => {
    setSelectedDayForTimePicker(day);
    setIsTimePickerOpen(true);
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <h1 className="text-[24px] font-bold leading-[140%]">
        확정된 수업 정보를
        <br /> 알려주세요
      </h1>

      <DivWithLabel label="수업 요일">
        <div className="flex flex-wrap justify-between">
          {DAYS.map((day) => (
            <DayButton
              key={day}
              day={day}
              isSelected={selectedDays.includes(day)}
              onClick={() => toggleDay(day)}
            />
          ))}
        </div>
      </DivWithLabel>

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
                    `${matched.period} ${matched.time}부터 ${matched.classMinute}분 진행`
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
                `${commonSchedule.period} ${commonSchedule.time} 부터 ${commonSchedule.classMinute}분 진행`
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
      </div>

      <DivWithLabel label="수업 시작일">
        <SelectButton
          text={
            firstDay &&
            `${firstDay.month} ${firstDay.day} ${firstDay.period} ${firstDay.hour}:${firstDay.minute}`
          }
          isActive={isFirstDayPickerOpen}
          onClick={() => setIsFirstDayPickerOpen(true)}
        />
      </DivWithLabel>

      <DivWithLabel label="교재 정보">
        <Textarea
          value={bookInfo}
          onChange={setBookInfo}
          placeholder="사용하실 교재명을 적어주세요. <br/> (예 : 천재교육 수학 중1-1)"
          maxLength={30}
        />
      </DivWithLabel>

      <Button disabled={!isFormValid} onClick={handleSubmit}>
        제출하기
      </Button>

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
          onSelect={(selected) => {
            updateSchedule(selected);
            setIsTimePickerOpen(false);
          }}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={isFirstDayPickerOpen}
        onClose={() => setIsFirstDayPickerOpen(false)}
      >
        <FirstDayPicker
          firstDay={firstDay}
          onSelect={(selected) => {
            setFirstDay(selected);
            setIsFirstDayPickerOpen(false);
          }}
        />
      </BottomSheet>
    </div>
  );
}
