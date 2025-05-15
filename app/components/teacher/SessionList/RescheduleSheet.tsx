import { useState } from "react";

import FirstDayPicker from "@/components/result/FirstDayPicker";
import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";
import Button from "@/ui/Button";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";

interface RescheduleSheetProps {
  sessionId: number;
  close: () => void;
}
export default function RescheduleSheet({
  sessionId,
  close,
}: RescheduleSheetProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<FirstDay | null>(null);

  const { mutate } = useSessionMutations().changeMutation;

  const handleChangeDate = (date: FirstDay) => {
    setSelectedDate(date);
    const cleanMonth = date.month
      .replace(/\s*\(.*\)$/, "")
      .replace("월", "")
      .padStart(2, "0");

    const cleanDay = date.day
      .replace(/\s*\(.*\)$/, "")
      .replace("일", "")
      .padStart(2, "0");

    mutate({
      sessionId,
      sessionDate: `${date.year}-${cleanMonth}-${cleanDay}`,
      start: to24HourTime(date.period, date.time),
    });

    close();
  };

  function to24HourTime(period: string, time: string) {
    const [hourStr, minuteStr] = time.split(":");
    let hour = Number(hourStr);

    if (period === "오전") {
      if (hour === 12) hour = 0;
    } else if (period === "오후") {
      if (hour !== 12) hour += 12;
    }

    const paddedHour = String(hour).padStart(2, "0");
    return `${paddedHour}:${minuteStr}`;
  }

  return (
    <div>
      {!confirmed && (
        <>
          <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
            학부모님과 상의 후에 <br />
            날짜를 변경했나요?
          </h2>
          <Button onClick={() => setConfirmed(true)}>네 맞아요</Button>
        </>
      )}
      {confirmed && (
        <FirstDayPicker
          title="날짜 변경"
          firstDay={selectedDate}
          onSelect={handleChangeDate}
        />
      )}
    </div>
  );
}
