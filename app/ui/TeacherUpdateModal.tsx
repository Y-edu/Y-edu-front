"use client";

import { useState, useEffect } from "react";

import { FilteringTeacher } from "../actions/get-teacher-search";
import { usePatchTeacherVideo } from "../hooks/mutation/usePatchTeacherVideo";
import { usePatchTeacherIssue } from "../hooks/mutation/usePatchTeacherIssue";

import { Modal } from "./Modal";

interface TeacherUpdateModalProps {
  isOpen: boolean;
  teacher: FilteringTeacher | null;
  onClose: () => void;
  type: "video" | "issue";
}

export function TeacherUpdateModal({
  isOpen,
  teacher,
  onClose,
  type,
}: TeacherUpdateModalProps) {
  const [text, setText] = useState("");

  const patchVideoMutation = usePatchTeacherVideo();
  const patchIssueMutation = usePatchTeacherIssue();

  useEffect(() => {
    if (teacher) {
      setText(type === "video" ? teacher.video || "" : teacher.issue || "");
    } else {
      setText("");
    }
  }, [teacher, type]);

  const handleOnConfirm = () => {
    if (!teacher) return;

    if (type === "video") {
      patchVideoMutation.mutate(
        { teacherId: teacher.teacherId, video: text },
        {
          onSuccess: () => {
            alert("유튜브 링크 수정이 완료되었습니다.");
            onClose();
          },
        },
      );
    } else {
      patchIssueMutation.mutate(
        { teacherId: teacher.teacherId, issue: text },
        {
          onSuccess: () => {
            alert("비고 수정이 완료되었습니다.");
            onClose();
          },
        },
      );
    }
  };

  const handleOnCancel = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleOnConfirm();
    }
  };

  const messageNode =
    type === "video" ? (
      <input
        className="w-full resize-none rounded border px-2 py-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="유튜브 링크를 입력하세요"
        maxLength={100}
        onKeyDown={handleKeyDown}
      />
    ) : (
      <textarea
        className="h-24 w-full resize-none rounded border px-2 py-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="비고를 입력하세요 (50자 이내)"
        maxLength={50}
        onKeyDown={handleKeyDown}
      />
    );

  return (
    <Modal
      title={type === "video" ? "유튜브 링크 수정" : "선생님 비고 수정"}
      message={messageNode}
      confirmText="저장"
      cancelText="취소"
      handleOnConfirm={handleOnConfirm}
      handleOnCancel={handleOnCancel}
      isOpen={isOpen}
    />
  );
}
