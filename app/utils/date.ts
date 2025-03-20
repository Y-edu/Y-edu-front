import { eachMinuteOfInterval, format } from "date-fns";

export const getSplitHoursToStringFormat = () => {
  const resultOfSplit = eachMinuteOfInterval({
    start: new Date(2025, 2, 26, 9),
    end: new Date(2025, 2, 26, 23),
  });

  // 60분 단위로 필터링
  const splitByMinutes = resultOfSplit.filter((_, index) => index % 60 === 0);
  const formatToString = splitByMinutes.map((date) => format(date, "HH:mm"));
  return formatToString;
};
