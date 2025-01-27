/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { createColumnHelper } from "@tanstack/react-table";

import { ParentsList } from "../../types/ParentsList";

const columnHelper = createColumnHelper<ParentsList>();

export function getParentColumns(
  tableData: ParentsList[],
  setTableData: React.Dispatch<React.SetStateAction<ParentsList[]>>,
) {
  return [
    columnHelper.accessor("kakaoName", {
      header: "카톡 이름",
    }),
    columnHelper.accessor("classTime", {
      header: "수업 시수",
    }),
    columnHelper.accessor("monthlyFee", {
      header: "월 수업료",
    }),
    columnHelper.accessor("subject", {
      header: "과목",
      cell: (props) => props.getValue()?.join(", ") || "-",
    }),
    columnHelper.accessor("source", {
      header: "유입경로",
    }),
    columnHelper.accessor("submittedAt", {
      header: "접수시간",
    }),
    columnHelper.accessor("acceptCount", {
      header: "수락 상태",
      cell: ({ row }) => {
        const { acceptCount, alertCount } = row.original;
        return (
          <span>
            {alertCount > 0 ? `${acceptCount}/${alertCount}` : "null"}
          </span>
        );
      },
    }),
    columnHelper.accessor("phoneNumber", {
      header: "전화번호",
    }),
    // 처리상태(isDone)
    columnHelper.accessor("isDone", {
      header: "처리 상태",
      cell: ({ row }) => {
        const toggleStatus = () => {
          setTableData((prevData) =>
            prevData.map((item) =>
              item.id === row.original.id
                ? { ...item, isDone: !item.isDone }
                : item,
            ),
          );
        };

        return (
          <div className="flex items-center space-x-2">
            <div
              className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full ${
                row.original.isDone ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={toggleStatus}
            >
              <span
                className={`absolute size-5 rounded-full bg-white shadow-md transition-transform ${
                  row.original.isDone ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>
        );
      },
    }),
  ];
}
