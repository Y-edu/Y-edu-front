"use client";

import { flexRender } from "@tanstack/react-table";

import { useAlimTableContext } from "../../(route)/(admin)/[id]/(hooks)/useAlimTable";
import { Pagination } from "../../ui";

import { AlimTHeaderColumn } from "./AlimColumn";

export function AlimTable() {
  const { alimTable } = useAlimTableContext();

  return (
    <div className="mb-6">
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            {alimTable.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b bg-gray-100 text-primary"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold"
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
                <tr
                  key={row.id}
                  className="cursor-pointer border-b bg-white hover:bg-gray-100"
                  onClick={(e) => {
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
        canPreviousPage={alimTable.getCanPreviousPage()}
        canNextPage={alimTable.getCanNextPage()}
        pageIndex={alimTable.getState().pagination.pageIndex}
        pageCount={alimTable.getPageCount()}
        onPrevious={() => alimTable.previousPage()}
        onNext={() => alimTable.nextPage()}
      />
    </div>
  );
}
