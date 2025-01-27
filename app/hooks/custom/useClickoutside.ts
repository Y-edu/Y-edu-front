/* eslint-disable promise/prefer-await-to-callbacks */
import { useEffect, MutableRefObject } from "react";

export function useClickoutside<T extends MutableRefObject<HTMLDivElement>>(
  ref: T,
  callback?: () => void,
  deps?: [],
) {
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
