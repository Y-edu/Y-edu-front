"use client";

import { useRouter } from "next/navigation";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Class } from "@/hooks/query/useGetClassList";
import AdminTable from "@/ui/Table/AdminTable";
import { ClassStatus } from "@/constants/matching";

export interface ClassListProps {
  classItems?: Class[];
  setClassItems: React.Dispatch<React.SetStateAction<Class[]>>;
  pagination?: boolean;
  selectedClassRowList?: RowSelectionState;
  setSelectedClasses?: Dispatch<SetStateAction<RowSelectionState>>;
}

function ClassList({
  classItems,
  setClassItems,
  pagination = false,
  selectedClassRowList,
  setSelectedClasses,
}: ClassListProps) {
  const router = useRouter();

  const handleStatusChange = (rowIndex: number, newStatus: ClassStatus) => {
    setClassItems?.((prev: Class[]) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, matchingStatus: newStatus } : row,
      ),
    );
  };

  const columns = getClassColumns(handleStatusChange);

  // 행 클릭 핸들러 - 체크박스가 있을 때는 체크박스 토글, 없을 때는 상세페이지 이동
  const handleRowClick = (row: Class) => {
    if (setSelectedClasses) {
      // 체크박스 선택 모드일 때 - 행 클릭 시 체크박스 토글
      const classId = String(row.matchingId);
      setSelectedClasses((prev) => ({
        ...prev,
        [classId]: !prev[classId],
      }));
    } else {
      // 일반 모드일 때 - 상세페이지로 이동
      router.push(`/zuzuclubadmin/class-management/${row.matchingId}`);
    }
  };

  return (
    <AdminTable<Class>
      data={classItems || []}
      columns={columns as ColumnDef<Class>[]}
      pagination={{ enabled: pagination, pageSize: 100 }}
      selection={{
        enabled: !!setSelectedClasses,
        selectedRows: selectedClassRowList || {},
        onChange: setSelectedClasses || (() => {}),
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
