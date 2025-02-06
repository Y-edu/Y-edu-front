"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useAuthStore } from "../../store/auth/useAuthStore";

export function useRequireAuth() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    async function verifyAuth() {
      try {
        await axios.get("https://dev.yedu-develop.com:8181/admin/test", {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
          withCredentials: true,
        });
      } catch (error) {
        alert(error);
        router.push("/login");
      }
    }
    verifyAuth();
  }, [router, accessToken]);
}
