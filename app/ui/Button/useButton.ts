"use client";

import { useCallback, ButtonHTMLAttributes, ReactNode } from "react";

import { ReactRef } from "@/types/react";
import useDOMRef from "@/hooks/custom/useDOMRef";
import cn from "@/utils/cn";
import { useSafeClick } from "@/hooks/custom/useSafeClick";

export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: ReactRef<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function useButton({
  ref,
  onClick,
  onTouchEnd,
  disabled,
  className,
  leftIcon,
  rightIcon,
  ...otherProps
}: UseButtonProp) {
  const domRef = useDOMRef(ref);

  const { clickHandlers } = useSafeClick(onClick, onTouchEnd);

  const getButtonProps = useCallback(
    () => ({
      disabled,
      ...otherProps,
      ref: domRef,
      ...clickHandlers,
      className: cn(
        "p-[16px] rounded-[12px] text-[18px] text-[#fff] bg-primary font-bold flex items-center gap-10 justify-center whitespace-nowrap w-full",
        (rightIcon || leftIcon) && "justify-between",
        disabled && "opacity-30",
        className,
      ),
    }),
    [
      otherProps,
      disabled,
      className,
      domRef,
      leftIcon,
      rightIcon,
      clickHandlers,
    ],
  );

  return { getButtonProps };
}
