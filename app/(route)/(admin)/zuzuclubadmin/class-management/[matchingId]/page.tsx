"use client";

import { useEffect, useState } from "react";

import ClassDetailList from "@/components/admin/ClassDetailList";
import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";

export default function ClassManagementDetailPage({
  params,
}: {
  params: { matchingId: string };
}) {
  const { matchingId } = params;

  const { data } = useGetClassList(
    {
      matchingIds: [Number(matchingId)],
      matchingStatus: ["최종매칭"],
    },
    { skip: !matchingId },
  );

  const [tableData, setTableData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setTableData(data.applicationFormByMatchingId);
    }
  }, [data]);

  return (
    <div>
      <h1 className="flex h-[100px] w-full items-center bg-white pl-16 text-[22px] font-bold text-gray-700">
        {tableData[0]?.applicationFormId || "수업 상세 정보"}
      </h1>
      <ClassList classItems={tableData} setClassItems={setTableData} />
      <ClassDetailList />
    </div>
  );
}
