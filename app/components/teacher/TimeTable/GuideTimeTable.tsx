"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

import cn from "@/utils/cn";

export default function GuideTimeTable() {
  const [visible, setVisible] = useState(true);
  const [showSecondBlock, setShowSecondBlock] = useState(false);
  const fingerControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const animate = async () => {
      await fingerControls.start({
        y: [0, 50],
        transition: { duration: 0.9, ease: "easeInOut" },
      });

      await fingerControls.start({
        scale: [1, 0.85, 1],
        transition: { duration: 0.25, ease: "easeInOut" },
      });

      setShowSecondBlock(true);
    };

    animate();
  }, [fingerControls]);

  if (!visible) return null;

  return (
    <button
      onClick={() => setVisible(false)}
      className="fixed inset-0 z-50 bg-black/70"
    >
      <div className="mx-auto w-[380px] text-white">
        <div className="flex h-screen items-center justify-center gap-[16px]">
          <p className="text-start text-[20px] font-bold leading-relaxed">
            네모난 칸을 눌러서
            <br />
            시간을 선택할 수 있어요
          </p>
          <div className="relative flex flex-col gap-[2px]">
            <div className="h-[43px] w-[41px] bg-blue-500" />
            <div
              className={cn(
                "h-[43px] w-[41px] bg-blue-500",
                !showSecondBlock && "opacity-0",
              )}
            />
            <motion.div
              className="absolute right-[-30px] top-[10px]"
              animate={fingerControls}
            >
              <Image
                src="/images/finger-tap.svg"
                alt="finger"
                width={58}
                height={59}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </button>
  );
}
