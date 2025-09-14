"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import { Class, useGetClassList } from "@/hooks/query/useGetClassList";
import { Header } from "@/ui";
import { CLASS_STATUS_OPTIONS } from "@/constants/matching";
import ClassSummaryCard from "@/components/admin/ClassSummaryCard";
import ClassProgressRecords from "@/components/admin/ClassProgressRecords";

export default function ClassManagementDetailPage({
  params,
}: {
  params: { matchingId: string };
}) {
  const { matchingId } = params;

  const { data } = useGetClassList(
    {
      matchingIds: [Number(matchingId)],
      matchingStatus: [...CLASS_STATUS_OPTIONS],
    },
    { skip: !matchingId },
  );

  const [tableData, setTableData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setTableData(data.applicationFormByMatchingId);
    }
  }, [data]);

  // TODO: 백엔드 연동 후 이 데이터는 API에서 가져옴
  const summaryData = {
    진행회차: "연동 예정",
    선생님진행분: "연동 예정",
    최근결제일시: "연동 예정",
    수업료: "연동 예정",
    선생님보수: "연동 예정",
    선생님교체기록: "연동 예정",
  };

  const recentRecords = [
    "연동 예정,아래 예시",
    "6/4 75분 1회차 완료",
    "6/13 75분 2회차 완료",
    "6/20 75분 3회차 완료",
  ];

  const pastRecords = [
    "연동 예정,아래 예시",
    "5/4 75분 1회차 완료",
    "5/13 75분 2회차 완료",
    "5/20 75분 3회차 완료",
    "5/31 75분 4회차 완료",
  ];

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

      <div className="space-y-6 pt-6">
        <ClassSummaryCard data={summaryData} />
        <ClassProgressRecords
          recentRecords={recentRecords}
          pastRecords={pastRecords}
        />
      </div>
    </div>
  );
}
