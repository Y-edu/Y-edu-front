"use client";

import { useState } from "react";

interface ClassProgressRecordsProps {
  recentRecords: string[];
  pastRecords: string[];
}

export default function ClassProgressRecords({
  recentRecords,
  pastRecords,
}: ClassProgressRecordsProps) {
  const [copiedBox, setCopiedBox] = useState<"recent" | "past" | null>(null);

  const handleCopy = async (records: string[], type: "recent" | "past") => {
    try {
      const text = records.join("\n");
      await navigator.clipboard.writeText(text);
      setCopiedBox(type);
      setTimeout(() => setCopiedBox(null), 2000);
    } catch (err) {
      alert(`복사 실패. 다시 시도해주세요. : ${err as string}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 최근 4주 기록 */}
      <div className="relative rounded-xl border bg-gray-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-primary">최근 4주 진행 기록</h3>
          <button
            onClick={() => handleCopy(recentRecords, "recent")}
            className="rounded bg-primary px-2 py-1 text-xs text-white hover:bg-primary/80"
          >
            {copiedBox === "recent" ? "복사됨!" : "복사하기"}
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          {recentRecords.map((record, idx) => (
            <li key={idx}>{record}</li>
          ))}
        </ul>
      </div>

      {/* 이전 4주 기록 */}
      <div className="relative rounded-xl border bg-gray-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-primary">이전 4주 진행 기록</h3>
          <button
            onClick={() => handleCopy(pastRecords, "past")}
            className="rounded bg-primary px-2 py-1 text-xs text-white hover:bg-primary/80"
          >
            {copiedBox === "past" ? "복사됨!" : "복사하기"}
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          {pastRecords.map((record, idx) => (
            <li key={idx}>{record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
