import { createColumnHelper } from "@tanstack/react-table";

import { FilteringTeacher } from "@/actions/get-teacher-search";

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
      cell: ({ row, getValue }) => {
        const teacher = row.original;
        const subjects = getValue();
        return (
          <div className="flex flex-col">
            {subjects.map((subject) => {
              const subjectParam = subject === "수학" ? "math" : "english";
              return (
                <button
                  key={subject}
                  className="mb-1 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                  onClick={() =>
                    window.open(
                      `/teacher/${teacher.teacherId}?subject=${subjectParam}`,
                      "_blank",
                    )
                  }
                >
                  {subject}
                </button>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("name", { header: "본명" }),
    columnHelper.accessor("phoneNumber", {
      header: "전화번호",
    }),
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
    columnHelper.accessor(
      (row) => ({ university: row.university, major: row.major }),
      {
        header: "학교/학과",
        cell: (info) => {
          const { university, major } = info.getValue();
          return (
            <div className="max-w-[120px] break-words">
              {university}&nbsp;
              {major}
            </div>
          );
        },
      },
    ),
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
          <div className="flex w-[240px] flex-col justify-between space-x-2">
            <span className="max-w-[300px] break-words text-sm">{text}</span>
            <button
              className="mt-1 inline-flex items-center justify-center self-end rounded border border-blue-500 px-2 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50 focus:outline-none"
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
