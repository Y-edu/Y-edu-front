"use client";
import { useState } from "react";

interface TabInterface {
  trigger: string;
  content: React.ReactNode;
}

interface TabBarProps {
  tabs: Array<TabInterface>;
}

export default function TabBar(props: TabBarProps) {
  const { tabs } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[0].trigger);

  return (
    <div className="w-full">
      <div className="flex w-full gap-6 border-b border-tabBarBorder px-4">
        {tabs.map((tab) => (
          <button
            key={tab.trigger}
            className={`flex-1 border-b-2 py-[15px] text-center font-pretendard font-bold leading-[146%] tracking-[-0.02em] ${
              selectedTab === tab.trigger
                ? "border-primaryNormal text-primaryNormal"
                : "border-transparent text-labelNeutral"
            }`}
            onClick={() => setSelectedTab(tab.trigger)}
          >
            {tab.trigger}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.trigger === selectedTab)?.content}</div>
    </div>
  );
}
