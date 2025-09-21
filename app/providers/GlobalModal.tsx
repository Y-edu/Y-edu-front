"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { Modal } from "@/ui/Modal/Modal";
import { CANCEL_TEXT } from "@/constants/session/cancel";

interface ModalOptions {
  title?: string;
  message?: string;
  confirmText: string;
  onConfirm?: () => void;
}

interface GlobalModalContextType {
  showParentsModal: () => void;
  showTeacherModal: () => void;
  showCustomModal: (options: ModalOptions) => void;
}

const GlobalModalContext = createContext<GlobalModalContextType | null>(null);

export function GlobalModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();

  const showModal = useCallback((options: ModalOptions) => {
    setTitle(options.title || "");
    setMessage(options.message || "");
    setConfirmText(options.confirmText);
    setOnConfirm(() => options.onConfirm);
    setIsOpen(true);
  }, []);

  const showParentsModal = useCallback(() => {
    showModal({
      title: CANCEL_TEXT.SAME_DAY_CANCEL_BY_PARENTS_SHORT,
      message: CANCEL_TEXT.SAME_DAY_CANCEL_BY_PARENTS_GUIDE,
      confirmText: "확인했어요",
    });
  }, [showModal]);

  const showTeacherModal = useCallback(() => {
    showModal({
      title: CANCEL_TEXT.SAME_DAY_CANCEL_BY_TEACHER_SHORT,
      message: CANCEL_TEXT.SAME_DAY_CANCEL_BY_TEACHER_GUIDE,
      confirmText: "확인했어요",
    });
  }, [showModal]);

  const showCustomModal = useCallback(
    (options: ModalOptions) => {
      showModal(options);
    },
    [showModal],
  );

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <GlobalModalContext.Provider
      value={{ showParentsModal, showTeacherModal, showCustomModal }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        title={title}
        message={message}
        confirmText={confirmText}
        handleOnConfirm={handleConfirm}
        handleOnCancel={handleClose}
      />
    </GlobalModalContext.Provider>
  );
}

export function useGlobalModal() {
  const context = useContext(GlobalModalContext);
  if (!context)
    throw new Error("useGlobalModal must be used within GlobalModalProvider");
  return context;
}
