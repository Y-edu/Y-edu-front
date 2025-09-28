"use client";

import { useEffect, useState } from "react";

import ClassList from "@/components/admin/ClassList";
import ClassSummaryCard from "@/components/admin/ClassSummaryCard";
import ClassProgressRecords from "@/components/admin/ClassProgressRecords";
import {
  Class,
  useGetClassList,
  useGetClassDetail,
} from "@/hooks/query/useGetClassList";
import { Header } from "@/ui";
import { CLASS_STATUS_OPTIONS } from "@/constants/matching";

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

  const { data: detailData } = useGetClassDetail({
    matchingIds: [Number(matchingId)],
    matchingStatus: ["최종매칭"],
  });

  const [tableData, setTableData] = useState<Class[]>([]);

  useEffect(() => {
    if (data?.applicationFormByMatchingId) {
      setTableData(data.applicationFormByMatchingId);
    }
  }, [data]);

  // 상세 데이터에서 필요한 정보 추출
  const classDetail = detailData?.applicationFormByMatchingId?.[0];
  const classManagement = classDetail?.classManagement;

  // ClassSummaryCard용 데이터
  const summaryData = classManagement
    ? {
        progressRound: `${classManagement.notPaidRoundNumber} / ${classManagement.maxRoundNumber}`,
        teacherClassMinute: `${classManagement.teacherClassMinute}분`,
        paidAt: classManagement.paidAt
          ? new Date(classManagement.paidAt)
              .toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(/\. /g, "-")
              .replace(/\.$/, "")
          : "-",
        parentPay: `${Math.floor(classManagement.parentPay / 10000)}만원`,
        teacherPay: `${Math.floor(classManagement.teacherPay / 10000)}만원`,
        changeTeacherRecord: "추후 구현", // TODO: 추후 구현
      }
    : null;

  // 일단 다 "최근 4주 진행 기록"에 넣음 (최근 데이터가 아래로 오도록 역순 정렬)
  const recentRecords =
    classManagement?.sessions
      ?.slice()
      .reverse()
      .map(
        (session) =>
          `[${session.roundNumber}회차] ${session.date.slice(5)} ${session.realClassMinute}분`,
      ) || [];
  const pastRecords: string[] = []; // "이전 4주 진행 기록"은 일단 빈 배열

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
      {/* 수업 요약 정보 */}
      {summaryData && (
        <div className="p-6">
          <ClassSummaryCard data={summaryData} />
        </div>
      )}

      {/* 진행 기록 */}
      <div className="px-6 pb-6">
        <ClassProgressRecords
          recentRecords={recentRecords}
          pastRecords={pastRecords}
        />
      </div>
    </div>
  );
}
