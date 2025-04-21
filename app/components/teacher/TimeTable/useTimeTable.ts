import { useEffect, useState } from "react";
import { eachMinuteOfInterval, format } from "date-fns";

import { useUpdateTeacherAvailable } from "@/hooks/mutation/usePutAvailableTeacherTime";

export interface TimeCell {
  day: string;
  time: string;
}

export function useTimeTable(
  initialSelectTime: Record<string, string[]>,
  initialName: string,
  initialPhoneNumber: string,
  onHasTimeChange?: (has: boolean) => void,
) {
  const { mutate: patchTime } = useUpdateTeacherAvailable();
  const [currentDate, setCurrentDate] = useState(initialSelectTime);
  const [savedSelectTime, setSavedSelectTime] = useState(initialSelectTime);
  const [selectedCell, setSelectedCell] = useState<TimeCell>({
    day: "",
    time: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setCurrentDate(initialSelectTime);
    setSavedSelectTime(initialSelectTime);
  }, [initialSelectTime]);

  const handleCellClick = (day: string, time: string) => {
    const timeWithSeconds = time + ":00";

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
      const splitByMinutes = selectedDateRange.filter(
        (_, index) => index % 60 === 0,
      );
      const toFormatHHMM = splitByMinutes.map(
        (date) => format(date, "HH:mm") + ":00",
      );

      setCurrentDate((prev) => {
        const merged = Array.from(new Set([...prev[day], ...toFormatHHMM]));
        merged.sort();
        return {
          ...prev,
          [day]: merged,
        };
      });
    }
  };

  const handleNotClick = (day: string, time: string) => {
    if (currentDate[day]?.includes(time + ":00")) {
      setCurrentDate((prev) => ({
        ...prev,
        [day]: prev[day].filter((t) => t !== time + ":00"),
      }));
    }
    setSelectedCell({ day: "", time: "" });
  };

  const hasDiff =
    JSON.stringify(savedSelectTime) !== JSON.stringify(currentDate);
  const anySelected = Object.values(currentDate).some(
    (times) => times.length > 0,
  );
  const canSave = hasDiff && anySelected;
  useEffect(() => onHasTimeChange?.(canSave), [canSave, onHasTimeChange]);

  const handleSubmit = () => {
    if (!patchTime) return;
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
    snackbarOpen,
    hasChanges: canSave,
    handleCellClick,
    handleNotClick,
    handleSubmit,
    closeSnackbar: () => setSnackbarOpen(false),
  };
}
