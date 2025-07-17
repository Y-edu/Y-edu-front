"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { getClassColumns } from "@/ui/Columns/ClassColumns";
import { Class } from "@/hooks/query/useGetClassList";
import AdminTable from "@/ui/Table/AdminTable";

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

  const handleStatusChange = (
    rowIndex: number,
    newStatus: "최종매칭" | "중단" | "일시중단",
  ) => {
    setClassItems?.((prev: Class[]) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, matchingStatus: newStatus } : row,
      ),
    );
  };

  const columns = getClassColumns(handleStatusChange);

  const handleRowClick = (row: Class) => {
    router.push(`/zuzuclubadmin/class-management/${row.matchingId}`);
  };

  return (
    <AdminTable<Class>
      data={classItems || []}
      columns={columns as ColumnDef<Class>[]}
      pagination={{ enabled: pagination, pageSize: 100 }}
      rowInteraction={{ onClick: handleRowClick }}
      className={pagination ? "pb-4" : ""}
    />
  );
}

export default ClassList;
