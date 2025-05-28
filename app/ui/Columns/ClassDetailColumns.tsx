import { createColumnHelper } from "@tanstack/react-table";

import { ClassAdditionalInfo } from "@/actions/get-class-info";

const columnHelper = createColumnHelper<ClassAdditionalInfo>();

export function getClassDetailColumns() {
  return [
    columnHelper.accessor("startDate", {
      header: "수업시작일",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("parentPhoneNumber", {
      header: "학부모 전화번호",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("teacherPhoneNumber", {
      header: "선생님 전화번호",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("classTime", {
      header: "수업시간",
      cell: (props) => props.getValue(),
    }),
    columnHelper.display({
      id: "changeTeacher",
      header: "선생님 교체",
      cell: () => (
        <button
          onClick={() => {
            // TODO: 선생님 교체 로직
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          교체하기
        </button>
      ),
    }),
  ];
}
