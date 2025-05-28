import { createColumnHelper } from "@tanstack/react-table";
import { useRef, useState } from "react";

import { ClassListResponse, ClassStatus } from "@/actions/get-class-info";

const columnHelper = createColumnHelper<ClassListResponse>();

const statusOptions: ClassStatus[] = ["수업중", "중단", "임시중단"];

const statusColors = {
  수업중: "bg-green-100 text-green-800",
  중단: "bg-red-100 text-red-800",
  임시중단: "bg-yellow-100 text-yellow-800",
} as const;

// 과외 상태 칩
function StatusCell({
  status,
  rowIndex,
  onStatusChange,
}: {
  status: ClassStatus;
  rowIndex: number;
  onStatusChange: (rowIndex: number, newStatus: ClassStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (newStatus: ClassStatus) => {
    onStatusChange(rowIndex, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          statusColors[status]
        }`}
      >
        {status}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full z-50 mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(option);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                option === status ? "bg-gray-50" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function getClassColumns(
  onStatusChange: (rowIndex: number, newStatus: ClassStatus) => void,
) {
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
        <StatusCell
          status={props.getValue()}
          rowIndex={props.row.index}
          onStatusChange={onStatusChange}
        />
      ),
    }),
    columnHelper.accessor("kakaoName", {
      header: "카카오톡 이름",
      cell: (props) => props.getValue() || "-",
    }),
  ];
}
