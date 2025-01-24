"use client";
import { useState } from "react";

interface AccordionProps {
  visibleContent: React.ReactNode;
  hiddenContent: React.ReactNode;
}

function Accordion(props: AccordionProps) {
  const { visibleContent, hiddenContent } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-11/12 rounded-3xl border border-gray-300 bg-white">
      <div className="relative min-h-24 w-full p-4">
        <div className="w-11/12">{visibleContent}</div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="absolute bottom-2 right-4 text-blue-400"
        >
          {isOpen ? "접기" : "펼치기"}
        </button>
      </div>
      <div
        className={`${isOpen ? "h-full" : "h-0"} flex flex-col gap-4 overflow-hidden px-4`}
      >
        {hiddenContent}
      </div>
    </div>
  );
}

export default Accordion;
