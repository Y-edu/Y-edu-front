"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

import { getTeacherColumns } from "@/ui/Columns/TeacherColumns";
import type {
  TeacherSearchParams,
  FilteringTeacher,
} from "@/actions/get-teacher-search";
import { TeacherUpdateModal } from "@/ui/TeacherUpdateModal";
import { useGetTeacherSearch } from "@/hooks/query/useGetTeacherSearch";
import { Pagination } from "@/ui/Pagination";

interface TeacherListProps {
  selectedTeacherRowList: RowSelectionState;
  setSelectedTeachers: Dispatch<SetStateAction<RowSelectionState>>;
  filters: TeacherSearchParams;
  onTeacherDataLoad: (data: FilteringTeacher[]) => void;
}

function TeacherList({
  selectedTeacherRowList,
  setSelectedTeachers,
  filters,
  onTeacherDataLoad,
}: TeacherListProps) {
  const { districts, subjects, universities, genders, search } = filters;
  const { data, isLoading, isError } = useGetTeacherSearch({
    districts,
    subjects,
    universities,
    genders,
    search,
  });

  const [selectedTeacher, setSelectedTeacher] =
    useState<FilteringTeacher | null>(null);
  const [modalType, setModalType] = useState<"video" | "issue" | null>(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

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

  const teacherTable = useReactTable({
    data: data?.filteringTeachers ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (serverStateData) => String(serverStateData.teacherId),
    state: {
      rowSelection: selectedTeacherRowList,
      pagination,
    },
    onRowSelectionChange: setSelectedTeachers,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (data?.filteringTeachers) {
      onTeacherDataLoad(data.filteringTeachers);
    }
  }, [data, onTeacherDataLoad]);

  if (isLoading)
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white p-4 shadow-lg">
        로딩 중...
      </div>
    );
  if (isError)
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white p-4 shadow-lg">
        데이터를 불러오는 중 에러가 발생했습니다.
      </div>
    );

  return (
    <div className="mb-6">
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            {teacherTable.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b bg-gray-100 text-primary">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {teacherTable.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    teacherTable.getHeaderGroups()[0]?.headers.length || 1
                  }
                  className="p-4 text-center text-sm"
                >
                  검색결과가 없습니다.
                </td>
              </tr>
            ) : (
              teacherTable.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer border-b bg-white hover:bg-gray-100"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                      target.tagName.toLowerCase() === "img" ||
                      target.tagName.toLowerCase() === "button" ||
                      target.closest("button")
                    ) {
                      return;
                    }
                    row.getToggleSelectedHandler()(e);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-left text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        canPreviousPage={teacherTable.getCanPreviousPage()}
        canNextPage={teacherTable.getCanNextPage()}
        pageIndex={teacherTable.getState().pagination.pageIndex}
        pageCount={teacherTable.getPageCount()}
        onPrevious={() => teacherTable.previousPage()}
        onNext={() => teacherTable.nextPage()}
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
