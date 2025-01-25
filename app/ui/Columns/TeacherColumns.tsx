/* eslint-disable */

import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { TeacherProfile } from "../../types/TeacherProfile";

interface TeacherColumnsProps {
  handleOpenYoutubeModal: (teacher: TeacherProfile) => void;
  handleOpenRemarkModal: (teacher: TeacherProfile) => void;
}

const columnHelper = createColumnHelper<TeacherProfile>();

export function getTeacherColumns({
  handleOpenYoutubeModal,
  handleOpenRemarkModal,
}: TeacherColumnsProps) {
  return [
    columnHelper.display({
      id: "select",
      header: "선택",
      cell: () => <input type="checkbox" />,
    }),
    columnHelper.accessor("nickname", {
      header: "닉네임",
    }),
    columnHelper.accessor("subject", {
      header: "과목",
      cell: (props) => props.getValue()?.join(", ") || "-",
    }),
    columnHelper.accessor("fullName", {
      header: "본명",
    }),
    columnHelper.accessor("isActive", {
      header: "활동상태",
      cell: ({ getValue }) => (getValue() ? "활동" : "비활동"),
    }),
    columnHelper.display({
      id: "acceptanceRate",
      header: "답변율",
      cell: ({ row }) => {
        const { acceptedCount, totalCount } = row.original;
        const percentage =
          totalCount > 0 ? (acceptedCount / totalCount) * 100 : 0;
        return `${Math.floor(percentage)}%`;
      },
    }),
    columnHelper.accessor("school", {
      header: "학교/학과",
    }),
    columnHelper.accessor("region", {
      header: "활동지역",
      cell: (props) => props.getValue()?.join(", ") || "-",
    }),
    // 유튜브 링크
    columnHelper.accessor("youtubeLink", {
      header: "유튜브",
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <img
            src="/images/youtube-icon.svg"
            alt="유튜브 아이콘"
            onClick={() => handleOpenYoutubeModal(teacher)}
            className="h-[14px] w-[20px] cursor-pointer"
          />
        );
      },
    }),
    // 비고(remark)
    columnHelper.accessor("remark", {
      header: "간단비고",
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm">{teacher.remark}</span>
            <button
              className="text-xs text-blue-500 underline"
              onClick={() => handleOpenRemarkModal(teacher)}
            >
              수정
            </button>
          </div>
        );
      },
    }),
  ];
}
