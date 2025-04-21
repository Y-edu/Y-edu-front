import { useEffect, useState, useCallback } from "react";
import { eachMinuteOfInterval, format } from "date-fns";

import { getSplitHoursToStringFormat } from "@/utils/date";
import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";

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
  onHasTimeChange?: (has: boolean) => void,
) {
  const { mutate: patchTime } = useUpdateTeacherAvailable();
  const times = getSplitHoursToStringFormat();

  const [currentTime, setCurrentTime] = useState(initialSelectTime);
  const [selectedCell, setSelectedCell] = useState<{
    day: string;
    time: string;
  }>({ day: "", time: "" });
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(initialSelectTime);
    setSelectedSessions([]);
  }, [initialSelectTime]);

  const getCandidate = useCallback(
    (day: string, time: string) => {
      if (mode !== "parent" || sessionDuration === undefined) return null;
      const slotCount = Math.ceil((sessionDuration ?? 0) / 50);
      if (slotCount <= 0) return null;
      const idx = times.indexOf(time);
      if (idx < 0) return null;
      const segment = times.slice(idx, idx + slotCount);
      if (segment.length < slotCount) return null;
      const slots = segment.map((t) => t + ":00");
      const available = initialSelectTime[day] || [];
      return slots.every((s) => available.includes(s))
        ? { startTime: segment[0], slots }
        : null;
    },
    [initialSelectTime, sessionDuration, times, mode],
  );

  const handleParentClick = useCallback(
    (day: string, time: string) => {
      const candidate = getCandidate(day, time);
      if (!candidate) return;
      setSelectedSessions((prev) => {
        const idx = prev.findIndex((s) => s.day === day);
        const maxCount = sessionCount ?? 1;
        if (idx > -1 && prev[idx].startTime === candidate.startTime) {
          return prev.filter((_, i) => i !== idx);
        }
        if (idx > -1) {
          return prev.map((s, i) => (i === idx ? { day, ...candidate } : s));
        }
        if (prev.length < maxCount) {
          return [...prev, { day, ...candidate }];
        }
        return prev;
      });
    },
    [getCandidate, sessionCount],
  );

  const handleTeacherClick = useCallback(
    (day: string, time: string) => {
      const timeKey = time + ":00";
      if (selectedCell.day === day && selectedCell.time === time) {
        setSelectedCell({ day: "", time: "" });
        setCurrentTime((prev) => ({
          ...prev,
          [day]: prev[day].filter((t) => t !== timeKey),
        }));
      } else {
        setSelectedCell({ day, time });
        const [h, m] = time.split(":").map(Number);
        const range = eachMinuteOfInterval({
          start: new Date(2025, 2, 26, h, m),
          end: new Date(2025, 2, 26, h, m + 59),
        });
        const slots = range
          .filter((_, i) => i % 60 === 0)
          .map((d) => format(d, "HH:mm") + ":00");
        setCurrentTime((prev) => ({
          ...prev,
          [day]: Array.from(new Set([...prev[day], ...slots])).sort(),
        }));
      }
    },
    [selectedCell],
  );

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

  const handleSubmit = useCallback(() => {
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

  return {
    currentTime,
    selectedCell,
    selectedSessions,
    snackbarOpen,
    hasChanges:
      mode === "teacher"
        ? JSON.stringify(currentTime) !== JSON.stringify(initialSelectTime)
        : selectedSessions.length === (sessionCount ?? 1),
    handleCellClick,
    handleCellUnclick,
    handleSubmit,
    closeSnackbar: () => setSnackbarOpen(false),
  };
}
