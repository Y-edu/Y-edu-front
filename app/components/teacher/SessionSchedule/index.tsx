"use client";
import { useState } from "react";

import ClassScheduleCard from "@/ui/Card/ClassScheduleCard";
import { SessionResponse } from "@/actions/post-getSessions";
import Chip from "@/ui/Chip";

import { useSessionSchedule, SessionItem } from "./useSessionSchedule";

interface SessionScheduleProps {
  sessions: SessionResponse[];
}

export default function SessionSchedule({ sessions }: SessionScheduleProps) {
  const items: SessionItem[] = useSessionSchedule(sessions);
  const [showCompleted, setShowCompleted] = useState(false);
  const filtered = items.filter((item) => item.complete === showCompleted);

  return (
    <div className="space-y-4 bg-gray-50 p-4">
      <div className="mb-4 flex gap-2">
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
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">조회된 일정이 없습니다.</div>
      ) : (
        filtered.map((session) => (
          <ClassScheduleCard
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
