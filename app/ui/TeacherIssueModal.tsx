"use client";

import { useState, useEffect } from "react";

import { FilteringTeacher } from "../actions/get-teacher-search";
import { usePatchTeacherIssue } from "../hooks/mutation/usePatchTeacherIssue";

interface TeacherIssueModalProps {
  isOpen: boolean;
  teacher: FilteringTeacher | null;
  onClose: () => void;
}

export function TeacherIssueModal({
  isOpen,
  teacher,
  onClose,
}: TeacherIssueModalProps) {
  const [issueText, setIssueText] = useState("");
  const patchIssueMutation = usePatchTeacherIssue();

  useEffect(() => {
    if (teacher?.issue) {
      setIssueText(teacher.issue);
    } else {
      setIssueText("");
    }
  }, [teacher]);

  const handleSaveIssue = () => {
    if (!teacher) return;

    patchIssueMutation.mutate(
      {
        teacherId: teacher.teacherId,
        issue: issueText,
      },
      {
        onSuccess: () => {
          alert("비고 수정이 완료되었습니다.");
          onClose();
        },
        onError: (error) => {
          alert("에러가 발생했습니다: " + error.message);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="rounded-xl bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">선생님 비고 수정</h2>

        <textarea
          className="h-24 w-64 resize-none rounded border p-2"
          value={issueText}
          onChange={(e) => setIssueText(e.target.value)}
          placeholder="비고를 입력하세요"
        />

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSaveIssue}
          >
            저장
          </button>
          <button
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
