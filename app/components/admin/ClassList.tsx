"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ClassListResponse } from "@/actions/get-class-info";
import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Pagination } from "@/ui";

function ClassList({ pagination = false }: { pagination?: boolean }) {
  const router = useRouter();
  const [tableData, setTableData] = useState<ClassListResponse[]>([]);

  // 더미데이터 (기능 구현하실 때 지워주세요!)
  useEffect(() => {
    setTableData([
      {
        nickName: "선생님",
        applicationFormId: "강남구11a",
        subject: "수학",
        status: "수업중",
        kakaoName: "학부모",
      },
      {
        nickName: "선생님2",
        applicationFormId: "강남구12b",
        subject: "영어",
        status: "중단",
        kakaoName: "학부모2",
      },
      {
        nickName: "선생님3",
        applicationFormId: "강남구13b",
        subject: "영어",
        status: "임시중단",
        kakaoName: "학부모3",
      },
    ]);
  }, []);

  const columns = getClassColumns();
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
      className={`my-2 overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg${
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
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 text-left text-sm">
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
