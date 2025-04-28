import { useRef, useCallback } from "react";

// ios ghostClick 대응
export function useSafeClick(
  onClickProp?: React.MouseEventHandler,
  onTouchEndProp?: React.TouchEventHandler,
) {
  const touchedRef = useRef(false);

  const onTouchEnd = useCallback<React.TouchEventHandler>(
    (e) => {
      e.preventDefault();
      touchedRef.current = true;
      onTouchEndProp?.(e);
      onClickProp?.(e as unknown as React.MouseEvent);
    },
    [onClickProp, onTouchEndProp],
  );

  const onClick = useCallback<React.MouseEventHandler>(
    (e) => {
      if (touchedRef.current) {
        touchedRef.current = false;
        return;
      }
      onClickProp?.(e);
    },
    [onClickProp],
  );

  return {
    clickHandlers: {
      onTouchEnd,
      onClick,
    },
  };
}
