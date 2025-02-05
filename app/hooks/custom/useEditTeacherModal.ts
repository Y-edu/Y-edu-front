import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { FilteringTeacher } from "../../actions/get-teacher-search";

interface PatchParams {
  teacherId: number;
  issue: string | null;
}

export function useEditTeacherModal(
  field: keyof Pick<FilteringTeacher, "issue">,
  data: FilteringTeacher[] | undefined,
  patchMutation: UseMutationResult<PatchParams, Error>,
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
          // 에러 처리
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
