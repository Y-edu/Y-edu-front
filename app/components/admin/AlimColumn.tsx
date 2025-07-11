/**
 * AlimTHeader는 알림톡 발송 내역 테이블의 필드 값을 보여줍니다.
 */

import { createColumnHelper } from "@tanstack/react-table";
import type { Table, Row } from "@tanstack/react-table";

import { AcceptanceSchema } from "@/actions/get-acceptance";
import { MATCHING_STATUS } from "@/constants/matching";

import MatchCell from "./AlimMatchCell";

const columnHelper = createColumnHelper<
  AcceptanceSchema["alarmTalkResponses"]["0"] & {
    receiveAcceptance?: string;
  }
>();

export const AlimTHeaderColumn = [
  {
    id: "select",
    header: ({
      table,
    }: {
      table: Table<AcceptanceSchema["alarmTalkResponses"]["0"]>;
    }) => (
      <input
        id="header-checkbox"
        type="checkbox"
        className="size-4"
        checked={table.getIsAllPageRowsSelected()} // 전체 row가 선택되었는지 확인
        onChange={table.getToggleAllPageRowsSelectedHandler()} // 전체 row를 선택/해제하는 handler
      />
    ),
    cell: ({
      row,
    }: {
      row: Row<AcceptanceSchema["alarmTalkResponses"]["0"]>;
    }) => (
      <input
        id={`cell-checkbox-${row.id}`}
        type="checkbox"
        className="size-4"
        checked={row.getIsSelected()} // row가 선택되었는지 확인
        disabled={!row.getCanSelect()} // row가 선택 가능한지 확인
        onChange={row.getToggleSelectedHandler()} // row를 선택/해제하는 handler
      />
    ),
    size: 30,
  },
  columnHelper.accessor("status", {
    header: "상태",
    size: 50,
    cell: ({ row }) => {
      const rowStatus = row.original.status;
      switch (rowStatus) {
        case MATCHING_STATUS.ACCEPT:
          return <span className="text-primary">수락</span>;
        case MATCHING_STATUS.SENT:
          return <span className="text-[#1DAD5D]">전송</span>;
        case MATCHING_STATUS.WAITING:
          return <span className="text-[#C6AA39]">대기</span>;
        case MATCHING_STATUS.REJECT:
          return <span className="text-[#C00D0D]">거절</span>;
        case MATCHING_STATUS.PAYMENT:
          return <span className="text-[#ce83eb]">입금단계</span>;
        case MATCHING_STATUS.MATCHING:
          return <span className="text-[#2563EB]">매칭*</span>;
        case MATCHING_STATUS.FINAL_MATCH:
          return <span className="text-[#7C3AED]">최종매칭*</span>;
        case MATCHING_STATUS.TUTORING_END:
          return <span className="text-[#6B7280]">과외결렬</span>;
        case MATCHING_STATUS.TEMPORARY_STOP:
          return <span className="text-yellow-500">일시중단</span>;
        case MATCHING_STATUS.STOP:
          return <span className="text-red-500">중단</span>;
      }
    },
    enableSorting: true,
  }),
  columnHelper.accessor("nickName", {
    header: "영어이름",
    size: 60,
  }),
  columnHelper.accessor("name", {
    header: "본명",
    size: 60,
  }),
  columnHelper.accessor("phoneNumber", {
    header: "전화번호",
    size: 100,
  }),
  columnHelper.accessor("receiveAcceptance", {
    header: "답변율",
    size: 60,
  }),
  columnHelper.accessor("refuseReason", {
    header: "거절사유",
    size: 200,
  }),
  columnHelper.display({
    header: "프로필 상세보기",
    size: 70,
    cell: ({ row }) => {
      const teacherId = row.original.teacherId;
      const subject = row.original.subject;
      const subjectParam =
        subject === "영어" ? "english" : subject === "수학" ? "math" : subject;
      const url = `/teacher/${teacherId}?subject=${subjectParam}`;

      return (
        <div className="flex cursor-default items-center space-x-2 p-4">
          <button
            className="mb-1 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              window.open(url, "_blank");
            }}
          >
            바로가기
          </button>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "finalMatch",
    header: "최종 매칭",
    size: 60,
    cell: ({ row }) => <MatchCell row={row} />,
  }),
];
