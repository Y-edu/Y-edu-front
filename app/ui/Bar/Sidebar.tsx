"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment, useRouter } from "next/navigation";

import LogoImage from "../../../public/images/logo.png";
import { useLogout } from "../../hooks/auth/useLogout";

export function Sidebar() {
  const activeSegment = useSelectedLayoutSegment();
  const router = useRouter();
  const { logout } = useLogout();

  const activeLinkClassName = "font-bold text-primary";

  const handleLogout = async () => {
    try {
      await logout();
      // eslint-disable-next-line no-console
      console.log("로그아웃 성공");
      router.push("/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <nav
      className="fixed left-0 top-0 flex h-screen w-[180px] flex-col justify-between border-r border-[#E6EFF5] bg-white pl-2 text-disabled"
      aria-label="메인 네비게이션"
      role="navigation"
    >
      <div>
        <Link href="/" className="flex h-[100px] items-center p-2">
          <Image src={LogoImage} height={36} width={36} alt="로고 이미지" />
          <span className="ml-2 text-lg font-bold text-headColor">Y-Edu</span>
        </Link>
        <div className="mt-4 flex flex-col gap-4 p-4">
          <Link
            href="/"
            className={activeSegment === null ? activeLinkClassName : ""}
          >
            매칭관리
          </Link>
          <Link
            href="/teacher-management"
            className={
              activeSegment === "teacher-management" ? activeLinkClassName : ""
            }
          >
            선생님관리
          </Link>
          <Link
            href="/settle-management"
            className={
              activeSegment === "settle-management" ? activeLinkClassName : ""
            }
          >
            정산관리
          </Link>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-primary py-2 text-center font-bold text-white hover:bg-[#4762B4]"
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
