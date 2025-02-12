export const formatMonthlyFee = (pay: number): string => {
  if (pay === 0) return "논의 필요";

  const amountInTenThousand = pay / 10000;
  return Number.isInteger(amountInTenThousand)
    ? `${amountInTenThousand}만원`
    : `${amountInTenThousand.toFixed(1)}만원`;
};
