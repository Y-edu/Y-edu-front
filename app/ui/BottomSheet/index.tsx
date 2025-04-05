"use client";

import cn from "@/utils/cn";

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
  if (!isOpen) return null;

  return (
    <>
      <button
        onClick={onClose}
        aria-label="바텀시트 닫기"
        className="fixed inset-0 z-10 bg-black/30"
        type="button"
      />
      <div
        className={cn(
          "fixed bottom-0 z-20 w-full max-w-[375px] animate-slide-up rounded-t-[20px] bg-white transition-transform duration-300",
        )}
      >
        {children}
      </div>
    </>
  );
}
