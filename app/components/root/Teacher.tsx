"use client";

import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

import TeacherListFilter from "./TeacherListFilter";
import TeacherList from "./TeacherList";
import TeacherListSearch from "./TeacherListSearch";

export function Teacher({ matchingId }: { matchingId: string }) {
  const [selectedTeacherList, setSelectedTeacherRowList] =
    useState<RowSelectionState>({});

  // 1) 사용자 필터
  const [draftSubject, setDraftSubject] = useState<string[]>([]);
  const [draftSchool, setDraftSchool] = useState<string[]>([]);
  const [draftGender, setDraftGender] = useState<string[]>([]);
  const [draftRegion, setDraftRegion] = useState<string[]>([]);

  // 2) 서버 전달 필터
  const [appliedSubject, setAppliedSubject] = useState<string[]>([]);
  const [appliedSchool, setAppliedSchool] = useState<string[]>([]);
  const [appliedGender, setAppliedGender] = useState<string[]>([]);
  const [appliedRegion, setAppliedRegion] = useState<string[]>([]);

  const handleApplyFilters = () => {
    setAppliedSubject(draftSubject);
    setAppliedSchool(draftSchool);
    setAppliedGender(draftGender);
    setAppliedRegion(draftRegion);
  };
  return (
    <section>
      <TeacherListFilter
        selectedSubject={draftSubject}
        setSelectedSubject={setDraftSubject}
        selectedSchool={draftSchool}
        setSelectedSchool={setDraftSchool}
        selectedGender={draftGender}
        setSelectedGender={setDraftGender}
        selectedRegion={draftRegion}
        setSelectedRegion={setDraftRegion}
        onApplyFilters={handleApplyFilters}
      />
      <TeacherListSearch
        matchingId={matchingId}
        selectedTeachers={Object.keys(selectedTeacherList)}
      />
      <TeacherList
        selectedTeacherRowList={selectedTeacherList}
        setSelectedTeachers={setSelectedTeacherRowList}
        subject={appliedSubject}
        school={appliedSchool}
        gender={appliedGender}
        region={appliedRegion}
      />
    </section>
  );
}
