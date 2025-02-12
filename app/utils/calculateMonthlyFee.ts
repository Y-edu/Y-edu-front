export function calculateMonthlyFee(
  classCount: string,
  classTime: string,
): string {
  const count = Number(classCount.replace(/[^\d]/g, ""));
  const minutes = Number(classTime.replace(/[^\d]/g, ""));
  if (!count || !minutes) return "-";
  const sessionCost = (minutes / 50) * 30000;
  const weeklyCost = sessionCost * count;
  const monthlyCost = weeklyCost * 4;
  const costInManWon = monthlyCost / 10000;
  const display = Number.isInteger(costInManWon)
    ? costInManWon.toString()
    : costInManWon.toFixed(1);
  return `${display}만원`;
}
