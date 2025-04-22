import { httpService } from "@/utils/httpService";

export const postMatchingTimetable = async ({
  classMatchingToken,
  selectedSessions,
}: {
  classMatchingToken: string;
  selectedSessions: Array<{ day: string; startTime: string; slots: string[] }>;
}): Promise<void> => {
  const dayTimes = selectedSessions.map((session) => ({
    day: session.day,
    times: session.slots.map((slot) => slot.slice(0, 5)),
  }));

  await httpService.post<void>("/matching/timetable", {
    classMatchingToken,
    dayTimes,
  });
};
