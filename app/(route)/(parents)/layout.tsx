import type { ReactNode } from "react";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ParentsLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[420px]">{children}</div>;
}
