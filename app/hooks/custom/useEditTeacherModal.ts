import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { FilteringTeacher } from "app/actions/get-teacher-search";

interface PatchParams {
  teacherId: string;
  issue: string | null;
}

export function useEditTeacherModal(
  field: keyof Pick<FilteringTeacher, "issue">,
  data: FilteringTeacher[] | undefined,
  patchMutation: UseMutationResult<PatchParams, Error>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<string>("");
  const [value, setValue] = useState("");

  const openModal = (teacher: FilteringTeacher) => {
    setIsOpen(true);
    setTeacherId(teacher.teacherId);
    setValue((teacher[field] as string) ?? "");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTeacherId("");
    setValue("");
  };

  const handleSaveValue = () => {
    if (teacherId == null || !data) return;
    const currentTeacher = data.find((t) => t.teacherId === teacherId);
    if (!currentTeacher) return;

    patchMutation.mutate(
      {
        teacherId,
        [field]: value,
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
        onError: (error) => {
          alert(`문제가 발생했습니다: ${error.message}`);
          handleCloseModal();
        },
      },
    );
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
