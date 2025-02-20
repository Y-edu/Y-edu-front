import { DayOfWeek } from "@/actions/get-teacher-detail";

/** 연속된 시간대를 그룹화하는 함수 */
function groupTimes(times: string[]): string {
  if (times.length === 0) return "불가";

  // 시간 데이터 숫자로 변환 및 정렬
  const sortedTimes = times
    .map((time) => parseInt(time.split(":")[0], 10))
    .sort((a, b) => a - b);

  const timeRanges: string[] = [];
  let start = sortedTimes[0];
  let prev = start;

  for (let i = 1; i < sortedTimes.length; i++) {
    if (sortedTimes[i] !== prev + 1) {
      // 연속되지 않으면 이전까지의 범위를 저장
      timeRanges.push(`${start}시 - ${prev + 1}시`);
      start = sortedTimes[i];
    }
    prev = sortedTimes[i];
  }
  // 마지막 범위 추가
  timeRanges.push(`${start}시 - ${prev + 1}시`);

  return timeRanges.join(", ");
}

/** '요일: 시간' 형태로 만드는 함수 */
export function formatAvailableTimes(availableTimes: {
  [key in DayOfWeek]: Array<string>;
}): string[] {
  return Object.entries(availableTimes).map(([day, times]) => {
    return `${day}: ${groupTimes(times)}`;
  });
}
