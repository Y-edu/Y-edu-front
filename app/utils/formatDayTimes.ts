export interface DayTime {
  day: string;
  times: string[];
}

export default function formatDayTimes(dayTimes: DayTime[]): string[] {
  return dayTimes.map(({ day, times }) => {
    const formattedTimes = times
      .map((time) => `${time.split(":")[0]}시`)
      .join(", ");
    return `${day}: ${formattedTimes}`;
  });
}
