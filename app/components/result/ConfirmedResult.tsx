"use client";

import { useState } from "react";

import Button from "@/ui/Button";
import cn from "@/utils/cn";
import IconDown from "@/icons/IconDown";
import BottomSheet from "@/ui/BottomSheet";
import Checkbox from "@/ui/CheckBox";
import Textarea from "@/ui/Textarea";

import DivWithLabel from "./DivWIthLabel";
import TimePicker from "./TimePicker";
import FirstDayPicker from "./FirstDayPicker";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function ConfirmedResult() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isFirstDayPickerOpen, setIsFirstDayPickerOpen] = useState(false);
  const [isTimeVariesByDay, setIsTimeVariesByDay] = useState(false);
  const [bookInfo, setBookInfo] = useState("");

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };
  const handleToggleTimeVaries = (id: string) => {
    setIsTimeVariesByDay((prev) => !prev);
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
              <Button
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  "h-[40px] w-[42px] rounded-full border border-grey-200 bg-white text-[16px] font-medium text-black transition-colors",
                  isSelected && "border-none bg-grey-800 text-white",
                )}
              >
                {day}
              </Button>
            );
          })}
        </div>
      </DivWithLabel>
      <DivWithLabel label="수업 시간">
        <Button
          rightIcon={<IconDown IconColor={isTimePickerOpen && "#3265FD"} />}
          onClick={() => setIsTimePickerOpen(true)}
          className={cn(
            "mb-[4px] border border-grey-200 bg-white text-[16px] font-medium text-grey-900",
            isTimePickerOpen && "border-2 border-primary",
          )}
        >
          선택하세요
        </Button>
        <Checkbox
          id="time-picker"
          label="요일마다 수업 시간이 달라요"
          isChecked={isTimeVariesByDay}
          onChange={handleToggleTimeVaries}
        />
      </DivWithLabel>
      <DivWithLabel label="수업 시작일">
        <Button
          rightIcon={<IconDown IconColor={isFirstDayPickerOpen && "#3265FD"} />}
          onClick={() => setIsFirstDayPickerOpen(true)}
          className={cn(
            "border border-grey-200 bg-white text-[16px] font-medium text-grey-900",
            isFirstDayPickerOpen && "border-2 border-primary",
          )}
        >
          선택하세요
        </Button>
      </DivWithLabel>
      <DivWithLabel label="교재 정보">
        <Textarea
          value={bookInfo}
          onChange={setBookInfo}
          placeholder="사용하실 교재명을 적어주세요. <br/> (예 : 천재교육 수학 중1-1)"
          maxLength={30}
        />
      </DivWithLabel>

      <Button>제출하기</Button>

      <BottomSheet
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
      >
        <TimePicker />
      </BottomSheet>
      <BottomSheet
        isOpen={isFirstDayPickerOpen}
        onClose={() => setIsFirstDayPickerOpen(false)}
      >
        <FirstDayPicker />
      </BottomSheet>
    </div>
  );
}
