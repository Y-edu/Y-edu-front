"use client";

import { usePathname } from "next/navigation";

import { Sidebar } from "../../ui";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      className={`bg-background ${pathname !== "/login" ? "ml-[180px]" : ""}`}
    >
      {pathname !== "/login" && <Sidebar />}
      {children}
    </div>
  );
}
