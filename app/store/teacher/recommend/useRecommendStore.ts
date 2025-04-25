import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DayOfWeek } from "@/actions/get-teacher-detail";

interface RecommendTeacherState {
  classTime: string;
  setClassTime: (classTime: string) => void;
  classCount: string;
  setClassCount: (classCount: string) => void;
  available: Record<DayOfWeek, string[]>;
  setAvailable: (available: Record<DayOfWeek, string[]>) => void;
}

export const useRecommendStore = create<RecommendTeacherState>()(
  persist(
    (set) => ({
      classTime: "",
      setClassTime: (classTime) => set({ classTime }),
      classCount: "",
      setClassCount: (classCount) => set({ classCount }),
      available: {
        월: [],
        화: [],
        수: [],
        목: [],
        금: [],
        토: [],
        일: [],
      },
      setAvailable: (available) => set({ available }),
    }),
    {
      name: "recommend-teacher-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        classTime: state.classTime,
        classCount: state.classCount,
        available: state.available,
      }),
    },
  ),
);
