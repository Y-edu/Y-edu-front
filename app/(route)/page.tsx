"use client";

import { useGetMatchingInfo } from "../hooks/query/useGetMatchingInfo";

export default function Home() {
  const { data } = useGetMatchingInfo("1");
  console.log(data);
  return (
    <div className="p-4 pt-2 font-pretendard">
      <h1 className="rounded bg-blue-500 px-4 py-2 font-pretendard text-base font-bold text-white">
        아아
      </h1>
      <button className="m-2 rounded border-2 border-black px-4 py-2 text-black hover:bg-black hover:text-white">
        mock 데이터 가져오기
      </button>
    </div>
  );
}
