"use client";

import IconLeft from "@/icons/IconLeft";
import cn from "@/utils/cn";

interface HeaderWithBackProps {
  onBack: () => void;
  hasBack: boolean;
  title: string;
  mainClassName?: string;
  children: React.ReactNode;
}

export default function HeaderWithBack({
  children,
  onBack,
  title,
  hasBack,
  mainClassName,
}: HeaderWithBackProps) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-grey-100 relative flex h-[48px] items-center justify-center border-b py-4">
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
