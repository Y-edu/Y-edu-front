"use client";

import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

import TeacherListFilter from "./TeacherListFilter";
import TeacherList from "./TeacherList";
import TeacherListSearch from "./TeacherListSearch";

export function Teacher({ matchingId }: { matchingId: string }) {
  const [selectedTeacherList, setSelectedTeacherRowList] =
    useState<RowSelectionState>({});

  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);

  return (
    <section>
      <TeacherListFilter
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedSchool={selectedSchool}
        setSelectedSchool={setSelectedSchool}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <TeacherListSearch
        matchingId={matchingId}
        selectedTeachers={Object.keys(selectedTeacherList)}
      />
      <TeacherList
        selectedTeacherRowList={selectedTeacherList}
        setSelectedTeachers={setSelectedTeacherRowList}
        subject={selectedSubject}
        school={selectedSchool}
        gender={selectedGender}
        region={selectedRegion}
      />
    </section>
  );
}
