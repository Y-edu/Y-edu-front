"use client";

import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  RowSelectionState,
  ColumnDef,
  OnChangeFn,
} from "@tanstack/react-table";

import { Pagination } from "@/ui/Pagination";
import cn from "@/utils/cn";

// 타입 정의
interface PaginationOptions {
  enabled?: boolean;
  pageSize?: number;
}

interface SelectionOptions {
  enabled?: boolean;
  selectedRows?: RowSelectionState;
  onChange?: OnChangeFn<RowSelectionState>;
}

interface RowInteraction<TData> {
  onClick?: (row: TData) => void;
  getId?: (row: TData) => string;
}

export interface AdminTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  className?: string;
  pagination?: PaginationOptions;
  selection?: SelectionOptions;
  rowInteraction?: RowInteraction<TData>;
}

export default function AdminTable<TData>({
  data,
  columns,
  isLoading = false,
  error = null,
  emptyMessage = "결과가 없습니다.",
  className = "",
  pagination = { enabled: true, pageSize: 30 },
  selection = { enabled: false, selectedRows: {} },
  rowInteraction = {},
}: AdminTableProps<TData>) {
  const [tableData, setTableData] = useState<TData[]>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const table = useReactTable<TData>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: rowInteraction.getId,
    state: selection.enabled
      ? {
          rowSelection: selection.selectedRows || {},
        }
      : undefined,
    onRowSelectionChange: selection.enabled ? selection.onChange : undefined,
    initialState: {
      pagination: {
        pageSize: pagination.pageSize || 30,
      },
    },
  });

  const handleRowClick = (row: TData) => {
    if (rowInteraction.onClick) {
      rowInteraction.onClick(row);
    }
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white p-4 shadow-lg">
        <p>로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white p-4 shadow-lg">
        <p>
          에러 발생:{" "}
          {error instanceof Error ? error.message : "알 수 없는 에러"}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`my-2 rounded-3xl border border-gray-300 bg-white shadow-lg ${className}`}
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
                  className={cn(
                    "p-4 text-left text-sm font-semibold",
                    idx === 0 && "rounded-tl-3xl",
                    idx === headerGroup.headers.length - 1 && "rounded-tr-3xl",
                  )}
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
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.getHeaderGroups()[0]?.headers.length || 1}
                className="p-4 text-center text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, rowIndex) => (
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

                  if (selection.enabled) {
                    row.getToggleSelectedHandler()(e);
                  } else {
                    handleRowClick(row.original);
                  }
                }}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={cell.id}
                    data-cell-id={cell.column.id}
                    className={cn(
                      "text-left text-sm",
                      "p-4",
                      rowIndex === table.getRowModel().rows.length - 1 && {
                        "rounded-bl-3xl": cellIndex === 0,
                        "rounded-br-3xl":
                          cellIndex === row.getVisibleCells().length - 1,
                      },
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination.enabled && (
        <div className="pb-4">
          <Pagination
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            onPrevious={() => table.previousPage()}
            onNext={() => table.nextPage()}
          />
        </div>
      )}
    </div>
  );
}
