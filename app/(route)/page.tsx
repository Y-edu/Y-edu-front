import Link from "next/link";

import ParentsList from "../components/root/ParentsList";

export default function Home() {
  return (
    <div className="p-4 pt-2 font-pretendard">
      <Link href="/12">멘토링 디테일</Link>
      <ParentsList />
    </div>
  );
}
