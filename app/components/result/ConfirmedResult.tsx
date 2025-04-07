"use client";

import { useState } from "react";

import Button from "@/ui/Button";
import BottomSheet from "@/ui/BottomSheet";
import Checkbox from "@/ui/CheckBox";
import Textarea from "@/ui/Textarea";
import { usePutSchedule } from "@/hooks/mutation/usePutSchedule";
import {
  FirstDayDTO,
  ScheduleDTO,
  ScheduleRequest,
} from "@/actions/put-schedule";

import DivWithLabel from "./DivWIthLabel";
import TimePicker from "./TimePicker";
import FirstDayPicker from "./FirstDayPicker";
import SelectButton from "./SelectButton";
import DayButton from "./DayBtn";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export interface Schedule {
  period: string;
  day: string;
  time: string;
  classMinute: number;
}

export interface FirstDay {
  month: string;
  day: string;
  period: string;
  hour: string;
  minute: string;
}

export default function ConfirmedResult() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDayForTimePicker, setSelectedDayForTimePicker] =
    useState<string>("");

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isFirstDayPickerOpen, setIsFirstDayPickerOpen] = useState(false);
  const [isTimeVariesByDay, setIsTimeVariesByDay] = useState(false);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [commonSchedule, setCommonSchedule] = useState<Omit<
    Schedule,
    "day"
  > | null>(null);

  const [firstDay, setFirstDay] = useState<FirstDay | null>(null);

  const sortedSelectedDays = [...selectedDays].sort(
    (a, b) => DAYS.indexOf(a) - DAYS.indexOf(b),
  );

  const classScheduleManagementId = "c4ca4238-a0b9-3382-8dcc-509a6f75849b"; // 예시
  const [bookInfo, setBookInfo] = useState("");

  const isScheduleValid = isTimeVariesByDay
    ? schedules.length === selectedDays.length
    : !!commonSchedule?.time && !!commonSchedule?.classMinute;

  const isFormValid =
    bookInfo.trim() !== "" &&
    !!firstDay &&
    selectedDays.length > 0 &&
    isScheduleValid;

  const { mutate } = usePutSchedule();

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };
  const handleToggleTimeVaries = () => {
    setIsTimeVariesByDay((prev) => !prev);
  };

  const handleOpenTimePicker = (day: string) => {
    setSelectedDayForTimePicker(day);
    setIsTimePickerOpen(true);
  };

  const handleSelectTime = (schedule: Schedule) => {
    if (schedule.day) {
      setSchedules((prev) => {
        const exists = prev.find((s) => s.day === schedule.day);
        if (exists) {
          return prev.map((s) => (s.day === schedule.day ? schedule : s));
        } else {
          return [...prev, schedule];
        }
      });
    } else {
      setCommonSchedule(schedule);
    }
    setIsTimePickerOpen(false);
  };

  const handleSelectFirstDay = (firstDay: FirstDay) => {
    setFirstDay(firstDay);
    setIsFirstDayPickerOpen(false);
  };

  function to24HourFormat(period: string, time: string): string {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");

    if (period === "오전") {
      if (hour === 12) hour = 0;
    } else {
      if (hour !== 12) hour += 12;
    }

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  }

  const handleSubmit = () => {
    if (!firstDay || !bookInfo) {
      alert("수업 시작일과 교재 정보를 입력해주세요.");
      return;
    }
    if (!isTimeVariesByDay && !commonSchedule) {
      throw new Error("공통 수업 시간이 설정되지 않았습니다.");
    }

    const scheduleList: ScheduleDTO[] = isTimeVariesByDay
      ? schedules.map(({ period, day, time, classMinute }) => ({
          day,
          start: to24HourFormat(period, time),
          classMinute,
        }))
      : selectedDays.map((day) => ({
          day,
          start: to24HourFormat(commonSchedule!.period, commonSchedule!.time),
          classMinute: commonSchedule!.classMinute,
        }));

    const firstDayDTO: FirstDayDTO = {
      date: `2025-${firstDay.month.replace("월", "").padStart(2, "0")}-${firstDay.day
        .replace("일", "")
        .padStart(2, "0")}`,
      start: `${firstDay.hour.padStart(2, "0")}:${firstDay.minute}`,
      classMinute: schedules[0]?.classMinute || commonSchedule!.classMinute,
    };

    const payload: ScheduleRequest = {
      classScheduleManagementId,
      textBook: bookInfo,
      schedules: scheduleList,
      firstDay: firstDayDTO,
    };

    mutate(payload);
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <h1 className="text-[24px] font-bold leading-[140%]">
        확정된 수업 정보를
        <br /> 알려주세요
      </h1>
      <DivWithLabel label="수업 요일">
        <div className="flex flex-wrap justify-between">
          {DAYS.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <DayButton
                key={day}
                day={day}
                isSelected={isSelected}
                onClick={() => toggleDay(day)}
              />
            );
          })}
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
              isActive={isFirstDayPickerOpen}
              onClick={() => handleOpenTimePicker("")}
            />
          </DivWithLabel>
        )}

        <Checkbox
          id="time-picker"
          label="요일마다 수업 시간이 달라요"
          isChecked={isTimeVariesByDay}
          onChange={handleToggleTimeVaries}
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
          onSelect={(selected) => handleSelectTime(selected)}
        />
      </BottomSheet>
      <BottomSheet
        isOpen={isFirstDayPickerOpen}
        onClose={() => setIsFirstDayPickerOpen(false)}
      >
        <FirstDayPicker
          firstDay={firstDay}
          onSelect={(selected) => handleSelectFirstDay(selected)}
        />
      </BottomSheet>
    </div>
  );
}
