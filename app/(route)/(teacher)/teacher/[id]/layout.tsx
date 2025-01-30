import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="./main">선생님</Link>
        <Link href="./subject">수업</Link>
        <Link href="./region-time">지역/시간</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
