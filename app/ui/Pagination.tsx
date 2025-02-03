interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
  onPrevious,
  onNext,
}: PaginationProps) {
  const pageButton =
    "rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      {/* 이전 버튼 */}
      <button
        onClick={onPrevious}
        disabled={!canPreviousPage}
        className={pageButton}
      >
        {"<"}
      </button>

      {/* 현재 페이지 상태 */}
      <span className="text-sm font-medium text-gray-700">
        <strong>{pageIndex + 1}</strong> / <strong>{pageCount}</strong>
      </span>

      {/* 다음 버튼 */}
      <button onClick={onNext} disabled={!canNextPage} className={pageButton}>
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
