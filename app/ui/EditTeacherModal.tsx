import React, { ChangeEvent } from "react";

import { Modal } from "./Modal";

interface EditTeacherFieldModalProps {
  isOpen: boolean;
  value: string;
  setValue: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  title: string;
  maxLength?: number;
  placeholder?: string;
  isTextarea?: boolean;
}

export function EditTeacherModal({
  isOpen,
  value,
  setValue,
  onSave,
  onCancel,
  title,
  maxLength = 30,
  placeholder = "내용을 입력하세요.(30자 이내)",
  isTextarea = false,
}: EditTeacherFieldModalProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      confirmText="저장"
      cancelText="취소"
      handleOnConfirm={onSave}
      handleOnCancel={onCancel}
      message={
        isTextarea ? (
          <textarea
            className="h-24 w-full resize-none rounded border px-2 py-1 text-sm"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setValue(e.target.value)
            }
          />
        ) : (
          <input
            type="text"
            className="w-full rounded border px-2 py-1 text-sm"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        )
      }
    />
  );
}
