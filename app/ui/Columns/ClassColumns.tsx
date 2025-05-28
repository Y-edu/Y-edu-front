import { createColumnHelper } from "@tanstack/react-table";

import { ClassListResponse } from "@/actions/get-class-info";

const columnHelper = createColumnHelper<ClassListResponse>();

export function getClassColumns() {
  const statusColors = {
    수업중: "text-cyan-500",
    중단: "text-red-500",
    임시중단: "text-yellow-500",
  } as const;

  return [
    columnHelper.accessor("applicationFormId", {
      header: "수업코드",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("nickName", {
      header: "선생님 닉네임",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("subject", {
      header: "과목",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "과외 상태",
      cell: (props) => (
        <span className={statusColors[props.getValue()]}>
          {props.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("kakaoName", {
      header: "카카오톡 이름",
      cell: (props) => props.getValue() || "-",
    }),
  ];
}
