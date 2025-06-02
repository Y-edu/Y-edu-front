"use client";

import { useEffect, useState } from "react";

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
      matchingStatus: ["최종매칭", "일시중단", "중단"],
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
      <header className="flex h-[100px] w-full items-center justify-between bg-white px-16 text-[22px] font-bold text-gray-700">
        <h1>{tableData[0]?.applicationFormId || "수업 상세 정보"}</h1>
        <button
          onClick={() => {
            // TODO: 선생님 교체 로직
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          선생님 교체하기
        </button>
      </header>
      <ClassList classItems={tableData} setClassItems={setTableData} />
    </div>
  );
}
