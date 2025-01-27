"use client";

import { flexRender } from "@tanstack/react-table";

import { useAlimTable } from "../(hooks)/useAlimTable";
import { AlimTHeaderColumn } from "../(constants)/AlimColumn";

export function AlimTable({ matchingId }: { matchingId: number }) {
  const { alimTable } = useAlimTable({
    matchingId,
    page: 1,
  });
  return (
    <div className="overflow-x-auto">
      <div className="mb-5 max-h-[652px] overflow-y-auto">
        <table className="mx-auto min-w-[95%] border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            {alimTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="sticky top-0 border-b border-gray-200 bg-gray-100 px-4 py-2 text-left font-semibold text-descColor"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {alimTable.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={AlimTHeaderColumn.length}
                  className="py-4 text-center"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              alimTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b border-gray-200 px-4 py-2"
                    >
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
    </div>
  );
}
