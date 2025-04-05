import { MutableRefObject, ReactNode, Ref, RefObject } from "react";

export type ReactRef<T> = RefObject<T> | MutableRefObject<T> | Ref<T>;
export type StrictPropsWithChildren<P = unknown> = P & { children: ReactNode };
