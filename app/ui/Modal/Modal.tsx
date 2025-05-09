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
        className="w-1/3 min-w-[335px] rounded-[20px] bg-white p-6 shadow-lg"
      >
        <h2 className="mb-2 text-center text-lg font-semibold">{title}</h2>
        <p className="mb-5 whitespace-pre text-center text-sm font-medium text-gray-500">
          {message}
        </p>
        <div className="flex justify-center">
          {rest.cancelText && (
            <button
              onClick={rest.handleOnCancel}
              className="mr-2 min-h-[52px] rounded-xl bg-primaryTint px-4 py-2 font-semibold text-primaryNormal"
            >
              {rest.cancelText}
            </button>
          )}

          <button
            onClick={rest.handleOnConfirm}
            className="min-h-[52px] rounded-xl bg-primaryNormal px-4 py-2 font-semibold text-white"
          >
            {rest.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
