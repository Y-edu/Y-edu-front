"use client";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ClassAdditionalInfo } from "@/actions/get-class-info";
import { getClassDetailColumns } from "@/ui/Columns/ClassDetailColumns";

function ClassDetailList() {
  const [tableData, setTableData] = useState<ClassAdditionalInfo[]>([]);

  // 더미데이터 (기능 구현하실 때 지워주세요!)
  useEffect(() => {
    setTableData([
      {
        startDate: "2025-01-01",
        parentPhoneNumber: "010-1234-5678",
        teacherPhoneNumber: "010-1234-5678",
        classTime: "10:00-12:00",
      },
    ]);
  }, []);

  const columns = getClassDetailColumns();
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
    <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg">
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
  );
}

export default ClassDetailList;
