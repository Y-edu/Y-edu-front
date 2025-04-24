// 학부모가 선생님 프로필에서 시간을 선택하는 mutation 훅

import { useMutation } from "@tanstack/react-query";

import { postMatchingTimetable } from "@/actions/post-matching-timetable";
import type { Session } from "@/components/teacher/TimeTable/useTimeTable";

export function usePostMatchingTimetable() {
  return useMutation<
    void,
    Error,
    { classMatchingToken: string; selectedSessions: Session[] }
  >({
    mutationFn: ({ classMatchingToken, selectedSessions }) =>
      postMatchingTimetable({ classMatchingToken, selectedSessions }),
  });
}
