"use client";

import IconLeft from "@/icons/IconLeft";
import cn from "@/utils/cn";

interface HeaderWithBackProps {
  onBack?: () => void;
  hasBack?: boolean;
  title: string;
  mainClassName?: string;
  children: React.ReactNode;
  className?: string;
}

export default function HeaderWithBack({
  children,
  onBack,
  title,
  hasBack = false,
  mainClassName,
  className = "",
}: HeaderWithBackProps) {
  return (
    <div className="flex h-dvh flex-col">
      <header
        className={`py-4, relative flex h-[48px] items-center justify-center border-b border-grey-100 ${className}`}
      >
        {hasBack && (
          <IconLeft
            className="absolute left-[8px] cursor-pointer"
            onClick={onBack}
          />
        )}
        <span className="text-[18px] font-semibold">{title}</span>
      </header>
      <main className={cn("h-[calc(100%-48px)]", mainClassName)}>
        {children}
      </main>
    </div>
  );
}
