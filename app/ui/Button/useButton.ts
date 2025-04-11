"use client";

import {
  MouseEvent,
  useCallback,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { ReactRef } from "@/types/react";
import useDOMRef from "@/hooks/custom/useDOMRef";
import cn from "@/utils/cn";

export type UseButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: ReactRef<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function useButton({
  ref,
  onClick,
  disabled,
  className,
  leftIcon,
  rightIcon,
  ...otherProps
}: UseButtonProp) {
  const domRef = useDOMRef(ref);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
      }
    },
    [disabled, onClick],
  );

  const getButtonProps = useCallback(
    () => ({
      disabled,
      ...otherProps,
      ref: domRef,
      onClick: handleClick,
      className: cn(
        "p-[16px] rounded-[12px] text-[18px] text-[#fff] bg-primary font-bold flex items-center gap-10 justify-center whitespace-nowrap w-full",
        (rightIcon || leftIcon) && "justify-between",
        disabled && "opacity-30",
        className,
      ),
    }),
    [handleClick, otherProps, disabled, className, domRef, leftIcon, rightIcon],
  );

  return { getButtonProps };
}
