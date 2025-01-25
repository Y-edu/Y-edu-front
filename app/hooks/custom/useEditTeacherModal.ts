import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { TeacherProfile } from "../../types/TeacherProfile";

interface PatchParams {
  id: number;
  youtubeLink?: string;
  remark?: string;
}

interface PatchResponse {
  id: number;
  youtubeLink?: string;
  remark?: string;
}

export function useEditTeacherModal(
  field: keyof Pick<TeacherProfile, "youtubeLink" | "remark">,
  data: TeacherProfile[] | undefined,
  patchMutation: UseMutationResult<PatchResponse, Error, PatchParams, unknown>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [value, setValue] = useState("");

  const openModal = (teacher: TeacherProfile) => {
    setIsOpen(true);
    setTeacherId(teacher.id);
    setValue((teacher[field] as string) ?? "");
  };

  const closeModal = () => {
    setIsOpen(false);
    setTeacherId(null);
    setValue("");
  };

  const saveValue = () => {
    if (teacherId == null || !data) return;
    const currentTeacher = data.find((t) => t.id === teacherId);
    if (!currentTeacher) return;

    patchMutation.mutate({
      id: teacherId,
      [field]: value,
    });

    closeModal();
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
