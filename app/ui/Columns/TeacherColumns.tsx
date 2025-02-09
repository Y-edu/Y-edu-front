import { createColumnHelper } from "@tanstack/react-table";

import { FilteringTeacher } from "../../actions/get-teacher-search";

interface TeacherColumnsProps {
  handleOpenModal: (teacher: FilteringTeacher, type: "video" | "issue") => void;
}

const columnHelper = createColumnHelper<FilteringTeacher>();

export function getTeacherColumns({ handleOpenModal }: TeacherColumnsProps) {
  return [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <input
          id="teacher-header-checkbox"
          type="checkbox"
          className="size-4"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          id={`cell-checkbox-${row.id}`}
          className="size-4"
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    columnHelper.accessor("nickName", { header: "닉네임" }),
    columnHelper.accessor("classTypes", {
      header: "과목",
      cell: (props) => props.getValue().join(", ") || "-",
    }),
    columnHelper.accessor("name", { header: "본명" }),
    columnHelper.accessor("status", {
      header: "활동상태",
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.display({
      id: "acceptanceRate",
      header: "답변율",
      cell: ({ row }) => {
        const { accept, total } = row.original;
        return `${accept}/${total}`;
      },
    }),
    columnHelper.accessor("university", { header: "학교/학과" }),
    columnHelper.accessor("districts", {
      header: "활동지역",
      cell: (props) => {
        const text = props.getValue().join(", ") || "-";
        return <div className="max-w-[150px] break-words">{text}</div>;
      },
    }),
    columnHelper.display({
      id: "video",
      header: "유튜브",
      cell: ({ row }) => {
        const teacher = row.original;
        const imgSrc = teacher.video
          ? "/images/youtube-red.svg"
          : "/images/youtube-icon.svg";
        return (
          <button onClick={() => handleOpenModal(teacher, "video")}>
            <img
              src={imgSrc}
              alt="유튜브 아이콘"
              className="h-[20px] w-[26px]"
            />
          </button>
        );
      },
    }),
    columnHelper.accessor("issue", {
      header: "비고",
      cell: ({ getValue, row }) => {
        const text = getValue() ?? "-";
        return (
          <div className="flex flex-col justify-between space-x-2">
            <span className="max-w-[300px] break-words text-sm">{text}</span>
            <button
              className="mt-1 self-end text-xs text-blue-500 underline"
              onClick={() => handleOpenModal(row.original, "issue")}
            >
              수정
            </button>
          </div>
        );
      },
    }),
  ];
}
