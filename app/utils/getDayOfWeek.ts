export function getDayOfWeek(date: Date): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = date.getDay();
  return days[day];
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = getDayOfWeek(date);

  return `${month}월 ${day}일 (${dayOfWeek})`;
}
