"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { useGetParentsList } from "@/hooks/query/useGetParentsList";
import { ParentsListResponse } from "@/actions/get-parents-list/index";
import { getParentColumns } from "@/ui/Columns/ParentsColumns";
import { usePutParentStatusToggle } from "@/hooks/mutation/usePutParentStatusToggle";
import AdminTable from "@/ui/Table/AdminTable";

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

  const handleRowClick = (row: ParentsListResponse) => {
    window.location.href = `/zuzuclubadmin/${row.applicationFormId}`;
  };

  return (
    <AdminTable<ParentsListResponse>
      data={tableData}
      isLoading={isLoading}
      error={error}
      columns={columns as ColumnDef<ParentsListResponse>[]}
      pagination
      pageSize={15}
      onRowClick={handleRowClick}
      emptyMessage="결과가 없습니다."
    />
  );
}

export default ParentsListComponent;
