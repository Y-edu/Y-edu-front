"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ClassListResponse, ClassStatus } from "@/actions/get-class-info";
import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Pagination } from "@/ui";

export interface ClassListProps {
  pagination?: boolean;
  classItems: ClassListResponse[];
}

function ClassList({ pagination = false, classItems }: ClassListProps) {
  const router = useRouter();
  const [tableData, setTableData] = useState<ClassListResponse[]>([]);

  // 더미데이터 (기능 구현하실 때 지워주세요!)
  useEffect(() => {
    setTableData(classItems);
  }, [classItems]);

  // 상태 변경 핸들러
  const handleStatusChange = (rowIndex: number, newStatus: ClassStatus) => {
    setTableData((prev) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, status: newStatus } : row,
      ),
    );
    // TODO: 여기서 API 호출도 가능
    // await updateClassStatusAPI(rowId, newStatus)
  };

  const columns = getClassColumns(handleStatusChange);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div
      className={`my-2 rounded-3xl border border-gray-300 bg-white shadow-lg ${
        pagination ? "pb-4" : ""
      }`}
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b bg-gray-100 text-primary"
            >
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`p-4 text-left text-sm ${
                    idx === 0 ? "rounded-tl-3xl" : ""
                  } ${
                    idx === headerGroup.headers.length - 1
                      ? "rounded-tr-3xl"
                      : ""
                  }`}
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
              onClick={() => {
                router.push(
                  `/zuzuclubadmin/class-management/${row.original.applicationFormId}`,
                );
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

      {pagination && (
        <Pagination
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          onPrevious={() => table.previousPage()}
          onNext={() => table.nextPage()}
        />
      )}
    </div>
  );
}

export default ClassList;
