import { create } from "zustand";

import { DayOfWeek } from "@/actions/get-teacher-detail";

interface RecommendTeacherState {
  classTime: string;
  setClassTime: (classTime: string) => void;
  classCount: string;
  setClassCount: (classCount: string) => void;
  available: {
    [key in DayOfWeek]: string[];
  };
  setAvailable: (available: {
    [key in DayOfWeek]: string[];
  }) => void;
}

export const useRecommendStore = create<RecommendTeacherState>((set) => ({
  classTime: "",
  setClassTime: (classTime: string) => set({ classTime }),
  classCount: "",
  setClassCount: (classCount: string) => set({ classCount }),
  available: {
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
    일: [],
  },
  setAvailable: (available: {
    [key in DayOfWeek]: string[];
  }) => set({ available }),
}));
