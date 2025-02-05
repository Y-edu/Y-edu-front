import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { FilteringTeacher } from "../../actions/get-teacher-search";

interface PatchParams {
  id: number;
  issue?: string;
}

export function useEditTeacherModal(
  // field는 "issue"만 지원하면 됩니다.
  field: keyof Pick<FilteringTeacher, "issue">,
  data: FilteringTeacher[] | undefined,
  patchMutation: UseMutationResult<PatchParams, Error, PatchParams, unknown>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [value, setValue] = useState("");

  const openModal = (teacher: FilteringTeacher) => {
    setIsOpen(true);
    setTeacherId(teacher.teacherId);
    setValue((teacher[field] as string) ?? "");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTeacherId(null);
    setValue("");
  };

  const handleSaveValue = () => {
    if (teacherId == null || !data) return;
    const currentTeacher = data.find((t) => t.teacherId === teacherId);
    if (!currentTeacher) return;

    patchMutation.mutate({
      id: teacherId,
      [field]: value,
    });

    handleCloseModal();
  };

  return {
    isOpen,
    value,
    setValue,
    openModal,
    handleSaveValue,
    handleCloseModal,
  };
}
