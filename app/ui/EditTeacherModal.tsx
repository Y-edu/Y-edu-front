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
  placeholder = "내용을 입력하세요.",
  isTextarea = false,
}: EditTeacherFieldModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      confirmText="저장"
      cancelText="취소"
      onConfirm={onSave}
      onCancel={onCancel}
      message={
        isTextarea ? (
          <textarea
            className="h-24 w-full resize-none rounded border px-2 py-1 text-sm"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        )
      }
    />
  );
}
