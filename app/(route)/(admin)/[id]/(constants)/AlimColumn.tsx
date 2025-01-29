/**
 * AlimTHeader는 알림톡 발송 내역 테이블의 필드 값을 보여줍니다.
 */

import { createColumnHelper } from "@tanstack/react-table";
import type { Table, Row } from "@tanstack/react-table";

import type { AcceptanceSchema } from "../../../../actions/get-acceptance";

const columnHelper = createColumnHelper<AcceptanceSchema["data"]["0"]>();

export const AlimTHeaderColumn = [
  {
    id: "select",
    header: ({ table }: { table: Table<AcceptanceSchema["data"]["0"]> }) => (
      <input
        id="header-checkbox"
        type="checkbox"
        className="size-4"
        checked={table.getIsAllPageRowsSelected()} // 전체 row가 선택되었는지 확인
        onChange={table.getToggleAllPageRowsSelectedHandler()} // 전체 row를 선택/해제하는 handler
      />
    ),
    cell: ({ row }: { row: Row<AcceptanceSchema["data"]["0"]> }) => (
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
        case "ACCEPTED":
          return <span className="text-primary">수락</span>;
        case "SENDED":
          return <span className="text-[#1DAD5D]">전송</span>;
        case "PENDING":
          return <span className="text-[#C6AA39]">대기</span>;
        case "REJECTED":
          return <span className="text-[#C00D0D]">거절</span>;
      }
    },
  }),
  columnHelper.accessor("nickname", {
    header: "영어이름",
    size: 150,
  }),
  columnHelper.accessor("name", {
    header: "본명",
    size: 80,
  }),
  columnHelper.accessor("lastUpdated", {
    header: "답변까지_시간",
    size: 120,
  }),
  columnHelper.accessor("receiveAcceptance", {
    header: "수락율",
    size: 80,
  }),
  columnHelper.accessor("rejectReason", {
    header: "거절사유",
    size: 150,
  }),
];
