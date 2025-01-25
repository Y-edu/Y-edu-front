"use client";
/**
 * AlimHeader는 알림톡 총 발생 건, 응답 건과 처음 발송 후 얼만큼의 시간이 지났는지를 보여주는 컴포넌트입니다.
 */

import { useGetAcceptance } from "../../../hooks/query";

interface AlimHeaderProps {
  matchingId: number;
}

export function AlimHeader({ matchingId }: AlimHeaderProps) {
  const { data: alimData } = useGetAcceptance(matchingId);
  const successedAlimDataLength = alimData.data.filter(
    (v) => v.status === "ACCEPTED",
  ).length;

  return (
    <header className="mt-2 p-4">
      <h1 className="text-lg font-bold text-headColor" aria-live="polite">
        알림톡 발송
        <span
          className="ml-4"
          aria-label={`성공한 알림톡: ${successedAlimDataLength} / ${alimData.data.length}`}
        >
          {`(${successedAlimDataLength} / ${alimData.data.length})`}
        </span>
        <time
          className="tex-sm ml-8 font-medium"
          dateTime={new Date(alimData.lastUpdated).toISOString()}
        >
          {new Date(alimData.lastUpdated).toLocaleDateString()}
        </time>
      </h1>
    </header>
  );
}
