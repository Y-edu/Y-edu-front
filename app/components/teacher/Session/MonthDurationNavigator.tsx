import Image from "next/image";
import { useMemo, useState } from "react";

import { useGetSessionsMonth } from "@/hooks/query/useGetSessionsMonth";

interface MonthDurationNavigatorProps {
  classId: number;
  defaultMonth: number;
}

export default function MonthDurationNavigator({
  classId,
  defaultMonth,
}: MonthDurationNavigatorProps) {
  const { data, isLoading } = useGetSessionsMonth({
    classMatchingId: classId,
    monthCount: 2,
  });

  const monthDuration = useMemo(() => data?.months ?? {}, [data]);

  const availableMonths = useMemo(() => {
    return Object.keys(monthDuration)
      .map(Number)
      .sort((a, b) => a - b);
  }, [monthDuration]);

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (availableMonths.includes(defaultMonth)) return defaultMonth;
    return Math.max(...availableMonths, defaultMonth);
  });

  const currentIndex = availableMonths.indexOf(currentMonth);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < availableMonths.length - 1;

  const goToPreviousMonth = () => {
    if (canGoPrevious) {
      setCurrentMonth(availableMonths[currentIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    if (canGoNext) {
      setCurrentMonth(availableMonths[currentIndex + 1]);
    }
  };

  const currentDuration = monthDuration[currentMonth.toString()] ?? 0;

  if (isLoading) return null;

  return (
    <div className="flex h-12 w-full items-center justify-between rounded-xl bg-grey-100 px-5 py-1">
      <button
        onClick={goToPreviousMonth}
        disabled={!canGoPrevious}
        className={!canGoPrevious ? "opacity-30" : ""}
      >
        <Image
          src="/images/icon_arrow.svg"
          alt="left-arrow"
          width={20}
          height={20}
        />
      </button>
      <div className="flex min-w-36 items-center justify-center gap-2 text-[#475569]">
        <p className="font-semibold">{currentMonth}월 수업진행</p>
        <p className="font-bold">{currentDuration}분</p>
      </div>
      <button
        onClick={goToNextMonth}
        disabled={!canGoNext}
        className={!canGoNext ? "opacity-30" : ""}
      >
        <Image
          src="/images/icon_arrow.svg"
          alt="right-arrow"
          width={20}
          height={20}
          className="rotate-180"
        />
      </button>
    </div>
  );
}
