import { createColumnHelper } from "@tanstack/react-table";
import { useRef, useState, useEffect } from "react";

import {
  Class,
  ClassStatus,
  usePutClassStatus,
} from "@/hooks/query/useGetClassList";

const columnHelper = createColumnHelper<Class>();

const statusDisplayMap: Record<ClassStatus, string> = {
  최종매칭: "수업중",
  중단: "중단",
  일시중단: "일시중단",
};

const statusColors = {
  최종매칭: "bg-green-100 text-green-800",
  중단: "bg-red-100 text-red-800",
  일시중단: "bg-yellow-100 text-yellow-800",
} as const;

// 과외 상태 칩
function StatusCell({
  status,
  matchingId,
  rowIndex,
  onStatusChange,
}: {
  status: ClassStatus;
  matchingId: number;
  rowIndex: number;
  onStatusChange: (rowIndex: number, newStatus: ClassStatus) => void;
}) {
  const { mutate: mutateClassStatus } = usePutClassStatus();

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleStatusChange = (newStatus: ClassStatus) => {
    onStatusChange(rowIndex, newStatus);
    mutateClassStatus({
      variables: {
        matchingIds: [matchingId],
        matchingStatus: newStatus,
      },
    });
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
        {statusDisplayMap[status]}
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
          {(Object.keys(statusDisplayMap) as ClassStatus[]).map((option) => (
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
              {statusDisplayMap[option]}
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
    columnHelper.accessor("parent.kakaoName", {
      header: "카톡 이름",
      cell: (props) => props.getValue() || "-",
    }),
    columnHelper.display({
      id: "schedule",
      header: "수업시수",
      cell: (props) => {
        const scheduleList = props.row.original.classManagement.schedule;

        if (!scheduleList?.length) return "-";

        return (
          <div className="flex flex-col gap-1">
            주 {scheduleList.length}회{" "}
            {scheduleList.reduce((acc, item) => acc + item.classMinute, 0)}분
          </div>
        );
      },
    }),
    columnHelper.accessor("applicationFormId", {
      header: "수업코드",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("subject", {
      header: "과목",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("teacher.nickName", {
      header: "선생님 닉네임",
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
    columnHelper.accessor("matchingStatus", {
      header: "과외 상태",
      cell: (props) => (
        <StatusCell
          status={props.getValue()}
          rowIndex={props.row.index}
          onStatusChange={onStatusChange}
          matchingId={props.row.original.matchingId}
        />
      ),
    }),
  ];
}
