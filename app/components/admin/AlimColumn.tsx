/**
 * AlimTHeader는 알림톡 발송 내역 테이블의 필드 값을 보여줍니다.
 */

import { createColumnHelper } from "@tanstack/react-table";
import type { Table, Row } from "@tanstack/react-table";

import { AcceptanceSchema } from "@/actions/get-acceptance";

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
    size: 50,
  },
  columnHelper.accessor("status", {
    header: "상태",
    size: 80,
    cell: ({ row }) => {
      const rowStatus = row.original.status;
      switch (rowStatus) {
        case "수락":
          return <span className="text-primary">수락</span>;
        case "전송":
          return <span className="text-[#1DAD5D]">전송</span>;
        case "대기":
          return <span className="text-[#C6AA39]">대기</span>;
        case "거절":
          return <span className="text-[#C00D0D]">거절</span>;
      }
    },
  }),
  columnHelper.accessor("nickName", {
    header: "영어이름",
    size: 150,
  }),
  columnHelper.accessor("name", {
    header: "본명",
    size: 80,
  }),
  columnHelper.accessor("receiveAcceptance", {
    header: "답변율",
    size: 80,
  }),
  columnHelper.accessor("refuseReason", {
    header: "거절사유",
    size: 150,
  }),
];
