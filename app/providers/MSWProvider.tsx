"use client";
import { ReactNode, useEffect } from "react";

interface PropType {
  children: ReactNode;
}

async function startClientMSW() {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const worker = await import("../../__mocks__/browser");
    await worker.worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

export default function IntegrateMSW({ children }: PropType) {
  useEffect(() => {
    startClientMSW();
  }, []);

  return <>{children}</>;
}
