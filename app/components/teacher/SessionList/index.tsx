"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import SessionListCard from "@/ui/Card/SessionListCard";
import { SessionResponse } from "@/actions/post-getSessions";
import Chip from "@/ui/Chip";
import Button from "@/ui/Button";

import { useSessionList, SessionItem } from "./useSessionList";

import Calender from "public/images/calendar.svg";

interface SessionListProps {
  sessions: SessionResponse[];
}

export default function SessionList({ sessions }: SessionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const items: SessionItem[] = useSessionList(sessions);
  const [showCompleted, setShowCompleted] = useState(false);
  const filtered = items.filter((item) => item.complete === showCompleted);

  return (
    <div className="space-y-4 bg-gray-50 p-4">
      <section className="flex items-center justify-between">
        <div className="flex gap-2">
          <Chip
            chipText="미완료"
            isSelected={!showCompleted}
            onClick={() => setShowCompleted(false)}
          />
          <Chip
            chipText="완료"
            isSelected={showCompleted}
            onClick={() => setShowCompleted(true)}
          />
        </div>
        <Button
          leftIcon={
            <Image src={Calender} width={20} height={20} alt="calender" />
          }
          className="text-grey-700 w-fit cursor-pointer justify-normal gap-1 bg-transparent px-3 py-[6px] text-sm"
          onClick={() => router.push(`/teacher/session-change?token=${token}`)}
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
