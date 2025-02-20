import { createColumnHelper } from "@tanstack/react-table";

import { ParentsListResponse } from "@/actions/get-parents-list";
import { formatMonthlyFee } from "@/utils/formatMonthlyFee";

const columnHelper = createColumnHelper<ParentsListResponse>();

export function getParentColumns(
  tableData: ParentsListResponse[],
  setTableData: React.Dispatch<React.SetStateAction<ParentsListResponse[]>>,
  onToggleStatus: (applicationFormId: string) => void,
) {
  return [
    columnHelper.accessor("kakaoName", {
      header: "카톡 이름",
      cell: (props) => props.getValue() || "-",
    }),
    columnHelper.accessor((row) => `${row.classCount} ${row.classTime}`, {
      id: "classStatus",
      header: "수업 시수",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("pay", {
      header: "월 수업료",
      cell: (info) => formatMonthlyFee(info.getValue()),
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
        const handleToggle = (e: React.MouseEvent) => {
          e.stopPropagation();
          onToggleStatus(row.original.applicationFormId);
        };
        return (
          <div
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            className="flex cursor-default items-center space-x-2 p-[14px]"
          >
            <button
              className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full ${
                row.original.status ? "bg-blue-500" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={row.original.status}
              onClick={handleToggle}
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
