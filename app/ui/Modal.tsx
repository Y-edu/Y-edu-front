"use client";
import { useRef } from "react";

import { useClickoutside } from "app/hooks/custom";

export interface ModalProps {
  title: string | React.ReactNode;
  message: React.ReactNode;
  confirmText: string;
  cancelText?: string;
  handleOnConfirm: () => void;
  handleOnCancel?: () => void;
  isOpen: boolean;
}

export function Modal({
  title = "",
  message = "",
  isOpen,
  ...rest
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickoutside(modalRef, rest?.handleOnCancel, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="w-1/3 min-w-[335px] rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          {rest.cancelText && (
            <button
              onClick={rest.handleOnCancel}
              className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            >
              {rest.cancelText}
            </button>
          )}

          <button
            onClick={rest.handleOnConfirm}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {rest.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
