"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Class } from "@/hooks/query/useGetClassList";
import AdminTable from "@/ui/Table/AdminTable";
import { ClassStatus } from "@/constants/matching";

export interface ClassListProps {
  classItems?: Class[];
  setClassItems: React.Dispatch<React.SetStateAction<Class[]>>;
  pagination?: boolean;
  selectedClassCodes?: string[];
  setSelectedClassCodes?: Dispatch<SetStateAction<string[]>>;
}

function ClassList({
  classItems,
  setClassItems,
  pagination = false,
  selectedClassCodes,
  setSelectedClassCodes,
}: ClassListProps) {
  const router = useRouter();

  const handleStatusChange = (rowIndex: number, newStatus: ClassStatus) => {
    setClassItems?.((prev: Class[]) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, matchingStatus: newStatus } : row,
      ),
    );
  };

  const columns = getClassColumns(
    handleStatusChange,
    selectedClassCodes,
    setSelectedClassCodes,
  );

  // 행 클릭 핸들러 - 항상 상세페이지로 이동 (체크박스는 별도 처리)
  const handleRowClick = (row: Class) => {
    router.push(`/zuzuclubadmin/class-management/${row.matchingId}`);
  };

  return (
    <AdminTable<Class>
      data={classItems || []}
      columns={columns as ColumnDef<Class>[]}
      pagination={{ enabled: pagination, pageSize: 100 }}
      selection={{
        enabled: false,
        selectedRows: {},
        onChange: () => {},
      }}
      rowInteraction={{
        onClick: handleRowClick,
        getId: (row) => String(row.matchingId),
      }}
      className={pagination ? "pb-4" : ""}
    />
  );
}

export default ClassList;
