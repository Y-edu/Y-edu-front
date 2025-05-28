import { createColumnHelper } from "@tanstack/react-table";

import { ClassListResponse } from "@/actions/get-class-info";

const columnHelper = createColumnHelper<ClassListResponse>();

export function getClassColumns() {
  return [
    columnHelper.accessor("applicationFormId", {
      header: "신청서 ID",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("nickName", {
      header: "선생님",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("subject", {
      header: "과목",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "과외 상태",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("kakaoName", {
      header: "학부모",
      cell: (props) => props.getValue() || "-",
    }),
  ];
}
