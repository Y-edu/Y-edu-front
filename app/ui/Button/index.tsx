"use client";

import { forwardRef } from "react";

import { useButton, UseButtonProp } from "./useButton";

const Button = forwardRef<HTMLButtonElement, UseButtonProp>(
  ({ children, leftIcon, rightIcon, ...props }, ref) => {
    const { getButtonProps } = useButton({
      ...props,
      ref,
      rightIcon,
      leftIcon,
    });

    return (
      <button type="button" {...getButtonProps()}>
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
