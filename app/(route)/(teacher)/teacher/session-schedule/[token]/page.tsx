"use client";

import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionSchedule from "@/components/teacher/SessionSchedule";
import type { SessionsResponse } from "@/actions/post-getSessions";
import TabBar from "@/ui/Bar/TabBar";

// 1) 더미 스케줄 데이터
const MOCK_DATA: SessionsResponse = {
  schedules: {
    온라인11a: [
      {
        classSessionId: 1,
        cancel: true,
        cancelReason: "학생 사정",
        complete: false,
        understanding: null,
        homeworkPercentage: null,
        classDate: "2025-05-09",
        classStart: "10:00:00",
      },
      {
        classSessionId: 2,
        cancel: false,
        cancelReason: null,
        complete: true,
        understanding: "잘따라옴",
        homeworkPercentage: 90,
        classDate: "2025-05-10",
        classStart: "14:00:00",
      },
      {
        classSessionId: 3,
        cancel: false,
        cancelReason: null,
        complete: false,
        understanding: null,
        homeworkPercentage: null,
        classDate: "2025-05-11",
        classStart: "14:00:00",
      },
      {
        classSessionId: 4,
        cancel: false,
        cancelReason: null,
        complete: false,
        understanding: null,
        homeworkPercentage: null,
        classDate: "2025-05-12",
        classStart: "14:00:00",
      },
      {
        classSessionId: 5,
        cancel: false,
        cancelReason: null,
        complete: false,
        understanding: null,
        homeworkPercentage: null,
        classDate: "2025-05-24",
        classStart: "14:00:00",
      },
    ],
    서초구55b: [
      {
        classSessionId: 6,
        cancel: false,
        cancelReason: null,
        complete: true,
        understanding: "훌륭해요",
        homeworkPercentage: 100,
        classDate: "2025-05-27",
        classStart: "16:00:00",
      },
    ],
  },
};

export default function TeacherSessionSchedulePage() {
  const tabs = Object.entries(MOCK_DATA.schedules).map(
    ([classId, sessions]) => ({
      trigger: classId,
      content: <SessionSchedule sessions={sessions} />,
    }),
  );

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <HeaderWithBack title="과외 일정 (TEST)" className="border-none">
        <TabBar tabs={tabs} />
      </HeaderWithBack>
    </ErrorBoundary>
  );
}
