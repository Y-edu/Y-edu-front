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
    columnHelper.accessor("applicationFormId", {
      header: "수업코드",
      cell: (props) => props.getValue() || "-",
    }),
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
    columnHelper.accessor("scheduledClasses", {
      header: "확정 수업 정보",
      cell: ({ getValue }) => {
        const classes = getValue();
        if (!classes || classes.length === 0) return "-";
        return (
          <div className="flex flex-col space-y-1">
            {classes.map((cls, idx) => {
              const hour = cls.startTime.split(":")[0];
              return (
                <div key={idx}>
                  {cls.day} {parseInt(hour, 10)}시부터 ({cls.classTime}분)
                </div>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("wantedSubject", {
      header: "과목",
    }),
    columnHelper.accessor("createdAt", {
      header: "신청일",
      cell: (props) => {
        const date = new Date(props.getValue());
        return date.toLocaleString("ko-KR", {
          year: undefined,
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: undefined,
          hour12: true,
        });
      },
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
