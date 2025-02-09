"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";

import type {
  TeacherSearchParams,
  FilteringTeacher,
} from "../../actions/get-teacher-search";
import { getTeacherColumns } from "../../ui/Columns/TeacherColumns";
import { TeacherUpdateModal } from "../../ui/TeacherUpdateModal";
import { useGetTeacherSearch } from "../../hooks/query/useGetTeacherSearch";
import { Pagination } from "../../ui/Pagination";

interface TeacherListProps {
  selectedTeacherRowList: RowSelectionState;
  setSelectedTeachers: Dispatch<SetStateAction<RowSelectionState>>;
  filters: TeacherSearchParams;
}

function TeacherList({
  selectedTeacherRowList,
  setSelectedTeachers,
  filters,
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

  const table = useReactTable({
    data: data?.filteringTeachers ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.teacherId.toString(),
    state: {
      rowSelection: selectedTeacherRowList,
    },
    onRowSelectionChange: setSelectedTeachers,
  });

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
        {/* 테이블 */}
        <table className="w-full table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((hg) => (
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
            {table.getRowModel().rows.map((row) => (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
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
