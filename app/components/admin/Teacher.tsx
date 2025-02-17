"use client";

import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

import type {
  TeacherSearchParams,
  FilteringTeacher,
} from "../../actions/get-teacher-search";

import TeacherListFilter from "./TeacherListFilter";
import TeacherList from "./TeacherList";
import TeacherListSearch from "./TeacherListSearch";

const initialFilters: TeacherSearchParams = {
  districts: [],
  subjects: [],
  universities: [],
  genders: [],
  search: "",
};

export function Teacher({ matchingId }: { matchingId: string }) {
  const [selectedTeacherList, setSelectedTeacherRowList] =
    useState<RowSelectionState>({});

  const [draftFilters, setDraftFilters] =
    useState<TeacherSearchParams>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<TeacherSearchParams>(initialFilters);
  const [teacherData, setTeacherData] = useState<FilteringTeacher[] | null>(
    null,
  );

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };
  return (
    <section>
      <TeacherListFilter
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
      <TeacherListSearch
        matchingId={matchingId}
        selectedTeachers={Object.keys(selectedTeacherList)}
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={handleApplyFilters}
        teacherData={teacherData}
        selectedTeacherRowList={selectedTeacherList}
      />
      <TeacherList
        selectedTeacherRowList={selectedTeacherList}
        setSelectedTeachers={setSelectedTeacherRowList}
        filters={appliedFilters}
        onTeacherDataLoad={setTeacherData}
      />
    </section>
  );
}
