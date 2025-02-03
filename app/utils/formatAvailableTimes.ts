import { DayOfWeek } from "../actions/get-teacher-detail";

/** '요일: 시간' 형태로 만드는 함수 */
export function formatAvailableTimes(availableTimes: {
  [key in DayOfWeek]: Array<string>;
}): string[] {
  return Object.entries(availableTimes).map(([day, times]) => {
    if (times.length === 0) {
      return `${day}: 불가`;
    }

    const formattedTimes = times
      .map((time) => {
        const [hour, minute] = time.split(":");
        const hourFormatted = parseInt(hour, 10);
        const minuteFormatted =
          minute === "00" ? "" : ` ${parseInt(minute, 10)}분`;
        return `${hourFormatted}시${minuteFormatted}`;
      })
      .join(", ");

    return `${day}: ${formattedTimes}`;
  });
}
