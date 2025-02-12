import Link from "next/link";

export default function ErrorUI() {
  return (
    <div className="mt-44 flex size-full flex-col items-center justify-center">
      <div className="mb-5 flex size-10 items-center justify-center rounded-full border-2 border-red-400 text-xl text-red-400">
        !
      </div>
      <p className="font-semibold text-titleColor">
        서버 처리 중 문제가 발생했습니다.
      </p>
      <p className="mb-4 text-sm font-light text-descColor">
        고객 센터에 문의해 주세요.
      </p>
      <Link
        className="flex h-8 w-28 items-center justify-center rounded-lg bg-descColor font-semibold text-white"
        href="https://pf.kakao.com/_BVKxiK/chat"
      >
        문의하기
      </Link>
    </div>
  );
}
