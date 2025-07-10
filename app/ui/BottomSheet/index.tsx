/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import cn from "@/utils/cn";
import { useClickoutside } from "@/hooks/custom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useClickoutside(sheetRef, onClose);

  useEffect(() => {
    const scrollY = window.scrollY;

    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = "hidden";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-10 flex justify-center bg-black/30">
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed bottom-0 z-20 w-full max-w-[420px] -translate-x-1/2 animate-slide-up rounded-t-[20px] bg-white p-[20px] transition-transform duration-300",
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
