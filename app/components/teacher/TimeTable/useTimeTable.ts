import { useEffect, useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";

import { getSplitHoursToStringFormat } from "@/utils/date";
import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";

export type Mode = "teacher" | "parent";

export interface TimeCell {
  day: string;
  time: string;
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

  const [currentDate, setCurrentDate] = useState(initialSelectTime);
  const [savedSelectTime, setSavedSelectTime] = useState(initialSelectTime);
  const [selectedCell, setSelectedCell] = useState<TimeCell>({
    day: "",
    time: "",
  });
  const [selectedSessions, setSelectedSessions] = useState<
    Array<{ day: string; startTime: string; slots: string[] }>
  >([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setCurrentDate(initialSelectTime);
    setSavedSelectTime(initialSelectTime);
  }, [initialSelectTime]);

  const handleCellClick = (day: string, time: string) => {
    const timeWithSeconds = time + ":00";

    if (mode === "teacher") {
      if (day === selectedCell.day && time === selectedCell.time) {
        setSelectedCell({ day: "", time: "" });
        setCurrentDate((prev) => ({
          ...prev,
          [day]: prev[day].filter((t) => t !== timeWithSeconds),
        }));
      } else {
        setSelectedCell({ day, time });
        const [startHour, startMinute] = time.split(":").map(Number);
        const selectedDateRange = eachMinuteOfInterval({
          start: new Date(2025, 2, 26, startHour, startMinute),
          end: new Date(2025, 2, 26, startHour, startMinute + 59),
        });
        const splitByMinutes = selectedDateRange.filter((_, i) => i % 60 === 0);
        const toFormat = splitByMinutes.map((d) => format(d, "HH:mm") + ":00");
        setCurrentDate((prev) => {
          const merged = Array.from(new Set([...prev[day], ...toFormat]));
          merged.sort();
          return { ...prev, [day]: merged };
        });
      }
    } else {
      const slotCount = Math.ceil((sessionDuration ?? 100) / 50);
      const idx = times.findIndex((t) => t === time);
      if (idx === -1) return;

      const candidateTimes = times.slice(idx, idx + slotCount);
      if (candidateTimes.length < slotCount) return;

      const candidateSlots = candidateTimes.map((t) => t + ":00");

      const availableSlots = initialSelectTime[day] || [];
      const allAvailable = candidateSlots.every((s) =>
        availableSlots.includes(s),
      );
      if (!allAvailable) {
        return;
      }

      setSelectedSessions((prev) => {
        const existsIdx = prev.findIndex((s) => s.day === day);

        if (existsIdx > -1 && prev[existsIdx].startTime === time) {
          const copy = [...prev];
          copy.splice(existsIdx, 1);
          return copy;
        }

        if (existsIdx > -1) {
          const copy = [...prev];
          copy[existsIdx] = {
            day,
            startTime: candidateTimes[0],
            slots: candidateSlots,
          };
          return copy;
        }

        if (prev.length < (sessionCount ?? 1)) {
          return [
            ...prev,
            {
              day,
              startTime: candidateTimes[0],
              slots: candidateSlots,
            },
          ];
        }
        return prev;
      });
    }
  };

  const handleNotClick = (day: string, time: string) => {
    if (mode === "teacher") {
      if (currentDate[day]?.includes(time + ":00")) {
        setCurrentDate((prev) => ({
          ...prev,
          [day]: prev[day].filter((t) => t !== time + ":00"),
        }));
      }
      setSelectedCell({ day: "", time: "" });
    } else {
      setSelectedSessions((prev) =>
        prev.filter((s) => !(s.day === day && s.startTime === time)),
      );
    }
  };

  let canSave = false;
  if (mode === "teacher") {
    const hasDiff =
      JSON.stringify(savedSelectTime) !== JSON.stringify(currentDate);
    const anySelected = Object.values(currentDate).some(
      (arr) => arr.length > 0,
    );
    canSave = hasDiff && anySelected;
  } else {
    canSave = (sessionCount ?? 1) === selectedSessions.length;
  }

  useEffect(() => onHasTimeChange?.(canSave), [canSave, onHasTimeChange]);

  const handleSubmit = () => {
    if (mode !== "teacher" || !patchTime) return;
    patchTime(
      {
        phoneNumber: initialPhoneNumber,
        name: initialName,
        available: currentDate,
      },
      {
        onSuccess: () => {
          setSavedSelectTime(currentDate);
          setSnackbarOpen(true);
        },
      },
    );
  };

  return {
    currentDate,
    selectedCell,
    selectedSessions,
    snackbarOpen,
    hasChanges: canSave,
    handleCellClick,
    handleNotClick,
    handleSubmit,
    closeSnackbar: () => setSnackbarOpen(false),
  };
}
