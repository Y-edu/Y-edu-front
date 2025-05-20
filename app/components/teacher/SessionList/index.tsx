"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

import SessionListCard from "@/ui/Card/SessionListCard";
import { SessionResponse } from "@/actions/post-getSessions";
import Chip from "@/ui/Chip";
import Button from "@/ui/Button";

import { useSessionList, SessionItem } from "./useSessionList";

import Calender from "public/images/calendar.svg";

interface SessionListProps {
  classId: string;
  sessions: SessionResponse[];
}

export default function SessionList({ classId, sessions }: SessionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const showParam = searchParams.get("showCompleted");
  const initialShow = showParam === "true";
  const items: SessionItem[] = useSessionList(sessions);
  const [showCompleted, setShowCompleted] = useState(initialShow);
  const filtered = items.filter((item) => item.complete === showCompleted);

  const params = new URLSearchParams(searchParams.toString());

  const changeFilter = (next: boolean) => {
    params.set("showCompleted", String(next));
    router.push(`${pathName}?${params.toString()}`);
    setShowCompleted(next);
  };

  return (
    <div className="min-h-screen space-y-3 bg-gray-50 p-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Chip
            chipText="미완료"
            isSelected={!showCompleted}
            onClick={() => changeFilter(false)}
          />
          <Chip
            chipText="완료"
            isSelected={showCompleted}
            onClick={() => changeFilter(true)}
          />
        </div>
        <Button
          leftIcon={
            <Image src={Calender} width={20} height={20} alt="calender" />
          }
          className="text-grey-700 w-fit cursor-pointer justify-normal gap-1 bg-transparent px-3 py-[6px] text-sm"
          onClick={() => {
            params.set("classid", classId);
            router.push(`/teacher/session-change?${params.toString()}`);
          }}
        >
          전체 일정 변경
        </Button>
      </section>
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">조회된 일정이 없습니다.</div>
      ) : (
        filtered.map((session) => (
          <SessionListCard
            classSessionId={session.id}
            key={session.id}
            date={session.date}
            time={session.time}
            statusLabel={session.statusLabel}
            actions={session.actions}
            showMoneyReminder={session.showMoneyReminder}
          />
        ))
      )}
    </div>
  );
}
