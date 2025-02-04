/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { createColumnHelper } from "@tanstack/react-table";

import { ParentsListResponse } from "../../actions/get-parents-list";

const columnHelper = createColumnHelper<ParentsListResponse>();

export function getParentColumns(
  tableData: ParentsListResponse[],
  setTableData: React.Dispatch<React.SetStateAction<ParentsListResponse[]>>,
) {
  return [
    columnHelper.accessor("kakaoName", {
      header: "카톡 이름",
      cell: (props) => props.getValue() || "-",
    }),
    columnHelper.accessor((row) => `${row.classCount}/${row.classTime}`, {
      id: "classStatus",
      header: "수업 시수",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("wantedSubject", {
      header: "원하는 과목",
    }),
    columnHelper.accessor("source", {
      header: "유입경로",
    }),
    columnHelper.accessor("createdAt", {
      header: "신청일",
      cell: (props) => new Date(props.getValue()).toLocaleString(),
    }),
    // 수락 상태: accept/total
    columnHelper.accessor((row) => `${row.accept}/${row.total}`, {
      id: "acceptStatus",
      header: "수락 상태",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "전화번호",
    }),
    // 처리 상태 (status)를 토글하는 버튼
    columnHelper.accessor("status", {
      header: "처리 상태",
      cell: ({ row }) => {
        const toggleStatus = (e: React.MouseEvent) => {
          e.stopPropagation();
          setTableData((prevData) =>
            prevData.map((item) =>
              item.applicationFormId === row.original.applicationFormId
                ? { ...item, status: !item.status }
                : item,
            ),
          );
        };

        return (
          <div className="flex items-center space-x-2">
            <button
              className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full ${
                row.original.status ? "bg-blue-500" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={row.original.status}
              onClick={toggleStatus}
            >
              <span
                className={`absolute size-5 rounded-full bg-white shadow-md transition-transform ${
                  row.original.status ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );
      },
    }),
  ];
}
