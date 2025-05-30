"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";

export default function ClassManagementHome() {
  const { data } = useGetClassList({
    matchingStatus: ["최종매칭"],
  });
  const [tableData, setTableData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setTableData(data.applicationFormByMatchingId);
    }
  }, [data]);

  return (
    <div>
      <h1 className="flex h-[100px] w-full items-center bg-white pl-16 text-[22px] font-bold text-gray-700">
        수업관리
      </h1>
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
