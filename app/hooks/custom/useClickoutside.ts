/* eslint-disable promise/prefer-await-to-callbacks */
import { useEffect, MutableRefObject } from "react";

export function useClickoutside<
  T extends MutableRefObject<HTMLDivElement | null>,
>(ref: T, callback?: () => void, deps?: any[]) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback?.();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback, deps && [...deps]]);
}
