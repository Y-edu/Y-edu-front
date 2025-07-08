import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSearchParams } from "next/navigation";

import FirstDayPicker from "@/components/result/FirstDayPicker";
import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";
import Button from "@/ui/Button";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

interface Schedule {
  classSessionId: number;
  classDate: string;
  classStart: string;
}

interface Region {
  content: Schedule[];
}

interface RescheduleSheetProps {
  sessionId: number;
  date: Date;
  time: string; // ex. 오전 5:00
  close: () => void;
}

export default function RescheduleSheet({
  sessionId,
  date,
  time,
  close,
}: RescheduleSheetProps) {
  const toast = useGlobalSnackbar();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  // 완료/미완료 세션 데이터 가져오기
  const { data: incompleteSessions } = useGetSessions(token, 0, 50, false);
  const { data: completeSessions } = useGetSessions(token, 0, 50, true);

  // 합쳐서 allSessions로 만듦
  const allSessions = {
    schedules: Object.keys(incompleteSessions?.schedules || {}).reduce(
      (acc, key) => {
        const incompleteContent =
          incompleteSessions?.schedules[key]?.schedules.content || [];
        const completeContent =
          completeSessions?.schedules[key]?.schedules.content || [];

        acc[key] = {
          ...incompleteSessions?.schedules[key],
          content: [...incompleteContent, ...completeContent],
        };

        return acc;
      },
      {} as Record<string, Region>,
    ),
  };

  const [confirmed, setConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<FirstDay>(
    convertToFirstDay(date, time),
  );

  const { mutate } = useSessionMutations().changeMutation;

  const handleChangeDate = (date: FirstDay) => {
    const cleanMonth = date.month
      .replace(/\s*\(.*\)$/, "")
      .replace("월", "")
      .padStart(2, "0");

    const cleanDay = date.day
      .replace(/\s*\(.*\)$/, "")
      .replace("일", "")
      .padStart(2, "0");

    const formattedDate = `${date.year}-${cleanMonth}-${cleanDay}`;
    const formattedTime = to24HourTime(date.period, date.time);

    const isUnavailable = allSessions?.schedules
      ? Object.values(allSessions.schedules).some((region) => {
          return region.content.some((schedule) => {
            // 현재 수정 중인 세션 제외
            if (schedule.classSessionId === sessionId) {
              return false;
            }

            // 날짜 똑같은지 비교
            const isSameDate = schedule.classDate === formattedDate;
            return isSameDate;
          });
        })
      : false;

    // 유효한 날짜가 아닐 때
    if (isUnavailable) {
      close();
      toast.warning("이미 있는 일정이에요");
      return;
    }

    setSelectedDate(date);
    mutate({
      sessionId,
      sessionDate: formattedDate,
      start: formattedTime,
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
    return `${paddedHour}:${minuteStr}:00`;
  }

  function convertToFirstDay(date: Date, rawTime: string): FirstDay {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}월`;

    const dayOfWeek = format(date, "eee", { locale: ko });
    const day = `${date.getDate()}일 (${dayOfWeek})`;

    const [period, time] = rawTime.trim().split(" ");

    return {
      year,
      month,
      day,
      period,
      time,
    };
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
