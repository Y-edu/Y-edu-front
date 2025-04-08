import { useState } from "react";

import { Schedule } from "@/components/result/ConfirmedResult/useConfirmedResult";

type OptionKey = "period" | "hour" | "minute" | "duration";

export const useTimePicker = (schedule?: Omit<Schedule, "day"> | null) => {
  const { period = "오후", time = "2:00", classMinute = 50 } = schedule ?? {};

  const [selected, setSelected] = useState<Record<OptionKey, string>>({
    period,
    hour: time.split(":")[0],
    minute: time.split(":")[1],
    duration: `${classMinute}분 진행`,
  });

  const handleChange = (key: OptionKey, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getSchedule = (day = ""): Schedule => ({
    period: selected.period,
    day,
    time: `${selected.hour}:${selected.minute}`,
    classMinute: parseInt(selected.duration),
  });

  return {
    selected,
    handleChange,
    getSchedule,
  };
};
