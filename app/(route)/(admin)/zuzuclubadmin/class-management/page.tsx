"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";

export default function ClassManagementHome() {
  const { data } = useGetClassList({
    matchingStatus: ["최종매칭", "중단", "일시중단"],
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
