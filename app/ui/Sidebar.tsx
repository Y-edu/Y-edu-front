"use client";
import LogoImage from "../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function Sidebar() {
  const activeSegment = useSelectedLayoutSegment();

  const activeLinkClassName = "font-bold text-primary";
  return (
    <nav
<<<<<<< HEAD
      className="fixed h-screen w-[180px] border-r border-[#E6EFF5] bg-white text-disabled"
=======
      className="fixed left-0 top-0 h-screen w-[180px] border-r border-[#E6EFF5] text-disabled"
>>>>>>> f7a570dceb56acc0767c392c765cfdc7c624dbc3
      aria-label="메인 네비게이션"
      role="navigation"
    >
      <div className="flex h-[100px] items-center p-2">
        <Image src={LogoImage} height={36} width={36} alt="로고 이미지" />
        <span className="ml-2 text-lg font-bold text-headColor">Y-Edu</span>
      </div>

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
    </nav>
  );
}
