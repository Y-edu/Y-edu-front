"use client";

import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useGetParentsList } from "../../hooks/query/useGetParentsList";
import { ParentsListResponse } from "../../actions/get-parents-list/index";
import { Pagination } from "../../ui/Pagination";
import { getParentColumns } from "../../ui/Columns/ParentsColumns";
import { usePutParentStatusToggle } from "../../hooks/mutation/usePutParentStatusToggle";

function ParentsListComponent() {
  const { data, isLoading, error } = useGetParentsList();
  const [tableData, setTableData] = useState<ParentsListResponse[]>([]);
  const { mutate: toggleStatus } = usePutParentStatusToggle();

  useEffect(() => {
    if (data) {
      setTableData(data.applicationResponses);
    }
  }, [data]);

  const onToggleStatus = (applicationFormId: string) =>
    toggleStatus(applicationFormId, {
      onSuccess: () =>
        setTableData((prev) =>
          prev.map((item) =>
            item.applicationFormId === applicationFormId
              ? { ...item, status: !item.status }
              : item,
          ),
        ),
      onError: (error) => {
        alert(
          `데이터 전송 오류: ${error instanceof Error ? error.message : error}`,
        );
      },
    });

  const columns = getParentColumns(tableData, setTableData, onToggleStatus);
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
    <div>
      {isLoading ? (
        <p>로딩중...</p>
      ) : error ? (
        <p>
          에러 발생:{" "}
          {error instanceof Error ? error.message : "알 수 없는 에러"}
        </p>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-lg">
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
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest('[role="switch"]')) return;
                      window.location.href = `/${row.original.applicationFormId}`;
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
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            onPrevious={() => table.previousPage()}
            onNext={() => table.nextPage()}
          />
        </>
      )}
    </div>
  );
}

export default ParentsListComponent;
