"use client";

import { CircularProgress } from "@mui/material";

import cn from "@/utils/cn";

export default function LoadingUI({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex min-h-screen items-center justify-center", className)}
    >
      <CircularProgress />
    </div>
  );
}
