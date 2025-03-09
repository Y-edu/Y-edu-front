"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  usePathname,
  useRouter,
} from "next/navigation";

import LogoImage from "public/images/logo.png";
import { useLogout } from "app/hooks/auth/useLogout";

export function Sidebar() {
  const activeSegment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useLogout();

  const activeLinkClassName = "font-bold text-primary";
  const isMatchingManagement =
    pathname.startsWith("/zuzuclubadmin") &&
    !pathname.startsWith("/zuzuclubadmin/teacher-management") &&
    !pathname.startsWith("/zuzuclubadmin/settle-management");

  const handleLogout = () => {
    logout();
    router.push("/zuzuclubadmin/login");
  };

  return (
    <nav
      className="fixed left-0 top-0 z-50 flex h-screen w-[180px] flex-col justify-between border-r border-[#E6EFF5] bg-white pl-2 text-disabled"
      aria-label="메인 네비게이션"
      role="navigation"
    >
      <div>
        <Link href="/zuzuclubadmin" className="mt-5 flex items-center p-2">
          <Image src={LogoImage} height={36} width={36} alt="로고 이미지" />
          <span className="ml-2 text-lg font-bold text-headColor">Y-Edu</span>
        </Link>
        <div className="mt-4 flex flex-col gap-4 p-4">
          <Link
            href="/zuzuclubadmin"
            className={isMatchingManagement ? activeLinkClassName : ""}
          >
            매칭관리
          </Link>
          <Link
            href="/zuzuclubadmin/teacher-management"
            className={
              activeSegment === "teacher-management" ? activeLinkClassName : ""
            }
          >
            선생님관리
          </Link>
          <Link
            href="/zuzuclubadmin/settle-management"
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
