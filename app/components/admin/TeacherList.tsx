"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { RowSelectionState, ColumnDef } from "@tanstack/react-table";

import { getTeacherColumns } from "@/ui/Columns/TeacherColumns";
import type {
  TeacherSearchParams,
  FilteringTeacher,
} from "@/actions/get-teacher-search";
import { TeacherUpdateModal } from "@/ui/Modal/TeacherUpdateModal";
import { useGetTeacherSearch } from "@/hooks/query/useGetTeacherSearch";
import AdminTable from "@/ui/Table/AdminTable";

interface TeacherListProps {
  matchingId: string;
  selectedTeacherRowList: RowSelectionState;
  setSelectedTeachers: Dispatch<SetStateAction<RowSelectionState>>;
  filters: TeacherSearchParams;
  onTeacherDataLoad: (data: FilteringTeacher[]) => void;
}

function TeacherList({
  matchingId,
  selectedTeacherRowList,
  setSelectedTeachers,
  filters,
  onTeacherDataLoad,
}: TeacherListProps) {
  const { districts, subjects, universities, genders, search } = filters;
  const { data, isLoading, isError } = useGetTeacherSearch(matchingId, {
    districts,
    subjects,
    universities,
    genders,
    search,
  });

  const [selectedTeacher, setSelectedTeacher] =
    useState<FilteringTeacher | null>(null);
  const [modalType, setModalType] = useState<"video" | "issue" | null>(null);

  const handleOpenModal = (
    teacher: FilteringTeacher,
    type: "video" | "issue",
  ) => {
    setSelectedTeacher(teacher);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setModalType(null);
  };

  const columns = getTeacherColumns({
    handleOpenModal,
  });

  const handleRowClick = (row: FilteringTeacher) => {
    const teacherId = String(row.teacherId);
    setSelectedTeachers((prev) => ({
      ...prev,
      [teacherId]: !prev[teacherId],
    }));
  };

  useEffect(() => {
    if (data?.filteringTeachers) {
      onTeacherDataLoad(data.filteringTeachers);
    }
  }, [data, onTeacherDataLoad]);

  return (
    <div className="mb-6">
      <AdminTable<FilteringTeacher>
        data={data?.filteringTeachers ?? []}
        isLoading={isLoading}
        error={
          isError
            ? new Error("데이터를 불러오는 중 에러가 발생했습니다.")
            : null
        }
        columns={columns as ColumnDef<FilteringTeacher>[]}
        pagination={{ enabled: true, pageSize: 30 }}
        selection={{
          enabled: true,
          selectedRows: selectedTeacherRowList,
          onChange: setSelectedTeachers,
        }}
        rowInteraction={{
          onClick: handleRowClick,
          getId: (row) => String(row.teacherId),
        }}
      />

      {modalType && (
        <TeacherUpdateModal
          isOpen={modalType !== null}
          teacher={selectedTeacher}
          onClose={handleCloseModal}
          type={modalType}
        />
      )}
    </div>
  );
}

export default TeacherList;
