export const formatTimetoDate = (timeAmount: number) => {
  const days = Math.floor(timeAmount / (60 * 24));
  const hours = Math.floor((timeAmount % (60 * 24)) / 60);
  const minutes = timeAmount % 60;

  return `${days}일 ${hours}시간 ${minutes}분`;
};
