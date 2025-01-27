"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import type { ParentsList } from "../../types/ParentsList";
import { Pagination } from "../../ui/Pagination";
import { getParentColumns } from "../../ui/Columns/ParentsColumns";

function ParentsList() {
  // 예시 데이터
  const [tableData, setTableData] = useState<ParentsList[]>([
    {
      id: 1214124124000,
      kakaoName: "김철수",
      classTime: "14:00 - 16:00",
      subject: ["영어", "수학"],
      monthlyFee: 300000,
      source: "카카오톡 광고",
      submittedAt: "2025-01-26T10:00:00Z",
      acceptCount: 10,
      alertCount: 20,
      phoneNumber: "010-1234-5678",
      isDone: false,
    },
    {
      id: 1214124124001,
      kakaoName: "박영희",
      classTime: "10:00 - 12:00",
      subject: ["영어"],
      monthlyFee: 250000,
      source: "구글 검색",
      submittedAt: "2025-01-25T14:30:00Z",
      acceptCount: 10,
      alertCount: 20,
      phoneNumber: "010-9876-5432",
      isDone: false,
    },
    {
      id: 1214124124002,
      kakaoName: "이민호",
      classTime: "16:00 - 18:00",
      subject: ["수학"],
      monthlyFee: 350000,
      source: "네이버 블로그",
      submittedAt: "2025-01-24T09:15:00Z",
      acceptCount: 10,
      alertCount: 20,
      phoneNumber: "010-5555-6666",
      isDone: true,
    },
  ]);

  const columns = getParentColumns(tableData, setTableData);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
              <tr
                key={row.id}
                className="cursor-pointer border-b bg-white hover:bg-gray-100"
                onClick={() => (window.location.href = `/${row.original.id}`)} // 행 클릭 시 링크 이동
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

      {/* 페이지네이션 */}
      <Pagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
      />
    </div>
  );
}

export default ParentsList;
