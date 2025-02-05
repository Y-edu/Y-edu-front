"use client";

import { useState, useEffect } from "react";

import { FilteringTeacher } from "../actions/get-teacher-search";
import { usePatchTeacherIssue } from "../hooks/mutation/usePatchTeacherIssue";

import { Modal } from "./Modal";

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

  const handleOnConfirm = () => {
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
      },
    );
  };

  const handleOnCancel = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleOnConfirm();
    }
  };

  const messageNode = (
    <textarea
      className="h-24 w-full resize-none rounded border px-2 py-1 text-sm"
      value={issueText}
      onChange={(e) => setIssueText(e.target.value)}
      placeholder="비고를 입력하세요 (50자 이내)"
      maxLength={50}
      onKeyDown={handleKeyDown}
    />
  );

  return (
    <Modal
      title="선생님 비고 수정"
      message={messageNode}
      confirmText="저장"
      cancelText="취소"
      handleOnConfirm={handleOnConfirm}
      handleOnCancel={handleOnCancel}
      isOpen={isOpen}
    />
  );
}
