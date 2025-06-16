"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";
import { Header } from "@/ui";

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
      {data && (
        <Header
          matchingId={data.applicationFormByMatchingId[0].applicationFormId}
        />
      )}
      <div className="flex justify-end p-6">
        <button
          onClick={() => {
            // TODO: 선생님 교체 로직
          }}
          className="rounded-md bg-yellow-300 px-4 py-2 text-sm text-black hover:bg-yellow-600"
        >
          선생님 교체하기
        </button>
      </div>
      <ClassList classItems={tableData} setClassItems={setTableData} />
    </div>
  );
}
