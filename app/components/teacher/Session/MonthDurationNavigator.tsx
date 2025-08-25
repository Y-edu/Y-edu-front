import Image from "next/image";
import { useMemo, useState } from "react";

interface MonthDurationNavigatorProps {
  defaultMonth: number;
  monthDuration: {
    [key: string]: number;
  };
}

export default function MonthDurationNavigator(
  props: MonthDurationNavigatorProps,
) {
  const { defaultMonth, monthDuration } = props;

  // monthDuration의 키들을 숫자로 변환하고 정렬
  const availableMonths = useMemo(() => {
    return Object.keys(monthDuration)
      .map(Number)
      .sort((a, b) => a - b);
  }, [monthDuration]);

  // 디폴트 월 (defaultMonth 있으면 사용하고, 없으면 그냥 가장 최근 월)
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (availableMonths.includes(defaultMonth)) {
      return defaultMonth;
    }
    const maxMonth = Math.max(...availableMonths);
    return maxMonth;
  });

  // 현재 월의 인덱스
  const currentIndex = availableMonths.indexOf(currentMonth);

  // 이전 월로 이동
  const goToPreviousMonth = () => {
    if (currentIndex > 0) {
      setCurrentMonth(availableMonths[currentIndex - 1]);
    }
  };

  // 다음 월로 이동
  const goToNextMonth = () => {
    if (currentIndex < availableMonths.length - 1) {
      setCurrentMonth(availableMonths[currentIndex + 1]);
    }
  };

  // 화살표 활성화/비활성화 상태
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < availableMonths.length - 1;

  // 현재 월의 데이터
  const currentDuration = monthDuration[currentMonth.toString()] || 0;

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
