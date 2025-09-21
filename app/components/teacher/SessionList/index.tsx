"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

import { useGetSessions } from "@/hooks/query/useGetSessions";
import { SessionResponse } from "@/actions/post-getSessions";
import SessionListCard from "@/ui/Card/SessionListCard";
import Select from "@/ui/Select";
import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";
import LoadingUI from "@/ui/LoadingUI";

import { useSessionList, SessionItem } from "./useSessionList";

import Calender from "public/images/calendar.svg";

interface SessionListProps {
  classId: string;
}

export default function SessionList({ classId }: SessionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const token = searchParams.get("token") ?? "";
  const showParam = searchParams.get("is-complete");
  const [isComplete, setIsComplete] = useState(showParam === "true");
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isFetching } = useGetSessions(
    token,
    0,
    50,
    isComplete,
    classId,
  );
  const { data: completedData } = useGetSessions(token, 0, 50, true, classId);

  // URL 파라미터 변화에 따른 isComplete 상태 동기화
  useEffect(() => {
    const urlIsComplete = searchParams.get("is-complete") === "true";
    if (urlIsComplete !== isComplete) {
      setIsComplete(urlIsComplete);
    }
  }, [searchParams, isComplete]);

  useEffect(() => {
    if (!data) return;
    const newContent = data.schedules[classId]?.schedules?.content ?? [];
    setSessions(newContent);
  }, [data, classId]);

  const items: SessionItem[] = useSessionList(sessions);
  const params = new URLSearchParams(searchParams.toString());

  const isPaused = data?.matchingStatuses?.[classId] === "일시중단";

  const allRounds =
    completedData?.schedules[classId]?.schedules?.content
      ?.map((s) => s.currentRound)
      .filter((r): r is number => typeof r === "number") ?? [];

  const lastCurrentRound = allRounds.length > 0 ? Math.max(...allRounds) : null;

  const changeFilter = (next: boolean) => {
    if (next === isComplete) return;
    params.set("is-complete", String(next));
    router.push(`${pathName}?${params.toString()}`);
    setIsComplete(next);
    setSessions([]);
  };

  const handleFilterChange = (value: string) => {
    const next = value === "completed";
    changeFilter(next);
  };

  const filterOptions = [
    { value: "scheduled", label: "예정된 수업" },
    { value: "completed", label: "완료된 수업" },
  ];

  const currentFilterValue = isComplete ? "completed" : "scheduled";

  const isInitialLoading = sessions.length === 0 && (isLoading || isFetching);
  const hasMore = items.length > 3 && !isExpanded;

  if (isInitialLoading) {
    return <LoadingUI className="min-h-0 py-10" />;
  }

  return (
    <div className="min-h-screen space-y-3 bg-gray-50 px-5 py-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Select
            options={filterOptions}
            value={currentFilterValue}
            onChange={handleFilterChange}
            className="w-32"
          />
        </div>
        {!isPaused && (
          <Button
            leftIcon={
              <Image src={Calender} width={20} height={20} alt="calender" />
            }
            className="text-grey-700 w-fit cursor-pointer justify-normal gap-1 bg-transparent px-3 py-[6px] text-sm"
            onClick={() => {
              params.set("classId", classId);
              router.push(`/teacher/session-change?${params.toString()}`);
            }}
          >
            정규 일정 변경
          </Button>
        )}
      </section>

      {items.length === 0 && (!isPaused || isComplete) ? (
        <div className="text-center text-gray-500">조회된 일정이 없습니다.</div>
      ) : (
        <>
          {(isExpanded ? items : items.slice(0, 3)).map((session, idx) => {
            const currentMonth = session.date.getMonth();
            const prevMonth =
              idx > 0
                ? (isExpanded ? items : items.slice(0, 3))[
                    idx - 1
                  ].date.getMonth()
                : null;

            const showDivider = idx > 0 && currentMonth !== prevMonth;

            return (
              <div key={session.id}>
                {showDivider && (
                  <div className="my-5 border-t border-dashed border-gray-300" />
                )}
                <SessionListCard
                  classSessionId={session.id}
                  date={session.date}
                  time={session.time}
                  classMinute={session.classMinute}
                  statusLabel={session.statusLabel}
                  actions={session.actions}
                  showMoneyReminder={session.showMoneyReminder}
                  initialOpen={idx < 3}
                  currentRound={session.currentRound}
                  maxRound={session.maxRound}
                  cancel={session.cancel}
                />
              </div>
            );
          })}

          {!isComplete && isPaused && (
            <div className="flex justify-center p-5 text-center text-sm leading-[21px] text-grey-400">
              {lastCurrentRound
                ? `${lastCurrentRound}회차까지 완료 후 수업이 일시정지됐어요.`
                : "수업이 일시정지됐어요."}
              <br />
              수업 재개는 Y-Edu에 문의해 주세요.
            </div>
          )}
        </>
      )}

      {hasMore && !isPaused && (
        <div className="flex justify-center">
          <Button
            className="cursor-default bg-transparent py-3 text-[14px] font-semibold text-gray-700"
            onClick={() => setIsExpanded(true)}
          >
            <span className="flex cursor-pointer items-center text-base">
              더보기
              <IconDown className="ml-1 size-5" IconColor="#374151" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
