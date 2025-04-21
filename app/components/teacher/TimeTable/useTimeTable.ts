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

  const handleCellClick = (day: string, time: string) => {
    const t = time + ":00";
    if (day === selectedCell.day && time === selectedCell.time) {
      setSelectedCell({ day: "", time: "" });
      setCurrentDate((prev) => ({
        ...prev,
        [day]: prev[day].filter((x) => x !== t),
      }));
      return;
    }
    setSelectedCell({ day, time });
    const [h, m] = time.split(":").map(Number);
    const minutes = eachMinuteOfInterval({
      start: new Date(2025, 2, 26, h, m),
      end: new Date(2025, 2, 26, h, m + 59),
    })
      .filter((_, i) => i % 60 === 0)
      .map((d) => format(d, "HH:mm") + ":00");
    setCurrentDate((prev) => ({
      ...prev,
      [day]: Array.from(new Set([...prev[day], ...minutes])),
    }));
  };

  const handleNotClick = (day: string, time: string) => {
    const t = time + ":00";
    setCurrentDate((prev) => ({
      ...prev,
      [day]: prev[day].filter((x) => x !== t),
    }));
    setSelectedCell({ day: "", time: "" });
  };

  const hasChanges =
    JSON.stringify(savedSelectTime) !== JSON.stringify(currentDate);
  useEffect(() => onHasTimeChange?.(hasChanges), [hasChanges, onHasTimeChange]);

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
    hasChanges,
    handleCellClick,
    handleNotClick,
    handleSubmit,
    closeSnackbar: () => setSnackbarOpen(false),
  };
}
