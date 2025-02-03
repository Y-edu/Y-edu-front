"use client";
export default function AdminAlimErrors() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded bg-red-500 p-4 text-white shadow-md" role="alert">
        <strong className="font-bold">오류 발생!</strong>
        <span className="block sm:inline">
          문제가 발생했습니다. 나중에 다시 시도해 주세요.
        </span>
      </div>
    </div>
  );
}
