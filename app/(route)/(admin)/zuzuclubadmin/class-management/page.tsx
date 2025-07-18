"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";
import { CLASS_STATUS_OPTIONS } from "@/constants/matching";

export default function ClassManagementHome() {
  const { data } = useGetClassList({
    matchingStatus: [...CLASS_STATUS_OPTIONS],
  });
  const [tableData, setTableData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setTableData(data.applicationFormByMatchingId);
    }
  }, [data]);

  return (
    <div>
      <div className="p-4 pt-2">
        <ClassList
          classItems={tableData}
          setClassItems={setTableData}
          pagination
        />
      </div>
    </div>
  );
}
