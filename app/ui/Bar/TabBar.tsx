"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import cn from "@/utils/cn";

interface TabInterface {
  trigger: string;
  content: React.ReactNode;
}

interface TabBarProps {
  tabs: Array<TabInterface>;
  scrollMode?: boolean;
  paramKey?: string;
  listClassName?: string;
  buttonClassName?: string;
  initialTab?: string;
}

export default function TabBar({
  tabs,
  scrollMode = false,
  paramKey,
  listClassName = "",
  buttonClassName = "",
  initialTab = "",
}: TabBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial =
    paramKey && searchParams.get(paramKey)
      ? searchParams.get(paramKey)!
      : (initialTab ?? tabs[0].trigger);
  const [selectedTab, setSelectedTab] = useState(initial);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({}).current;
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabClick = (trigger: string, idx: number) => {
    setSelectedTab(trigger);
    if (paramKey) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, trigger);
      router.push(`${window.location.pathname}?${params.toString()}`);
    }
    if (scrollMode && sectionRefs[trigger]) {
      sectionRefs[trigger].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    buttonRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (!scrollMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = Object.entries(sectionRefs).find(
              ([, el]) => el === entry.target,
            );
            if (matched) setSelectedTab(matched[0]);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    Object.values(sectionRefs).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [scrollMode, tabs, sectionRefs]);

  return (
    <div className="w-full">
      <div
        className={cn(
          "sticky top-0 z-10 flex w-full border-b border-tabBarBorder bg-white px-5",
          listClassName,
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.trigger}
            ref={(el: HTMLButtonElement | null): void => {
              buttonRefs.current[idx] = el;
            }}
            className={cn(
              "flex-1 border-b-2 border-transparent py-[10px] text-center font-[500] leading-[146%] tracking-[-0.02em] text-grey-500",
              selectedTab === tab.trigger &&
                "border-primaryNormal font-bold text-primaryNormal",
              buttonClassName,
            )}
            onClick={() => handleTabClick(tab.trigger, idx)}
          >
            {tab.trigger}
          </button>
        ))}
      </div>

      {scrollMode ? (
        <div>
          {tabs.map((tab) => (
            <div
              key={tab.trigger}
              ref={(el) => {
                sectionRefs[tab.trigger] = el;
              }}
              className="scroll-mt-[80px]"
            >
              {tab.content}
            </div>
          ))}
        </div>
      ) : (
        <div>{tabs.find((tab) => tab.trigger === selectedTab)?.content}</div>
      )}
    </div>
  );
}
