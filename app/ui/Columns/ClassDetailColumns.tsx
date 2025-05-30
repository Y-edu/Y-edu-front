import { createColumnHelper } from "@tanstack/react-table";

import { ClassDetail } from "@/hooks/query/useGetClassList";

const columnHelper = createColumnHelper<ClassDetail>();

export function getClassDetailColumns() {
  return [
    columnHelper.accessor("classManagement.firstDay", {
      header: "수업시작일",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("parent.phoneNumber", {
      header: "학부모 전화번호",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("teacher.phoneNumber", {
      header: "선생님 전화번호",
      cell: (props) => props.getValue(),
    }),
    columnHelper.display({
      id: "schedule",
      header: "수업시간",
      cell: (props) => {
        const scheduleList = props.row.original.classManagement.schedule;

        if (!scheduleList?.length) return "X";

        return (
          <div className="flex flex-col gap-1">
            {scheduleList.map((item) => (
              <span key={item.classScheduleId}>
                {item.day} {item.start} ({item.classMinute}분)
              </span>
            ))}
          </div>
        );
      },
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
