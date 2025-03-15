import { eachMinuteOfInterval, format } from "date-fns";

export const getSplitHoursToStringFormat = () => {
  const resultOfSplit = eachMinuteOfInterval({
    start: new Date(2025, 2, 26, 9),
    end: new Date(2025, 2, 26, 24),
  });

  // 30분 단위로 필터링
  const splitByMinutes = resultOfSplit.filter((_, index) => index % 30 === 0);
  const formattoString = splitByMinutes.map((date) => format(date, "HH:mm")); // 공백 제거
  return formattoString;
};
