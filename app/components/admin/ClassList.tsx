"use client";

import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Pagination } from "@/ui";
import { Class, ClassStatus } from "@/hooks/query/useGetClassList";
import cn from "@/utils/cn";

export interface ClassListProps {
  classItems?: Class[];
  setClassItems: React.Dispatch<React.SetStateAction<Class[]>>;
  pagination?: boolean;
}

function ClassList({
  classItems,
  setClassItems,
  pagination = false,
}: ClassListProps) {
  const router = useRouter();

  // 상태 변경 핸들러
  const handleStatusChange = (rowIndex: number, newStatus: ClassStatus) => {
    setClassItems?.((prev: Class[]) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, matchingStatus: newStatus } : row,
      ),
    );
  };

  const columns = getClassColumns(handleStatusChange);
  const table = useReactTable<Class>({
    data: classItems || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 100,
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
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className="cursor-pointer border-b bg-white hover:bg-gray-100"
              onClick={() => {
                router.push(
                  `/zuzuclubadmin/class-management/${row.original.matchingId}`,
                );
              }}
            >
              {/* 테이블 bottom 라운드 처리 */}
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td
                  key={cell.id}
                  className={cn(
                    "p-4 text-left text-sm",
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
