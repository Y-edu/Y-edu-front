"use client";
import Image from "next/image";
import { useState } from "react";

import Arrow from "../../public/images/arrow-light.png";

interface ToggleBoxProps {
  title: string;
  items: Array<string>; // 일단 그냥 문자열 리스트로 받을듯
}

export default function ToggleBox(props: ToggleBoxProps) {
  const { title, items } = props;
  const [isOpen, setIsOpen] = useState(false);
  const visibleItems = isOpen ? items : items.slice(0, 3);

  return (
    <div className="w-full rounded-xl border border-primaryWeak px-6 py-[30px] font-pretendard tracking-[-0.02em]">
      <p className="mb-4 font-semibold text-labelStrong">{title}</p>
      <div
        className={`overflow-hidden transition-[max-height] duration-700 ${
          isOpen ? "max-h-[600px]" : "max-h-[165px]"
        }`}
      >
        <ul className="space-y-[10px] text-[15px] leading-[150%] text-labelNormal">
          {visibleItems.map((el, idx) => (
            <li key={idx}>{el}</li>
          ))}
        </ul>
      </div>
      {items.length > 3 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-5 flex w-full justify-center gap-[2px]"
        >
          <p className="text-sm font-medium text-labelAssistive">
            {isOpen ? "접기" : "펼치기"}
          </p>
          <Image
            src={Arrow}
            alt="화살표 이미지"
            className={`size-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}
    </div>
  );
}
