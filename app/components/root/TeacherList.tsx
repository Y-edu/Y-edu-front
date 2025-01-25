"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { TeacherProfile } from "../../types/TeacherProfile";
import { Pagination } from "../../ui/Pagination";
import { getTeacherColumns } from "../../ui/Columns/TeacherColumns";
import { useEditTeacherModal } from "../../hooks/custom/useEditTeacherModal";
import { EditTeacherModal } from "../../ui/EditTeacherModal";
import { useGetTeachers } from "../../hooks/query/useGetTeachers";
import { usePatchTeacherModal } from "../../hooks/mutation/usePatchTeacherModal";

function TeacherList() {
  const { data, isLoading, isError } = useGetTeachers();
  const patchMutation = usePatchTeacherModal();

  const youtubeModal = useEditTeacherModal("youtubeLink", data, patchMutation);
  const remarkModal = useEditTeacherModal("remark", data, patchMutation);

  const handleOpenYoutubeModal = (teacher: TeacherProfile) => {
    youtubeModal.openModal(teacher);
  };
  const handleOpenRemarkModal = (teacher: TeacherProfile) => {
    remarkModal.openModal(teacher);
  };

  const columns = getTeacherColumns({
    handleOpenYoutubeModal,
    handleOpenRemarkModal,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (isError)
    return <div className="p-4">데이터를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <div>
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
              <tr key={row.id} className="border-b bg-white hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4 text-left text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
      />

      {/* 유튜브 링크 수정 모달 */}
      <EditTeacherModal
        isOpen={youtubeModal.isOpen}
        value={youtubeModal.value}
        setValue={youtubeModal.setValue}
        onSave={youtubeModal.saveValue}
        onCancel={youtubeModal.closeModal}
        title="선생님 프로필 유튜브 링크 수정"
        placeholder="https://youtube.com/..."
        isTextarea={false}
      />

      {/* 비고(remark) 수정 모달 */}
      <EditTeacherModal
        isOpen={remarkModal.isOpen}
        value={remarkModal.value}
        setValue={remarkModal.setValue}
        onSave={remarkModal.saveValue}
        onCancel={remarkModal.closeModal}
        title="간단 비고 수정"
        maxLength={30}
        isTextarea={true}
      />
    </div>
  );
}

export default TeacherList;
