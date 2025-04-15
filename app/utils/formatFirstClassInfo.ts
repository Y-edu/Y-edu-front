export const formatFirstClassInfo = (
  firstDay: string,
  firstDayStart: string,
): string => {
  if (!firstDay || !firstDayStart) return "상담결과 미전달";

  const [year, month, day] = firstDay.split("-");
  const shortYear = year.slice(2);
  const hour = parseInt(firstDayStart.split(":")[0], 10);

  return `${shortYear}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 ${hour}시`;
};
