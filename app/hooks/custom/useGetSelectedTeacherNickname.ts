import type { RowSelectionState } from "@tanstack/react-table";

import type { FilteringTeacher } from "app/actions/get-teacher-search";

export function getSelectedTeacherNicknames(
  teachers: FilteringTeacher[],
  rowSelection: RowSelectionState,
): string[] {
  return teachers
    .filter((teacher) => rowSelection[teacher.teacherId])
    .map((teacher) => teacher.nickName);
}
