"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

import { useGetSessions } from "@/hooks/query/useGetSessions";
import { SessionResponse } from "@/actions/post-getSessions";
import SessionListCard from "@/ui/Card/SessionListCard";
import Chip from "@/ui/Chip";
import Button from "@/ui/Button";
import IconDown from "@/icons/IconDown";

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
  const [page, setPage] = useState(0);
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching } = useGetSessions(
    token,
    page,
    3,
    isComplete,
    classId,
  );

  useEffect(() => {
    if (!data) return;
    const newContent = data.schedules[classId]?.content ?? [];
    setSessions((prev) => {
      if (page === 0) return [...newContent];
      return [...prev, ...newContent];
    });
  }, [data, classId, page]);

  const items: SessionItem[] = useSessionList(sessions);

  const params = new URLSearchParams(searchParams.toString());

  const changeFilter = (next: boolean) => {
    if (next === isComplete) return;
    params.set("is-complete", String(next));
    router.push(`${pathName}?${params.toString()}`);
    setIsComplete(next);
    setPage(0);
    setSessions([]);
  };

  useEffect(() => {
    setPage(0);
    setInfiniteScroll(false);
  }, [classId, isComplete]);

  useEffect(() => {
    if (!infiniteScroll) return;
    if (!bottomRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          !isFetching &&
          !data?.schedules[classId]?.last
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    io.observe(bottomRef.current);
    return () => io.disconnect();
  }, [infiniteScroll, isFetching, data, classId]);

  const isInitialLoading =
    page === 0 && sessions.length === 0 && (isLoading || isFetching);
  const hasMore = !!data?.schedules[classId] && !data.schedules[classId].last;

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <CircularProgress />
      </div>
    );
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
      {isInitialLoading ? null : items.length === 0 ? (
        <div className="text-center text-gray-500">조회된 일정이 없습니다.</div>
      ) : (
        items.map((session, idx) => (
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
      {!isInitialLoading && items.length > 0 && !infiniteScroll && hasMore && (
        <div className="flex justify-center">
          <Button
            className="cursor-default bg-transparent py-3 text-[14px] font-semibold text-gray-700"
            disabled={isFetching || data?.schedules[classId]?.last}
            onClick={() => {
              setInfiniteScroll(true);
              setPage((prev) => prev + 1);
            }}
          >
            <span className="flex cursor-pointer items-center">
              더보기
              <IconDown className="ml-1 size-5" IconColor="#374151" />
            </span>
          </Button>
        </div>
      )}

      {infiniteScroll && <div ref={bottomRef} className="h-10" />}
    </div>
  );
}
