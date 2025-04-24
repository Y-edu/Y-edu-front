import { useEffect, useState, useCallback } from "react";

import { getSplitHoursToStringFormat } from "@/utils/date";
import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";
import { usePostMatchingTimetable } from "@/hooks/mutation/usePostMatchingTimeTable";

export type Mode = "teacher" | "parent";

export interface Session {
  day: string;
  startTime: string;
  slots: string[];
}

export function useTimeTable(
  initialSelectTime: Record<string, string[]>,
  initialName: string,
  initialPhoneNumber: string,
  mode: Mode,
  sessionDuration?: number,
  sessionCount?: number,
  classMatchingToken?: string,
  onHasTimeChange?: (has: boolean) => void,
) {
  const { mutate: patchTime } = useUpdateTeacherAvailable();
  const { mutate: postMatching } = usePostMatchingTimetable();
  const times = getSplitHoursToStringFormat();

  const [currentTime, setCurrentTime] = useState(initialSelectTime);
  const [selectedCell] = useState<{
    day: string;
    time: string;
  }>({ day: "", time: "" });
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setCurrentTime(initialSelectTime);
    setSelectedSessions([]);
  }, [initialSelectTime]);

  const getCandidate = useCallback(
    (day: string, time: string) => {
      if (mode !== "parent" || sessionDuration === undefined) return null;
      const slotCount = Math.ceil(sessionDuration / 50);
      if (slotCount <= 0) return null;

      const available = initialSelectTime[day] || [];
      const availableShort = available.map((t) => t.slice(0, 5));

      const idx = availableShort.indexOf(time);
      if (idx < 0) return null;

      const maxStartIdx = availableShort.length - slotCount;
      const startIdx = idx <= maxStartIdx ? idx : maxStartIdx;
      const segment = availableShort.slice(startIdx, startIdx + slotCount);
      if (segment.length < slotCount) return null;

      const globalIdx = segment.map((t) => times.indexOf(t));
      if (globalIdx.some((gi, i) => i > 0 && gi - globalIdx[i - 1] !== 1))
        return null;

      const slots = segment.map((t) => t + ":00");
      return { startTime: segment[0], slots };
    },
    [initialSelectTime, sessionDuration, times, mode],
  );

  const handleParentClick = useCallback(
    (day: string, time: string) => {
      const candidate = getCandidate(day, time);
      const maxCount = sessionCount ?? 1;
      const slotKey = time + ":00";
      const availableSlots = initialSelectTime[day] || [];
      if (!candidate) {
        if (availableSlots.includes(slotKey)) {
          if (selectedSessions.length >= maxCount) {
            setSnackbarMessage(`${maxCount}개만 선택할 수 있어요`);
            setSnackbarOpen(true);
          } else {
            setSnackbarMessage(
              `${sessionDuration}분 수업이라 이 시간은 선택할 수 없어요.`,
            );
            setSnackbarOpen(true);
          }
        }
        return;
      }

      setSelectedSessions((prev) => {
        const idx = prev.findIndex((s) => s.day === day);

        if (idx > -1 && prev[idx].slots.includes(time + ":00")) {
          return prev.filter((_, i) => i !== idx);
        }
        if (idx > -1) {
          return prev.map((s, i) => (i === idx ? { day, ...candidate } : s));
        }
        if (prev.length < maxCount) {
          return [...prev, { day, ...candidate }];
        }
        setSnackbarMessage(`${maxCount}개만 선택할 수 있어요`);
        setSnackbarOpen(true);
        return prev;
      });
    },
    [
      getCandidate,
      sessionCount,
      initialSelectTime,
      selectedSessions,
      sessionDuration,
    ],
  );

  const handleTeacherClick = useCallback((day: string, time: string) => {
    const timeKey = time + ":00";
    setCurrentTime((prev) => {
      const daySlots = prev[day] ?? [];
      const idx = daySlots.indexOf(timeKey);
      const newSlots =
        idx > -1
          ? daySlots.filter((t) => t !== timeKey)
          : [...daySlots, timeKey];
      newSlots.sort();
      return { ...prev, [day]: newSlots };
    });
  }, []);

  const handleCellClick = useCallback(
    (day: string, time: string) => {
      if (mode === "teacher") handleTeacherClick(day, time);
      else handleParentClick(day, time);
      onHasTimeChange?.(
        mode === "teacher"
          ? Object.values(currentTime).some((arr) => arr.length > 0)
          : selectedSessions.length === (sessionCount ?? 1),
      );
    },
    [
      mode,
      handleTeacherClick,
      handleParentClick,
      onHasTimeChange,
      currentTime,
      selectedSessions,
      sessionCount,
    ],
  );

  const handleCellUnclick = useCallback(
    (day: string, time: string) => {
      if (mode === "teacher") {
        handleTeacherClick(day, time);
      } else {
        setSelectedSessions((prev) => prev.filter((s) => s.day !== day));
      }
    },
    [mode, handleTeacherClick],
  );

  const handleTeacherSubmit = useCallback(() => {
    if (mode !== "teacher") return;
    patchTime(
      {
        phoneNumber: initialPhoneNumber,
        name: initialName,
        available: currentTime,
      },
      { onSuccess: () => setSnackbarOpen(true) },
    );
  }, [mode, patchTime, initialName, initialPhoneNumber, currentTime]);

  const handleParentSubmit = useCallback(() => {
    if (mode !== "parent" || !classMatchingToken) return;
    postMatching(
      { classMatchingToken, selectedSessions },
      {
        onError: (error) => setSnackbarMessage(error.message),
        onSettled: () => setSnackbarOpen(true),
      },
    );
  }, [mode, classMatchingToken, selectedSessions, postMatching]);

  return {
    currentTime,
    selectedCell,
    selectedSessions,
    snackbarOpen,
    snackbarMessage,
    hasChanges:
      mode === "teacher"
        ? JSON.stringify(currentTime) !== JSON.stringify(initialSelectTime)
        : selectedSessions.length === (sessionCount ?? 1),
    handleCellClick,
    handleCellUnclick,
    handleTeacherSubmit,
    handleParentSubmit,
    closeSnackbar: () => setSnackbarOpen(false),
  };
}
