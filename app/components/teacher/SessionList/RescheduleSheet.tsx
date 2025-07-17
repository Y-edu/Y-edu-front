import { useState } from "react";
import { useSearchParams } from "next/navigation";

import FirstDayPicker from "@/components/result/FirstDayPicker";
import { FirstDay } from "@/components/result/ConfirmedResult/useConfirmedResult";
import Button from "@/ui/Button";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import { useGetSessions } from "@/hooks/query/useGetSessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";
import {
  convertToFirstDay,
  formatFirstDayToDateString,
} from "@/utils/formatFirstDay";

interface Schedule {
  classSessionId: number;
  classDate: string;
  classStart: string;
}

interface Region {
  schedules: {
    content: Schedule[];
  };
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
          schedules: {
            content: [...incompleteContent, ...completeContent],
          },
        };

        return acc;
      },
      {} as Record<string, Region>,
    ),
  };

  const currentClassKey = Object.keys(allSessions.schedules).find((key) =>
    allSessions.schedules[key].schedules.content.some(
      (s) => s.classSessionId === sessionId,
    ),
  );

  const [confirmed, setConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<FirstDay>(
    convertToFirstDay(date, time),
  );

  const { mutate } = useSessionMutations().changeMutation;

  const handleChangeDate = (date: FirstDay) => {
    const { formattedDate, formattedTime } = formatFirstDayToDateString(date);

    const isUnavailable = currentClassKey
      ? allSessions.schedules[currentClassKey].schedules.content.some(
          (schedule) =>
            schedule.classSessionId !== sessionId &&
            schedule.classDate === formattedDate,
        )
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
