"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Sidebar } from "../../ui";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useRegenerate } from "../../hooks/auth/useRegenerate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const { regenerate } = useRegenerate();

  useEffect(() => {
    async function checkAuth() {
      if (pathname !== "/login") {
        if (!accessToken) {
          const success = await regenerate();
          if (!success) {
            router.push("/login");
          }
        }
      }
    }
    checkAuth();
  }, [pathname, accessToken, regenerate, router]);

  return (
    <div
      className={`bg-background ${pathname !== "/login" ? "ml-[180px]" : ""}`}
    >
      {pathname !== "/login" && <Sidebar />}
      {children}
    </div>
  );
}
