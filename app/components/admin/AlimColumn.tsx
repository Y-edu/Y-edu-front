import { createColumnHelper } from "@tanstack/react-table";
import type { Table, Row } from "@tanstack/react-table";

import { AcceptanceSchema } from "@/actions/get-acceptance";

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
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
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
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
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
        case "수락":
          return <span className="text-primary">수락</span>;
        case "전송":
          return <span className="text-[#1DAD5D]">전송</span>;
        case "대기":
          return <span className="text-[#C6AA39]">대기</span>;
        case "거절":
          return <span className="text-[#C00D0D]">거절</span>;
        case "매칭":
          return <span className="text-blue-600">매칭</span>;
        default:
          return <span>{rowStatus}</span>;
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
        <div className="flex w-[100px] cursor-default items-center space-x-2 p-4">
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
