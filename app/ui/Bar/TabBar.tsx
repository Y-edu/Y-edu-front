"use client";
import { useEffect, useRef, useState } from "react";

import cn from "@/utils/cn";

interface TabInterface {
  trigger: string;
  content: React.ReactNode;
}

interface TabBarProps {
  tabs: Array<TabInterface>;
  scrollMode?: boolean;
}

export default function TabBar({ tabs, scrollMode = false }: TabBarProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].trigger);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({}).current;

  const handleTabClick = (trigger: string) => {
    setSelectedTab(trigger);
    if (scrollMode && sectionRefs[trigger]) {
      sectionRefs[trigger].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
      <div className="sticky top-0 z-10 flex w-full border-b border-tabBarBorder bg-white px-4">
        {tabs.map((tab) => (
          <button
            key={tab.trigger}
            className={cn(
              "flex-1 border-b-2 border-transparent py-[15px] text-center font-pretendard font-bold leading-[146%] tracking-[-0.02em] text-labelNeutral",
              selectedTab === tab.trigger &&
                "border-primaryNormal text-primaryNormal",
            )}
            onClick={() => handleTabClick(tab.trigger)}
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
