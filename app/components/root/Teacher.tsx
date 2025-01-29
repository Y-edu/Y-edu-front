"use client";

import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

import TeacherList from "./TeacherList";
import TeacherListFilter from "./TeacherListFilter";
import TeacherListSearch from "./TeacherListSearch";

export function Teacher({ matchingId }: { matchingId: string }) {
  const [selectedTeacherList, setSelectedTeacherRowList] =
    useState<RowSelectionState>({});
  return (
    <section>
      <TeacherListFilter />
      <TeacherListSearch
        matchingId={matchingId}
        selectedTeachers={Object.keys(selectedTeacherList).map((v) => v)}
      />
      <TeacherList
        selectedTeacherRowList={selectedTeacherList}
        setSelectedTeachers={setSelectedTeacherRowList}
      />
    </section>
  );
}
