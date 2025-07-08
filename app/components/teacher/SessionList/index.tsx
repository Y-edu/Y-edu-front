"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

import { useGetSessions } from "@/hooks/query/useGetSessions";
import { SessionResponse } from "@/actions/post-getSessions";
import SessionListCard from "@/ui/Card/SessionListCard";
import Chip from "@/ui/Chip";
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
  const initialShow = showParam === "true";
  const [isComplete, setIsComplete] = useState(initialShow);
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isFetching } = useGetSessions(
    token,
    0,
    50,
    isComplete,
    classId,
  );

  useEffect(() => {
    if (!data) return;
    const newContent = data.schedules[classId]?.schedules?.content ?? [];
    setSessions(newContent);
  }, [data, classId]);

  const items: SessionItem[] = useSessionList(sessions);

  const params = new URLSearchParams(searchParams.toString());

  const changeFilter = (next: boolean) => {
    if (next === isComplete) return;
    params.set("is-complete", String(next));
    router.push(`${pathName}?${params.toString()}`);
    setIsComplete(next);
    setSessions([]);
  };

  const isInitialLoading = sessions.length === 0 && (isLoading || isFetching);
  const hasMore = items.length > 3 && !isExpanded;

  if (isInitialLoading) {
    return <LoadingUI className="min-h-0 py-10" />;
  }

  return (
    <div className="min-h-screen space-y-3 bg-gray-50 px-5 py-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Chip
            chipText="미완료"
            isSelected={!isComplete}
            onClick={() => changeFilter(false)}
          />
          <Chip
            chipText="완료"
            isSelected={isComplete}
            onClick={() => changeFilter(true)}
          />
        </div>
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
      </section>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">조회된 일정이 없습니다.</div>
      ) : (
        (isExpanded ? items : items.slice(0, 3)).map((session, idx) => (
          <SessionListCard
            classSessionId={session.id}
            key={session.id}
            date={session.date}
            time={session.time}
            statusLabel={session.statusLabel}
            actions={session.actions}
            showMoneyReminder={session.showMoneyReminder}
            initialOpen={idx < 3}
          />
        ))
      )}

      {hasMore && (
        <div className="flex justify-center">
          <Button
            className="cursor-default bg-transparent py-3 text-[14px] font-semibold text-gray-700"
            onClick={() => setIsExpanded(true)}
          >
            <span className="flex cursor-pointer items-center">
              더보기
              <IconDown className="ml-1 size-5" IconColor="#374151" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
