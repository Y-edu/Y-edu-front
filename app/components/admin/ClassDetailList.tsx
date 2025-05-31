"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";

import { getClassDetailColumns } from "@/ui/Columns/ClassDetailColumns";
import { ClassDetail, useGetClassDetail } from "@/hooks/query/useGetClassList";

function ClassDetailList() {
  const { matchingId } = useParams();

  const { data } = useGetClassDetail({
    matchingIds: [Number(matchingId)],
    matchingStatus: ["최종매칭", "일시중단", "중단"],
  });

  const [tableData, setTableData] = useState<ClassDetail[]>([]);

  useEffect(() => {
    setTableData(data?.applicationFormByMatchingId ?? []);
  }, [data]);

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
