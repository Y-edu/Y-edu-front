export function getDayOfWeek(dateString: string): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  const day = date.getDay();
  return days[day];
}
