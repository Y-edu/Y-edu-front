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
    <div className="flex h-16 w-full items-center justify-between rounded-xl bg-grey-100 px-5 py-1">
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
      <div className="flex min-w-36 flex-col items-center justify-center gap-0.5 text-[#475569]">
        <div className="flex min-w-36 items-center justify-center gap-2">
          <p className="font-semibold">{currentMonth}월</p>
          <p className="font-bold">{currentDuration}분 진행</p>
        </div>
        <div className="group relative flex cursor-pointer items-center gap-0.5 text-primaryNormal">
          <Image
            src="/images/icon_exclamation.svg"
            alt="exclamation"
            width={12}
            height={12}
          />
          <p className="text-xs">일부 휴강은 수업 진행에 포함되지 않아요.</p>

          {/* 툴팁 말풍선 */}
          <div className="absolute left-1/2 top-full z-20 mt-2 hidden w-64 -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
            {/* 말풍선 화살표 */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
            <div className="whitespace-pre-line text-center">
              {`학부모 당일휴강: 수업진행 분에 포함\n무료보강: 수업진행 분에 미포함`}
            </div>
          </div>
        </div>
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
