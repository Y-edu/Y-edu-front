"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../../store/auth/useAuthStore";

export function useRequireAuth() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [router, accessToken]);
}
