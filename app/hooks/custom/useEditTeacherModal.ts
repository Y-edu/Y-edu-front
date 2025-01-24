import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { TeacherProfile } from "../../types/TeacherProfile";

interface PatchParams {
  id: number;
  youtubeLink?: string;
  remark?: string;
}

interface PatchResponse {
  data: {
    id: number;
    youtubeLink?: string;
    remark?: string;
  };
}

export function useEditTeacherModal(
  field: keyof TeacherProfile,
  data: TeacherProfile[] | undefined,
  patchMutation: UseMutationResult<PatchResponse, any, PatchParams, any>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [value, setValue] = useState("");

  const openModal = (teacher: TeacherProfile) => {
    setIsOpen(true);
    setTeacherId(teacher.id);
    setValue((teacher[field] as string) ?? "");
  };

  const saveValue = () => {
    if (teacherId == null || !data) return;
    const currentTeacher = data.find((t) => t.id === teacherId);
    if (!currentTeacher) return;

    if (field === "youtubeLink") {
      patchMutation.mutate({
        id: teacherId,
        youtubeLink: value,
      });
    } else if (field === "remark") {
      patchMutation.mutate({
        id: teacherId,
        remark: value,
      });
    }

    closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    setTeacherId(null);
    setValue("");
  };

  return {
    isOpen,
    value,
    setValue,
    openModal,
    saveValue,
    closeModal,
  };
}
