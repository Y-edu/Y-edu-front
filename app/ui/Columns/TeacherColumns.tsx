import { createColumnHelper } from "@tanstack/react-table";

import { FilteringTeacher } from "../../actions/get-teacher-search";

interface TeacherColumnsProps {
  // 유튜브는 현재 API에는 없으므로 단순히 아이콘만 렌더링합니다.
  handleOpenRemarkModal: (teacher: FilteringTeacher) => void;
}

const columnHelper = createColumnHelper<FilteringTeacher>();

export function getTeacherColumns({
  handleOpenRemarkModal,
}: TeacherColumnsProps) {
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
        const percentage = total > 0 ? (accept / total) * 100 : 0;
        return `${Math.floor(percentage)}%`;
      },
    }),
    columnHelper.accessor("university", { header: "학교/학과" }),
    columnHelper.accessor("districts", {
      header: "활동지역",
      cell: (props) => props.getValue().join(", ") || "-",
    }),
    columnHelper.display({
      id: "youtube",
      header: "유튜브",
      cell: () => (
        <img
          src="/images/youtube-icon.svg"
          alt="유튜브 아이콘"
          className="h-[14px] w-[20px]"
        />
      ),
    }),
    columnHelper.accessor("issue", {
      header: "비고",
      cell: ({ getValue, row }) => (
        <div className="flex items-center justify-between space-x-2">
          <span className="text-sm">{getValue() ?? "-"}</span>
          <button
            className="text-xs text-blue-500 underline"
            onClick={() => handleOpenRemarkModal(row.original)}
          >
            수정
          </button>
        </div>
      ),
    }),
  ];
}
