import { useRef, useEffect } from "react";

import cn from "@/utils/cn";

const ITEM_HEIGHT = 56;

interface ScrollPickerProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function ScrollPicker({
  options,
  selected,
  onSelect,
}: ScrollPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;

    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      const index = Math.floor(el.scrollTop / ITEM_HEIGHT);
      const value = options[index];
      if (value && value !== selected) {
        onSelect(value);
      }
    }, 80);
  };

  useEffect(() => {
    const index = options.findIndex((opt) => opt === selected);
    if (ref.current) {
      ref.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, [options, selected]);

  return (
    <div className="relative h-[160px]">
      <div className="pointer-events-none absolute top-[52px] z-10 h-[2px] w-full bg-grey-200" />
      <div className="pointer-events-none absolute top-[104px] z-10 h-[2px] w-full bg-grey-200" />
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide"
      >
        <div className="flex flex-col items-center py-[56px]">
          {options.map((opt) => (
            <div
              key={opt}
              className={cn(
                "flex h-[56px] w-full snap-center items-center justify-center whitespace-nowrap px-[14px] text-[16px] font-medium text-[#C9CBCF] transition-all",
                selected === opt && "text-grey-900",
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
