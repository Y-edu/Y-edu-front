"use client";

import ParentsList from "../../components/root/ParentsList";
import { useRequireAuth } from "../../hooks/auth/useRequireAuth";

export default function Home() {
  useRequireAuth();
  return (
    <div className="p-4 font-pretendard">
      <ParentsList />
    </div>
  );
}
