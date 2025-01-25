import * as zod from "zod";

const MILLISECONDS_IN_A_MINUTE = 1000 * 60;

export function timeDifference(startDate: string, endDate: string): number {
  try {
    const dateTimeSchema = zod.string().datetime();
    const parseStartDate = dateTimeSchema.safeParse(startDate);
    if (!parseStartDate.success) {
      throw new Error(parseStartDate.error.message);
    }
    const parseEndDate = dateTimeSchema.safeParse(endDate);
    if (!parseEndDate.success) {
      throw new Error(parseEndDate.error.message);
    }

    const start = new Date(parseStartDate.data);
    const end = new Date(parseEndDate.data);

    const differenceInMilliseconds = Math.abs(end.getTime() - start.getTime());

    const differenceInMinutes =
      differenceInMilliseconds / MILLISECONDS_IN_A_MINUTE;

    return differenceInMinutes;
  } catch (e) {
    throw e;
  }
}
