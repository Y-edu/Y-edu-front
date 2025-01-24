import Link from "next/link";

import ParentsRequest from "../components/root/ParentsRequest";

export default function Home() {
  return (
    <div className="p-4 pt-2 font-pretendard">
      <Link href="/12">멘토링 디테일</Link>
      <ParentsRequest />
    </div>
  );
}
